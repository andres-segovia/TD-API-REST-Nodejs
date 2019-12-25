const fs = require("fs");
const jp = require("jsonpath");
const settings = require("../default/settings");
const utils = require("../default/utils");

exports.getIndex = (req, res, next) => {
  res.status(200).json({"status": "running"});
};

exports.getProducts = (req, res, next) => {
  const str_data = fs.readFileSync(settings.REL_PATH_DB, "utf-8");
  const data = JSON.parse(str_data);
  if(!data !== null)
    res.status(200).json(data);
  else
    res.status(404).json({"ERROR": "La base de datos no existe o está corrupta."});
};

exports.getProduct = (req, res, next) => {
  let id = req.params.productId;
  var index;
  const str_data = fs.readFileSync(settings.REL_PATH_DB, "utf-8");
  const data = JSON.parse(str_data);

  for (var i = 0; i < data.products.length; i++) {
    if(data.products[i].id == id) {
      index = i;
      break;
    }
  }
  if (index) {
    d = data.products[index];
    res.status(200).json(d);
  } else {
    res.status(404).json({"Error": "No existe producto con ese ID."});
  }
};

// Obtenemos el producto indicando directamente como parámetro
exports.getProductParamTitle = (req, res, next) => {
  const title = req.params.productTitle;
  var index;
  const str_data = fs.readFileSync(settings.REL_PATH_DB, "utf-8");
  const data = JSON.parse(str_data);

  for (var i = 0; i < data.products.length; i++) {
    if(data.products[i]["title"] === title) {
      index = i;
      break;
    }
  }
  if (index !== undefined) {
    d = data.products[index];
    res.status(200).json(d);
  } else {
    res.status(404).json({"Error": "No existe producto con nombre " + title});
  }
};

// Este lo utilizo junto con el 'search'
exports.getProductSearchTitle = (req, res, next) => {
  const title = req.query.title;
  var index;
  const str_data = fs.readFileSync(settings.REL_PATH_DB, "utf-8");
  const data = JSON.parse(str_data);

  for (var i = 0; i < data.products.length; i++) {
    if(data.products[i]["title"] === title) {
      index = i;
      break;
    }
  }
  if (index !== undefined) {
    d = data.products[index];
    res.status(200).json(d);
  } else {
    res.status(404).json({"Error": "No existe producto con nombre " + title});
  }
};

exports.getSearchProducts = (req, res, next) => {
  if(req.query['title']){
    this.getProductSearchTitle(req, res, next);
  } else {
    res.status(400).json({"ERROR": "Parámetro incorrecto"});
  };
}

/*
  Para obtener la cantidad de productos por tipo
*/
exports.getTypeProducts = (req, res, next) => {
  var obj = {};
  const str_data = fs.readFileSync(settings.REL_PATH_DB, "utf-8");
  const data = JSON.parse(str_data);

  for (var i = 0; i < data.products.length; i++) {
    var type = data.products[i]["type"];
    if(obj.hasOwnProperty(type)) {
      obj[type] = obj[type] + 1;
    } else {
      obj[type] = 1;
    }
  }
  res.status(200).json(obj);
};

exports.getMostExpensiveProduct = (req, res, next) => {
  var max = 0;
  var price = 0;
  var title = "";
  const str_data = fs.readFileSync(settings.REL_PATH_DB, "utf-8");
  const data = JSON.parse(str_data);

  for (var i = 0; i < data.products.length; i++) {
    price = data.products[i]["price"];
    
    if (i === 0 || price > max) {
      max = price;
      title = data.products[i]["title"];
    }
  }
  res.status(200).json({title, max});
}

// Para obtener los 5 productos más baratos
exports.getFiveCheapestProducts = (req, res, next) => {
  const str_data = fs.readFileSync(settings.REL_PATH_DB, "utf-8");
  const data = JSON.parse(str_data);

  //Método de ordenamiento de menor a mayor
  data.products.sort(function (a, b) {
      if (a["price"] > b["price"]) {
        return 1; // -1 para que sea de mayor a menor
      }
      if (a["price"] < b["price"]) {
        return -1;// 1 para que sea de mayor a menor
      }
      return 0;
  });

  const max = 5; 
  res.status(200).json(data.products.slice(0, max));
};

