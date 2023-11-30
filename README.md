# Sistema de Gestión de Stock

Carpeta de controladores:


Auth: 

Importa dependencias y modelos:

Importa módulos como express, bcryptjs, y jsonwebtoken, así como el modelo de usuario (Usuario) y una función para generar JWT.
Define la función login para la autenticación:

Extrae el correo y la contraseña de la solicitud, busca el usuario en la base de datos, verifica el estado del usuario y compara la contraseña usando bcrypt. Si todo es válido, genera un token JWT y lo devuelve junto con el usuario.
Maneja errores durante el proceso de autenticación:

Utiliza un bloque try-catch para manejar posibles errores durante el proceso de autenticación, devolviendo un mensaje de error genérico y un código de estado 500 si ocurre un error.
Define la función obtenerID para obtener información del usuario autenticado:

Extrae el ID y el rol del usuario autenticado de la solicitud y responde con esta información.
Exporta las funciones para su uso en otros archivos:

Exporta las funciones login y obtenerID para que puedan ser utilizadas en otros archivos que requieran funcionalidades de autenticación.


Buscar: 

Importa dependencias y modelos:

Importa módulos como express, mongoose, y el modelo de Categoria y Producto. También importa ObjectId de Mongoose para verificar si un término de búsqueda es un ID de MongoDB válido.
Define funciones para buscar categorías y productos:

buscarCategoria: Busca una categoría por su ID o por un término (nombre) usando expresiones regulares y devuelve los resultados.
buscarProducto: Similar a buscarCategoria, busca un producto por su ID o por un término (nombre) y devuelve los resultados.
Implementa una función de búsqueda general (buscar):

Extrae la colección y el término de búsqueda de los parámetros de la solicitud. Verifica si la colección es permitida y luego invoca la función correspondiente (buscarCategoria o buscarProducto) en función de la colección.
Maneja casos de error y respuestas no esperadas:

Si la colección no es permitida, devuelve un error 400. Si la colección es válida pero no coincide con "categorias" o "productos", devuelve un mensaje de error genérico con un código de estado 500.
Exporta la función buscar para su uso en otros archivos:

Exporta la función buscar para que pueda ser utilizada como middleware de búsqueda en otras partes de la aplicación.


Categorias: 

Obtención de Categorías (obtenerCategorias):

Obtiene categorías paginadas y devuelve el total de categorías y la lista paginada. Utiliza parámetros opcionales (limite y desde) en la consulta para limitar y paginar los resultados.
Obtención de una Categoría por ID (obtenerCategoria):

Obtiene una categoría por su ID y devuelve la información de la categoría. Utiliza el método findById de Mongoose y también popula la información del usuario asociado.
Creación de una Categoría (crearCategoria):

Crea una nueva categoría después de verificar que no exista otra categoría con el mismo nombre. Convierte el nombre a mayúsculas, crea un objeto de datos y utiliza el modelo de categoría para almacenar la nueva categoría en la base de datos.
Actualización de una Categoría por ID (actualizarCategoria):

Actualiza una categoría por su ID. Convierte el nombre a mayúsculas, recupera el ID del usuario de la solicitud y actualiza la categoría en la base de datos utilizando el método findByIdAndUpdate.
Borrado lógico de una Categoría por ID (borrarCategoria):

Realiza un borrado lógico (cambia el estado a false) de una categoría por su ID. Utiliza el método findByIdAndUpdate con la opción { new: true } para devolver la categoría actualizada después de la operación de borrado lógico.
Exporta las funciones para su uso en otros archivos (module.exports):

Hace que las funciones CRUD (crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria) estén disponibles para su uso en otros archivos que requieran este módulo.


Productos:

Obtención de Productos (obtenerProductos):

Recupera una lista paginada de productos activos, junto con el total de productos. Utiliza parámetros opcionales (limite y desde) en la consulta para limitar y paginar los resultados. También popula la información de categoría y usuario asociada a cada producto.
Obtención de un Producto por ID (obtenerProducto):

Recupera un producto específico por su ID y devuelve la información del producto. Utiliza el método findById de Mongoose y popula la información de categoría y usuario asociada.
Creación de un Producto (productoPost):

Crea un nuevo producto después de verificar que no exista otro producto con el mismo nombre. Convierte el nombre a mayúsculas, crea un objeto de datos y utiliza el modelo de producto para almacenar el nuevo producto en la base de datos.
Actualización de un Producto por ID (actualizarProducto):

Actualiza un producto existente por su ID. Recupera los datos de la solicitud, incluyendo el precio, descripción, disponibilidad, y otros. Convierte el nombre a mayúsculas si está presente en la solicitud y actualiza el producto en la base de datos utilizando el método findByIdAndUpdate. También popula la información de categoría y usuario asociada.
Borrado lógico de un Producto por ID (borrarProducto):

