<?php
$servername = "localhost"; // Nombre del servidor de la base de datos
$username = "root"; // Nombre de usuario de la base de datos
$password = "Inter2010@"; // Contraseña de la base de datos
$dbname = "camping_store"; // Nombre de la base de datos

// Crear conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si la conexión fue exitosa
if ($conn->connect_error) {
    // Si la conexión falla, muestra un mensaje de error y termina la ejecución del script
    die("Conexión fallida: " . $conn->connect_error);
}
?>