exports.postBuyProduct = (req, res, next) => {
  const { title, quantity } = req.body;
  if (!title || !quantity)
    res.status(400).json({"Error": "Debe completar los campos requeridos."});
  var index;
  var stock = 0;
  const str_data = fs.readFileSync(settings.REL_PATH_DB, "utf-8");
  const data = JSON.parse(str_data);
  
  for (var i = 0; i < data.products.length; i++) {
    if(data.products[i].title == title) {
      stock = data.products[i].stock;
      if (quantity <= stock) { // Si la cantidad que queremos comprar es menor o igual al stock procedemos
        data.products[i].stock = stock - quantity;
        const str_json = JSON.stringify(data);
        // Obtenemos todos los productos del mismo tipo
        var index;
        const prods = jp.query(data, "$..products[?(@.type==\"" + data.products[i].type + "\")]");
        
        for (var i = 0; i < prods.length; i++) {
          if(prods[i].title === title) // Para eliminar el objeto de este producto actual.
            index = i;                 // Así no aparece en los productos recomendados
        }
        prods.splice(index, 1);
        if (prods.length == 0)
          prods.push("Actualmente no hay recomendaciones para ofrecerle.");
        // Guardamos en el archivo los nuevos cambios
        fs.writeFileSync(settings.REL_PATH_DB, str_json, 'utf-8');
        
        var res_json = {
          "Estado": "Los datos se actualizaron exitosamente.",
          "Compra realizada" : {
            "Producto": title,
            "Estado anterior del stock": stock, 
            "Nuevo stock": stock - quantity,
            "Cantidad vendida": quantity
          },
          "Productos recomendados": prods
        }
        if (quantity > 3) {// Si el cliente hizo una compra de más de 3 productos
          const arr_stocks = jp.query(data, "$..stock"); // Creará una lista con la cantidad de cada producto
          var suma = 0;
          for (var i = 0; i < arr_stocks.length; i++) {
              suma += arr_stocks[i];
          }
          const probility = quantity * 100 / suma;
          res_json["Probabilidad de ganar"] = probility.toPrecision(2) + "%"; // Agregamos la nueva clave
        }
        // Retornamos el JSON
        res.status(200).json(res_json);
      } else {
        res.status(404).json({
          "Error": "No hay stock para la cantidad especificada", 
          "Stock": stock, 
          "Cantidad requerida": quantity
        });
      }
    }
    index = i;
  }
  if (index !== undefined) {
    res.status(204).json({
      "Error": "No se ha realizado ninguna modificación"
    });
  }
};

exports.postAddProduct = (req, res, next) => {
  const { title, type, price, stock } = req.body;
  if (!title || !type || !price || !stock)
    res.status(400).json({"Error": "Debe completar los campos requeridos."});
  
  const str_data = fs.readFileSync(settings.REL_PATH_DB, "utf-8");
  const data = JSON.parse(str_data);

  const titles = jp.query(data, '$..title'); // Para obtener un arreglo con todos los títulos, solamente
  const pos = titles.indexOf(title); // Para determinar si el título existe en el arreglo
  if (pos === -1) { // Si es -1 es porque no existe en el arreglo; así que podríamos agregar uno nuevo
    var newObj = {
      title, type, price, stock
    };
    data.products.push(newObj);
    const str_json = JSON.stringify(data);
    fs.writeFileSync(settings.REL_PATH_DB, str_json, 'utf-8');
    res.status(201).json({
      "Estado": "Los datos se agregaron exitosamente.",
      "Info": {
        "Producto": title,
        "Cantidad": stock,
        "Precio": price,
        "type": type
      }
    });
  } else {
    res.status(404).json({
      "Error": "El nombre del producto ya se encuentra disponible."
    });
  }
};

