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
Bloque try-catch para la conexión:

Dentro de la función, hay un bloque try-catch para manejar posibles errores durante el proceso de conexión.
Conexión a la base de datos:

Utiliza await mongoose.connect(process.env.MONGODB_CNN) para intentar establecer una conexión a la base de datos MongoDB. La URL de conexión se toma de la variable de entorno process.env.MONGODB_CNN.
Mensaje de éxito y error:

Si la conexión es exitosa, imprime en la consola "Base de datos online". Si hay algún error, lo captura, lo imprime en la consola y lanza una nueva instancia de Error con el mensaje "Error en la conexion a la base de datos".
Exportación de la función:

Exporta la función dbConnection para que pueda ser utilizada en otros archivos que requieran la conexión a la base de datos.
Este código se utiliza para encapsular la lógica de conexión a la base de datos MongoDB, proporcionando manejo de errores y mensajes informativos durante el proceso. La conexión a la base de datos se realiza de forma asíncrona debido al uso de async-await.
 

Helpers:

Los "helpers" son herramientas y funciones que ayudan a los desarrolladores a escribir código de manera más eficiente, mejorar la calidad del código y proporcionar asistencia durante el proceso de desarrollo.

Validaciones:
Validación de Rol (esRoleValido):
Verifica si un rol específico existe en la base de datos de roles. Si el rol no está registrado, arroja un error indicando que el rol no está presente en la base de datos.
Validación de Email (emailExiste):

Comprueba si un correo electrónico ya está registrado en la base de datos de usuarios. Si el correo ya existe, arroja un error indicando que el correo ya está registrado.
Validación de Usuario por ID (existeUsuarioPorId):

Verifica la existencia de un usuario por su ID en la base de datos. Si el usuario no existe o está inactivo, arroja un error correspondiente.
Validación de Categoría por ID (categoriaExiste):

Comprueba la existencia de una categoría por su ID en la base de datos. Si la categoría no existe o está inactiva, arroja un error indicando la situación.
Validación de Producto por ID (productoExiste):

Verifica la existencia de un producto por su ID en la base de datos. Si el producto no existe, arroja un error indicando que el ID no está presente en la base de datos.
Validación de Venta por ID (ventaExiste):

Comprueba la existencia de una venta por su ID en la base de datos. Si la venta no existe, arroja un error indicando que el ID de venta no está registrado.

Generar JWT:
Importación de jsonwebtoken:
Importa la biblioteca jsonwebtoken, que permite la creación y verificación de tokens JWT en Node.js.
Función generarJWT:

Define una función llamada generarJWT que toma un parámetro uid (identificador único, generalmente el ID del usuario).
Creación del Payload:

Crea un objeto payload que contiene la información que se incluirá en el token. En este caso, solo contiene el uid.
Generación del Token JWT:

Utiliza jwt.sign para generar el token JWT. Se proporciona el payload, la clave secreta (process.env.SECRETORPRIVATEKEY) para firmar el token y un objeto de opciones que incluye la duración de validez del token (4 horas en este caso).
Manejo de Promesas:

La función devuelve una Promesa, permitiendo el uso de resolve y reject para gestionar el resultado de la operación de generación del token. Si hay un error durante la generación del token, se imprime en la consola, se rechaza la Promesa con un mensaje de error; de lo contrario, se resuelve con el token generado.

Middlewares: 
el término "middlewares" se utiliza comúnmente en el contexto de desarrollo web para describir funciones intermedias en el manejo de solicitudes y respuestas HTTP, en Visual Studio Code, el concepto podría extenderse las extensiones y funciones adicionales que mejoran la experiencia de desarrollo en el editor.

Validar Campos:

Importación de express-validator:
Importa la función validationResult de la biblioteca express-validator. Esta función extrae y organiza los resultados de las validaciones realizadas en las rutas de Express.
Middleware validarCampos:

Define una función de middleware llamada validarCampos que toma la solicitud (req), la respuesta (res), y la función siguiente en la cadena (next).
Verificación de Errores de Validación:

