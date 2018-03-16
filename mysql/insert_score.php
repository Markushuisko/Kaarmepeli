<?php
require_once('db.php');

$sql = "INSERT INTO highscore (date, points, name) VALUES (CURDATE(), 700, 'Ismo');";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
