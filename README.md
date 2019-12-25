

# TD-API-REST-NODEJS 

# Host:
- *http://localhost:8000/*

## Acceso a la API
- **GET**  **api/products** _Listará todos los productos_
- **GET**  **api/products/search?title=PRODUCT-TITLE** _Buscar un determinado producto por su nombre_
- **GET**  **api/products/types-products** _Muestra la cantidad de productos por tipo_
- **GET**  **api/products/most-expensive** _Indicará cuál es el producto más caro_
- **GET**  **api/products/most-cheapest** _Listará los 5 productos más baratos_
- **POST**  **api/products/buyProduct**
	* Realiza una petición POST para comprar un producto especificando la cantidad requerida.
	* Los datos son: _{ "title": STRING, quantity: INT }_
	* **Nota:** Al realizar una compra de un tipo nos ofrece como recomendación comprar otros productos del mismo tipo. En el caso de que no haya otro similar no muetra nada. 
- **POST**  **api/products/addProduct**
	* Petición POST para agregar un nuevo producto.
	* Los datos son: _{ "title": STRING, price: FLOAT, type: STRING, stock: INT }_
	* **Nota:** Debe ingresarse un nombre de un producto único, ya que si existe uno no procedería a añadirse el nuevo producto; caso contrario se lo agrega. 

<br>

## **Iniciar servidor**
```console
andy@pc:~$ npm run server
```