Utiliza validationResult(req) para obtener los resultados de las validaciones realizadas en las rutas anteriores. Si hay errores de validación, devuelve una respuesta de estado 400 (Bad Request) con los errores en formato JSON.
Continuación de la Cadena:

Si no hay errores de validación, llama a la función next(), permitiendo que la cadena de middlewares continúe con el siguiente middleware o ruta.
Exportación del Middleware:

Exporta el middleware validarCampos para que pueda ser utilizado en otras partes del código de Express.js.

Validar JWT:
Importación de dependencias:
Importa los objetos request y response de Express, la biblioteca jsonwebtoken para la manipulación de tokens JWT, y el modelo Usuario que probablemente representa un usuario en la base de datos.
Middleware validarJWT:

Define una función de middleware llamada validarJWT que toma la solicitud (req), la respuesta (res), y la función siguiente en la cadena (next).
Obtención del Token:

Extrae el token JWT del encabezado de la solicitud con la clave "x-token". Si no se proporciona el token, responde con un estado 401 (Unauthorized) indicando que el token no se reconoce.
Verificación y Obtención del Usuario:

Utiliza jwt.verify para verificar la validez del token y obtener el identificador único del usuario (uid). Luego, busca el usuario en la base de datos mediante el modelo Usuario utilizando el uid.
Validación del Estado del Usuario:

Verifica si el usuario existe y está activo (state: true). Si el usuario no existe o está inactivo, responde con un estado 401 y un mensaje indicando que el token no es válido.

Validar Rol:
Middleware esAdminRole:
Verifica si el usuario tiene un rol de administrador ("ADMIN_ROLE"). Si el usuario no está presente en la solicitud, responde con un estado 500. Si el usuario no es un administrador, responde con un estado 401 indicando que el usuario no tiene privilegios de administrador.
Middleware tieneRol:

Toma una serie de roles como argumentos y devuelve un middleware. Verifica si el usuario tiene al menos uno de los roles proporcionados. Si el usuario no está presente en la solicitud, responde con un estado 500. Si el usuario no tiene ninguno de los roles requeridos, responde con un estado 401 indicando que el usuario no tiene los roles necesarios.
Manejo de Casos Sin Usuario:

Ambos middlewares inicialmente verifican si el usuario está presente en la solicitud. Si no está presente, responde con un estado 500 indicando que se intenta verificar el rol sin haber validado el token.
Respuestas de Estado y Mensajes:

En caso de fallo en las verificaciones de rol, los middlewares responden con estados 500 o 401, proporcionando mensajes descriptivos sobre el motivo del error.
Exportación de Middlewares:

Exporta los middlewares esAdminRole y tieneRol para que puedan ser utilizados en otras partes del código de Express.js.

Models: 

el termino "models" se refiere a las representaciones de datos utilizadas para estructurar la información y manejar la lógica de negocio en una aplicación. La interpretación específica puede variar según el lenguaje de programación y el framework utilizado en un proyecto.

Categoria: 
Define un esquema para la entidad "Categoria" utilizando la función Schema. Este esquema tiene tres campos: nombre (String) que es obligatorio y único, estado (Boolean) con un valor por defecto de true, y usuario (ObjectId) que referencia a un documento del modelo "Usuario" y es obligatorio.
Configuración de Restricciones del Campo nombre:

Configura el campo nombre con restricciones, indicando que es obligatorio (required: true) y debe ser único (unique: true). Si no se cumple alguna de estas restricciones, se proporciona un mensaje de error personalizado.
Campo estado por Defecto:

Configura el campo estado con un valor por defecto de true. Este campo podría utilizarse para indicar si una categoría está activa o inactiva.
Exportación del Modelo:

Exporta el modelo "Categoria" creado a partir del esquema (CategoriaSchema) utilizando la función model. El modelo puede ser utilizado para realizar operaciones de base de datos relacionadas con la entidad "Categoria".

