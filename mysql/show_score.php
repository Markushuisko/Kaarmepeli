<?php
require_once('db.php');

$sql = "SELECT name, points, DATE_FORMAT(date, '%d.%e.%Y') as date FROM highscore;";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row['name'] . $row['points'] . $row['date'] . "<br>";
    }
} else {
    echo "0 results";
}
