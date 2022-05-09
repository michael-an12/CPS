<?php include 'db_credentials.php';

    $con = mysqli_connect(servername,username,password,dbname); 
        if (mysqli_connect_errno()){
            echo "Connection failed" . mysqli_connect_error();
            die();
        }


?>