<?php
include 'database.php'; // Incluye el archivo de conexión a la base de datos

$sql = "SELECT * FROM products"; // Consulta SQL para seleccionar todos los productos
$result = $conn->query($sql); // Ejecuta la consulta en la base de datos

$products = array(); // Inicializa un array para almacenar los productos

// Verifica si hay resultados de la consulta
if ($result->num_rows > 0) {
    // Itera sobre cada fila de resultados y agrega los detalles del producto al array $products
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$conn->close(); // Cierra la conexión a la base de datos

echo json_encode($products); // Devuelve los detalles de los productos en formato JSON
?>
