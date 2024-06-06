<?php
session_start(); // Inicia la sesión para poder acceder a $_SESSION

include 'database.php'; // Incluye el archivo de conexión a la base de datos

// Verifica si no hay carrito en la sesión o está vacío
if (!isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
    echo json_encode([]); // Si no hay carrito, devuelve un array JSON vacío
    exit(); // Termina la ejecución del script
}

// Construye una cadena de texto con los IDs de los productos en el carrito separados por comas
$cartItems = implode(',', $_SESSION['cart']);

// Consulta SQL para seleccionar todos los productos cuyos IDs estén en el carrito
$sql = "SELECT * FROM products WHERE id IN ($cartItems)";

// Ejecuta la consulta en la base de datos
$result = $conn->query($sql);

// Array para almacenar los detalles de los productos en el carrito
$cart = array();

// Verifica si hay resultados de la consulta
if ($result->num_rows > 0) {
    // Itera sobre cada fila de resultados y agrega los detalles del producto al array $cart
    while($row = $result->fetch_assoc()) {
        $cart[] = $row;
    }
}

// Cierra la conexión a la base de datos
$conn->close();

// Devuelve los detalles de los productos en el carrito en formato JSON
echo json_encode($cart);
?>