Producto:
Definición del Esquema (ProductoSchema):
Utiliza la función Schema de Mongoose para definir la estructura del modelo "Producto". Este esquema tiene varios campos, como nombre, estado, usuario, categoria, precio, descripcion, disponible, img y stock, cada uno con su tipo de dato y configuraciones específicas.
Restricciones del Campo nombre:

Configura el campo nombre como obligatorio (required: true) y único (unique: true). Si no se cumple alguna de estas restricciones, se proporciona un mensaje de error personalizado.
Campos con Valores por Defecto:

Configura los campos estado, precio, disponible y stock con valores por defecto (default). Por ejemplo, estado tiene un valor por defecto de true, indicando que el producto está activo.
Referencias a Otros Modelos (usuario y categoria):

Configura los campos usuario y categoria como referencias a documentos de los modelos "Usuario" y "Categoria", respectivamente. Estas referencias se establecen mediante el tipo Schema.Types.ObjectId y la propiedad ref.
Exportación del Modelo:

Exporta el modelo "Producto" creado a partir del esquema (ProductoSchema) utilizando la función model. El modelo puede ser utilizado para realizar operaciones de base de datos relacionadas con la entidad "Producto".

Rol:
define un modelo de datos en Mongoose para la entidad "Role" en una aplicación de Node.js con MongoDB. El modelo tiene un solo campo llamado role de tipo String, que es obligatorio. Se exporta el modelo "Role" creado a partir de este esquema, permitiendo su uso en operaciones de base de datos relacionadas con roles.

Server:
Configuración de rutas y puertos:

Define rutas y puertos para diferentes recursos de la API, como autenticación, usuarios, categorías, productos, búsqueda y ventas. 

Middlewares:

Configura middlewares, como cors para manejar solicitudes HTTP, express.json() para el análisis de cuerpos JSON, y express.static para servir archivos estáticos desde la carpeta "public".
Enrutamiento:

Utiliza el método routes para asignar las rutas definidas a controladores específicos mediante el uso de archivos de rutas (por ejemplo, "../routes/auth").
Arranque del servidor:

Utiliza el método listen para iniciar el servidor en el puerto especificado, mostrando un mensaje en la consola cuando el servidor está en línea.

Usuario:
Este código define un método toJSON para el esquema de Mongoose llamado UsuarioSchema. El método se encarga de modificar la representación JSON de un objeto de usuario antes de enviarlo como respuesta. Elimina propiedades sensibles como __v y password, y reemplaza la propiedad _id por uid para mayor claridad. El esquema modificado se exporta como el modelo "Usuario" para su uso en operaciones relacionadas con usuarios en la base de datos MongoDB.

Ventas:
define un esquema de datos llamado VentasSchema utilizando Mongoose para una entidad "Ventas" en una aplicación de Node.js con MongoDB. El esquema contiene campos como usuario, time, date, descripcion, total y estado. Establece relaciones con otros modelos como "Usuario" a través del campo usuario. Además, proporciona valores predeterminados para algunos campos y establece restricciones de requerimiento. El esquema se exporta como el modelo "Ventas" para ser utilizado en operaciones relacionadas con ventas en la base de datos.

Routes (rutas):
Cuando se habla de "routes" nos referimos a la organización y desarrollo de estas rutas dentro del código fuente de la aplicación. Puedes utilizar Visual Studio Code para abrir y editar estos archivos de rutas, facilitando la gestión y modificación de las rutas de tu aplicación web. Cada archivo dentro de la carpeta "routes" podría contener definiciones de rutas específicas para autenticación (auth.js), usuarios (usuarios.js), etc. Estos archivos de rutas se encargan de manejar las solicitudes HTTP relacionadas con esas entidades específicas.

Auth:
define las rutas para la autenticación en una aplicación Express.js. Utiliza el middleware validarJWT para verificar la validez del token de autenticación en la ruta "/". Además, en la ruta "/login", utiliza el middleware check de Express Validator para validar los campos email y password en el cuerpo de la solicitud mediante reglas específicas. El middleware validarCampos se encarga de verificar si hubo errores de validación. Estas rutas están asociadas a funciones controladoras, como obtenerID y login, que manejan las lógicas de negocio correspondientes. El router finalmente se exporta para ser utilizado en la configuración principal de las rutas de la aplicación.

