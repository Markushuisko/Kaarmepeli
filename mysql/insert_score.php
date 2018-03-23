<?php

$server = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'testi';

//connectaaminen

$conn = new mysqli($server, $user, $pass, $dbname);

//tarkastetaan connection

if($conn->connect_error) {
  die('Connectaaminen failas:' .$conn->connect_error);
}
 /*require_once('db.php');

$sql = "INSERT INTO highscore (date, points, name) VALUES (CURDATE(), 700, 'Ismo');";
*/

/* if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
} */

$name = mysqli_real_escape_string($conn, $_POST['name']);
$date = mysqli_real_escape_string($conn, $_POST['date']);
$points = mysqli_real_escape_string($conn, $_POST['points']);

$sql = "INSERT INTO highscore (name, date, points) VALUES ('$name', '$date', $'points')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
