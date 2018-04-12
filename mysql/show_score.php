<?php
require_once('db.php');

$sql = "SELECT name, points, DATE_FORMAT(date, '%d.%e.%Y') as date FROM highscore;";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    echo '<table><tr><th>Nimi</th><th>Pisteet</th><th>Pvm</th></tr>';
    while($row = $result->fetch_assoc()) {
      echo '<tr>';
  echo '<td>' . $row['name'] . '</td>';
  echo '<td>' . $row['points'] . '</td>';
  echo '<td>' . $row['date'] . '</td>';
    }
} else {
    echo "0 results";
}

?>

<a href="http://localhost/Kaarmepeli/" class="button">Takaisin peliin</a>
