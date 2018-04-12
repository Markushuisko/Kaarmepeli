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

if(isset($_POST['name'])){ $name = $_POST['name']; }

if(isset($_POST['points'])){ $points = $_POST['points']; }


$sql = "INSERT INTO highscore (name, date, points) VALUES ('$name', CURDATE(), '$points')";

if ($conn->query($sql) === TRUE) {
    echo "Tiedot tallennettiin onnistuneesti";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
header('Location:show_score.php');



 /*require_once('db.php');

$sql = "INSERT INTO highscore (date, points, name) VALUES (CURDATE(), 700, 'Ismo');";


 if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
} */