Buscar:
define una única ruta en Express.js para realizar búsquedas. Utiliza el controlador buscar proveniente de "../controllers/buscar" para manejar la lógica de búsqueda. La ruta espera dos parámetros en la URL, ":coleccion" y ":termino", que representan la colección en la que se realizará la búsqueda y el término de búsqueda, respectivamente. Cuando un cliente realiza una solicitud GET a esta ruta con los parámetros adecuados, la función buscar se encargará de procesar la búsqueda y devolver los resultados correspondientes. El router se exporta para ser utilizado en la configuración principal de las rutas de la aplicación.

Categorias:
define rutas en Express.js para realizar operaciones CRUD en el recurso "categorias". Utiliza diversos middlewares para validar la autenticación del token (validarJWT), el rol del usuario (esAdminRole y tieneRol), así como la existencia de la categoría (categoriaExiste). Las rutas incluyen acciones como obtener todas las categorías, obtener una categoría por su ID, crear una nueva categoría, actualizar una categoría existente y borrar una categoría. Además, se aplican validaciones específicas para garantizar la integridad de los datos y la seguridad de las operaciones.

Productos:
establece rutas en Express.js para realizar operaciones CRUD en el recurso "productos". Utiliza diversos middlewares para validar la autenticación del token (validarJWT), el rol del usuario (esAdminRole), así como la existencia del producto (productoExiste). Las rutas incluyen acciones como obtener todos los productos, obtener un producto por su ID, crear un nuevo producto, actualizar un producto existente y borrar un producto. Además, se aplican validaciones específicas para garantizar la integridad de los datos y la seguridad de las operaciones.

Usuarios:
Utiliza varios middlewares para validar la autenticación del token (validarJWT), el rol del usuario (tieneRol, esAdminRole), y la existencia del usuario por su ID (existeUsuarioPorId). Además, se aplican validaciones específicas para garantizar la integridad de los datos al crear, actualizar o borrar un usuario. Estas validaciones incluyen verificar la existencia del email en la base de datos, el formato del email, la longitud de la contraseña y la validez del rol asignado al usuario.

Ventas: 
Utiliza varios middlewares para validar la autenticación del token (validarJWT), el rol del usuario (tieneRol, esAdminRole), y la existencia de la venta por su ID (ventaExiste). Además, se aplican validaciones específicas para garantizar la integridad de los datos al crear, actualizar o borrar una venta. Estas validaciones incluyen verificar la validez del ID de la venta y garantizar que solo ciertos roles tengan acceso a ciertas operaciones.


GIT IGNORE: 
este archivo se utiliza para indicar a Git qué archivos y carpetas debe ignorar durante las operaciones de seguimiento y confirmación. Esto es útil para excluir archivos generados automáticamente, dependencias de terceros, archivos de configuración local y otros elementos que no deben ser compartidos en el repositorio Git.

Template.env:
es una convención informal utilizada por algunos desarrolladores para proporcionar un modelo de configuración de variables de entorno en proyectos como este.

Index:
Configuración de Variables de Entorno: Utiliza dotenv para cargar la configuración de variables de entorno desde un archivo .env en el proyecto. Esto es comúnmente utilizado para almacenar configuraciones sensibles o específicas del entorno, como claves de API o información de la base de datos.

Inicio del Servidor: Importa la clase Server desde el archivo server.js en el directorio models y crea una nueva instancia de esta clase. Luego, llama al método listen() de la instancia, que inicia el servidor y lo pone en funcionamiento, escuchando las solicitudes en el puerto especificado en las variables de entorno o en un valor predeterminado.

Package lock json: es una herramienta para garantizar la consistencia y reproducibilidad de las instalaciones de dependencias en proyectos como este.

Package json: ayuda a configurar y gestionar el proyecto de manera efectiva.

