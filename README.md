

# TD-API-REST-NODEJS 

# Host:
- *http://localhost:8000/*

## Acceso a la API

| Ruta 	                                 |  Método http  |  Descripción  |
|----------------------------------------|:-------------:|:-------------|
| ***api/products*** |   **GET**     | _Listará todos los productos_ |
| ***api/products/search?title=keyword*** |  **GET** | _Buscar un determinado producto por su nombre_ |
| ***api/products/types-products*** |  **GET** | _Muestra la cantidad de productos por tipo_ |
| ***api/products/most-expensive*** |  **GET** | _Indicará cuál es el producto más caro_ |
| ***api/products/most-cheapest*** |  **GET** | _Listará los 5 productos más baratos_ |
| ***api/products/buyProduct*** |  **POST** | _Realiza una petición POST para comprar un producto especificando la cantidad 						      requerida. <br> **Los datos son: { "title": STRING, quantity: INT }**_ |
| ***api/products/addProduct*** |  **POST** | _Petición POST para agregar un nuevo producto. <br> **Los datos son: { "title": STRING, quantity: INT }**_|

* **Nota:**
	- Si se intenta realizar una compra indicando una cantidad superior al stock disponible se le informa que no puede realizar dicha compra más otros detalles.
	- Al realizar una compra de un tipo nos ofrece como recomendación comprar otros productos del mismo tipo. En el caso de que no haya otro similar sólo nos indicará que no hay recomendaciones. 
	- Al realizar una compra superior a 3 unidades se indica a la persona su probabilidad de ganar. El porcentaje es en relación a la cantidad que compró con la cantidad total de todos los productos.
	- Al crear un nuevo producto debe ingresar un nombre nuevo, ya que si existe uno con el mismo nombre no procedería a añadirse el nuevo producto; caso contrario se lo agrega.

<br>


## **Iniciar servidor**
```console
andy@pc:~$ npm run server
```

## **NOTAS:**
- En la carpeta _'OLD-VERSION'_ se encuentra todo lo que trabajé previo a obtener la base de datos real. En ese proyecto usé una base de datos casi similar a la real. Pero me sirvió para seguir trabajando. 
- Además esa carpeta contiene el módulo para descargar la última versión de la base de datos de los servidores de **AWS**.