Realiza un borrado lógico (cambia el estado a false) de un producto por su ID. Utiliza el método findByIdAndUpdate con la opción { new: true } para devolver el producto actualizado después de la operación de borrado lógico.
Exporta las funciones para su uso en otros archivos (module.exports):

Hace que las funciones CRUD (productoPost, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto) estén disponibles para su uso en otros archivos que requieran este módulo.

Usuarios: 

Obtención de Usuarios (usuariosGet):

Recupera una lista paginada de usuarios activos, junto con el total de usuarios activos. Utiliza parámetros opcionales (limite y desde) en la consulta para limitar y paginar los resultados.
Creación de un Usuario (usuarioPost):

Crea un nuevo usuario después de verificar que no exista otro usuario con el mismo correo electrónico. Utiliza el modelo de usuario para almacenar el nuevo usuario en la base de datos. Realiza el hash de la contraseña utilizando bcrypt para almacenarla de forma segura.
Actualización de un Usuario por ID (usuarioPut):

Actualiza la información de un usuario por su ID. Recupera los datos de la solicitud, excluyendo la contraseña y el ID, realiza el hash de la nueva contraseña y actualiza el usuario en la base de datos utilizando el método findByIdAndUpdate.
Borrado lógico de un Usuario por ID (usuarioDelete):

Realiza un borrado lógico (cambia el estado a false) de un usuario por su ID. Utiliza el método findByIdAndUpdate con la opción { new: true } para devolver el usuario actualizado después de la operación de borrado lógico.
Exporta las funciones para su uso en otros archivos (module.exports):

Hace que las funciones CRUD (usuariosGet, usuarioPost, usuarioPut, usuarioDelete) estén disponibles para su uso en otros archivos que requieran este módulo.

Ventas:

Obtención de Ventas (obtenerVentas):

Recupera una lista paginada de ventas activas, junto con el total de ventas activas. Utiliza parámetros opcionales (limite y desde) en la consulta para limitar y paginar los resultados. También popula la información de usuario asociada a cada venta.
Obtención de una Venta por ID (obtenerVenta):

Recupera una venta específica por su ID y devuelve la información de la venta. Utiliza el método findById de Mongoose y popula la información de usuario asociada.
Creación de una Venta (ventaPost):

Crea una nueva venta después de verificar que todos los datos requeridos estén presentes. Crea un objeto de datos y utiliza el modelo de venta para almacenar la nueva venta en la base de datos.
Actualización de una Venta por ID (actualizarVenta):

Actualiza la información de una venta por su ID. Recupera los datos de la solicitud, excluyendo el ID de usuario, realiza la actualización y utiliza el método findByIdAndUpdate de Mongoose. También popula la información de usuario asociada.
Borrado lógico de una Venta por ID (borrarVenta):

Realiza un borrado lógico (cambia el estado a false) de una venta por su ID. Utiliza el método findByIdAndUpdate con la opción { new: true } para devolver la venta actualizada después de la operación de borrado lógico.
Exporta las funciones para su uso en otros archivos (module.exports):

Hace que las funciones CRUD (ventaPost, obtenerVentas, obtenerVenta, actualizarVenta, borrarVenta) estén disponibles para su uso en otros archivos que requieran este módulo.

Database: sirve para que haya una mejor conexión a la base de datos de MongoDB utilizando Mongoose.

Importación de Mongoose:

Importa la biblioteca Mongoose, que facilita la interacción con bases de datos MongoDB desde Node.js.
Definición de la función dbConnection:

Define una función asíncrona llamada dbConnection que se encargará de establecer la conexión a la base de datos.
Bloque try-catch para la conexión:

Dentro de la función, hay un bloque try-catch para manejar posibles errores durante el proceso de conexión.
Conexión a la base de datos:

Utiliza await mongoose.connect(process.env.MONGODB_CNN) para intentar establecer una conexión a la base de datos MongoDB. La URL de conexión se toma de la variable de entorno process.env.MONGODB_CNN.
Mensaje de éxito y error:

Si la conexión es exitosa, imprime en la consola "Base de datos online". Si hay algún error, lo captura, lo imprime en la consola y lanza una nueva instancia de Error con el mensaje "Error en la conexion a la base de datos".
Exportación de la función:

Exporta la función dbConnection para que pueda ser utilizada en otros archivos que requieran la conexión a la base de datos.
Este código se utiliza para encapsular la lógica de conexión a la base de datos MongoDB, proporcionando manejo de errores y mensajes informativos durante el proceso. La conexión a la base de datos se realiza de forma asíncrona debido al uso de async-await.
 


