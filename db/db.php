<?php
$pdo=null;
$host="localhost:3307";
$user="root";
$password="";
$bd="crud-tutorial";

function conectar(){
    try{
        $GLOBALS['pdo']=new PDO("mysql:host=".$GLOBALS['host'].";dbname=".$GLOBALS['bd']."", $GLOBALS['user'], $GLOBALS['password']);
        // $GLOBALS['pdo']= new PDO("mysql:host=localhost:3307;dbname=crud-tutorial", 'root', '', array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        $GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch (PDOException $e){
        print "Error!: No se pudo conectar a la bd ";
        print "\nError!: ".$e."<br/>";
        die();
    }
}

function desconectar(){
    $GLOBALS['pdo']=null;
}

function metodoGet($query){
    try{
        conectar();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->setFetchMode(PDO::FETCH_ASSOC);
        $sentencia->execute();
        desconectar();
        return $sentencia;
    }catch(Exception $e){
        die("Error: ".$e);
    }
}

function metodoPost($query, $queryAI) {
    try {
        conectar();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->execute();
        $idAI=metodoGet($queryAI)->fetch(PDO::FETCH_ASSOC);
        $resultado= array_merge($idAI, $_POST); //Junta los dos arreglos
        $sentencia->closeCursor();
        desconectar();
        return $sentencia;
    } catch (Exception $e) {
        die('Error: '.$e);
    }
}

function metodoPut($query) {
    try {
        conectar();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->execute();
        $resultado= array_merge($_GET, $_POST); //Junta los dos arreglos
        $sentencia->closeCursor();
        desconectar();
        return $sentencia;
    } catch (Exception $e) {
        die('Error: '.$e);
    }
}

function metodoDelete($query) {
    try {
        conectar();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->execute();
        $sentencia->closeCursor();
        desconectar();
        return $_GET['id'];
    } catch (Exception $e) {
        die('Error: '.$e);
    }
}

?>