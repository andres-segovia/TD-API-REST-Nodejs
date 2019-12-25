// DB
const data = require("../data/db.json");

exports.getProducts = (req, res, next) => {
  if(!data !== null)
    res.status(200).json(data);
  else
    res.status(400).json({"ERROR": "La base de datos no existe o está corrupta."});
};

exports.getProduct = (req, res, next) => {
  let id = req.params.productId;
  var index;
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
    res.status(400).json({"Error": "No existe producto con ese ID."});
  }
};

// Obtenemos el producto indicando directamente como parámetro
exports.getProductParamTitle = (req, res, next) => {
  const title = req.params.productTitle;
  var index;
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
    res.status(400).json({"Error": "No existe producto con ese nombre."});
  }
};

// Este lo utilizo junto con el 'search'
exports.getProductSearchTitle = (req, res, next) => {
  const title = req.query.title;
  var index;
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
    res.status(400).json({"Error": "No existe producto con ese nombre."});
  }
};

exports.getSearchProducts = (req, res, next) => {
  if(req.query['title']){
    this.getProductSearchTitle(req, res, next);
  } else {
    res.status(404).json({"ERROR": "Parámetro incorrecto"});
  };
}

/*
  Para obtener la cantidad de productos por tipo
*/
exports.getTypeProducts = (req, res, next) => {
  var obj = {};
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
  
  for (var i = 0; i < data.products.length; i++) {
    price = data.products[i]["price"];
    
    if (i === 0 || price > max) {
      max = price;
      title = data.products[i]["title"];
    }
  }
  res.status(200).json({title, max});
};

exports.getIndex = (req, res, next) => {
  res.status(200).json({"status": "running"});
};

