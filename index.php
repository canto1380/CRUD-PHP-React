<?php
include 'db/db.php';
header('Access-Control-Allow-Origin: *'); //Recibir peticiones de cualquier URl - IDEM NodeJS Cors

if($_SERVER['REQUEST_METHOD']=='GET') { 
    if(isset($_GET['id'])) {//Verificar si es es un select a todos o a un id 
        $query="select * from framework where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado ->fetch(PDO::FETCH_ASSOC)); // Devuelve el resultado como un array asociativo
    } else {
        $query="select * from framework";
        $resultado=metodoGet($query);
        echo json_encode($resultado ->fetchAll());
    }
    header("HTTP/1.1 200 OK");
    exit();
}
if($_POST['METHOD']=='POST'){
  unset($_POST['METHOD']);
  $nombre=$_POST['nombre'];
  $lanzamiento=$_POST['lanzamiento'];
  $desarrollador=$_POST['desarrollador'];
  $query="insert into framework(nombre, lanzamiento, desarrollador) values ('$nombre', '$lanzamiento', '$desarrollador')";
  $queryAutoIncrement="select MAX(id) as id from framework";
  $resultado=metodoPost($query, $queryAutoIncrement);
  echo json_encode($resultado);
  header("HTTP/1.1 200 OK");
  exit();
}

if($_POST['METHOD']=='PUT') {
     unset($_POST['METHOD']);
     $id=$_GET['id'];
     $nombre=$_POST['nombre'];
     $lanzamiento=$_POST['lanzamiento'];
     $desarrollador=$_POST['desarrollador'];
     $query= "update framework set nombre='$nombre', lanzamiento='$lanzamiento', desarrollador='$desarrollador' where id='$id'";
     $resultado = metodoPut($query);
     echo json_encode($resultado);
     header("HTTP/1.1 200 OK");
     exit();
}

if($_POST['METHOD']=='DELETE') {
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query= "delete from framework where id='$id'";
    $resultado = metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");

?>