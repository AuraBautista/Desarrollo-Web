<?php
// Inicia la sesión para mantener la información del carrito entre diferentes páginas.
session_start();

// Si no existe la variable de sesión 'cart', se inicializa como un array vacío.
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = array();
}

// Obtiene la acción y el ID del producto enviados mediante una solicitud POST.
$action = $_POST['action'];
$productId = $_POST['product_id'];

// Verifica la acción realizada.
if ($action == 'add') {
    // Si la acción es agregar, verifica si el producto ya está en el carrito antes de agregarlo.
    if (!in_array($productId, $_SESSION['cart'])) {
        $_SESSION['cart'][] = $productId; // Agrega el ID del producto al carrito.
    }
} elseif ($action == 'remove') {
    // Si la acción es eliminar, busca y elimina el ID del producto del carrito.
    if (($key = array_search($productId, $_SESSION['cart'])) !== false) {
        unset($_SESSION['cart'][$key]); // Elimina el ID del producto del carrito.
    }
}

// Devuelve el contenido actualizado del carrito en formato JSON.
echo json_encode($_SESSION['cart']);
?>
