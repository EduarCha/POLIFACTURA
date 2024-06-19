<?php  
$servername = "localhost";
$database = "db_parreno";
$username = "root";
$password = "00000000";
// Crear CONEXION
$conn = mysqli_connect($servername, $username, $password, $database);
// Revisar CONEXION
if (!$conn) {
    die("Conexion fallida: " . mysqli_connect_error());
}
?>