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
  for (var i = 0; i < data.length; i++) {
    if(data[i].id == id) {
      index = i;
      break;
    }
  }
  if (index) {
    d = data[index];
    res.status(200).json(d);
  } else {
    res.status(400).json({"Error": "No existe producto con ese ID."});
  }
};

exports.getProductById = (req, res, next) => {
  const id = req.query.id;
  var index;
  for (var i = 0; i < data.length; i++) {
    if(data[i].id == id) {
      index = i;
      break;
    }
  }
  if (index !== undefined) {
    d = data[index];
    res.status(200).json(d);
  } else {
    res.status(400).json({"Error": "No existe producto con ese ID."});
  }
};

exports.getProductByName = (req, res, next) => {
  const name = req.query.name;
  var index;
  for (var i = 0; i < data.length; i++) {
    if(data[i]["name"] === name) {
      index = i;
      break;
    }
  }
  if (index !== undefined) {
    d = data[index];
    res.status(200).json(d);
  } else {
    res.status(400).json({"Error": "No existe producto con ese nombre."});
  }
};

exports.getSearchProducts = (req, res, next) => {
  if(req.query['id']){
    this.getProductById(req, res, next);
  } else if(req.query['name']){
    this.getProductByName(req, res, next);
  } else {
    res.status(404).json({"ERROR": "Parámetro incorrecto"});
  };
}

/*
  Para obtener la cantidad de productos por tipo
*/
exports.getTypeProducts = (req, res, next) => {
  var obj = {};
  for (var i = 0; i < data.length; i++) {
    var type = data[i]["type"];
    if(obj.hasOwnProperty(type)) {
      obj[type] = obj[type] + 1;
    } else {
      obj[type] = 1;
    }
  }
  res.status(200).json(obj);
};

exports.getMoreExpensiveProduct = (req, res, next) => {
  var max = 0;
  var price = 0;
  var name = "";
  
  for (var i = 0; i < data.length; i++) {
    price = data[i]["price"];
    
    if (i === 0 || price > max) {
      max = price;
      name = data[i]["name"];
      console.log(max, name);
    }
  }
  res.status(200).json({name, max});
};

exports.getIndex = (req, res, next) => {
  res.status(200).json({"status": "running"});
};
