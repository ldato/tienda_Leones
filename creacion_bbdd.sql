CREATE TABLE Marcas (
idMarca INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Proveedores (
idProveedor INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
nombre VARCHAR(100) NOT NULL,
telefono INT,
email VARCHAR(255)
);

CREATE TABLE Categorias (
idCategoria INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE Talles (
idTalle INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE Clientes (
idClienteDNI INT NOT NULL PRIMARY KEY,
nombre VARCHAR(200) NOT NULL,
apellido VARCHAR(200) NOT NULL,
telefono INT,
email VARCHAR(200),
direccion VARCHAR(200)
);

CREATE TABLE Articulos (
idArticulo VARCHAR(255) NOT NULL PRIMARY KEY,
idMarca INT,
idTalle INT,
idCategoria INT,
idProveedor INT,
precio DOUBLE,
costo DOUBLE,
cantidad INT,
FOREIGN KEY (idMarca) REFERENCES Marcas (idMarca),
FOREIGN KEY (idTalle) REFERENCES Talles (idTalle),
FOREIGN KEY (idCategoria) REFERENCES Categorias (idCategoria),
FOREIGN KEY (idProveedor) REFERENCES Proveedores (idProveedor)
);

CREATE TABLE Ventas (
idVenta INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
idCliente INT,
fecha DATETIME,
total FLOAT,
FOREIGN KEY (idCliente) REFERENCES Clientes (idClienteDNI)
);

CREATE TABLE VentasXArticulo (
idVenta INT,
idArticulo VARCHAR(255),
cantidad INT,
PRIMARY KEY (idVenta, idArticulo),
FOREIGN KEY (idVenta) REFERENCES Ventas (idVenta),
FOREIGN KEY (idArticulo) REFERENCES Articulos (idArticulo)
);