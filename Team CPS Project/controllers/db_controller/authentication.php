<?php
include "db_auth_controller.php";

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');



if(isset($_POST["userData"])) {
    $user_data =  $_POST["userData"];
    $regex_email = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
    $regex_password = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/";

    if (empty($user_data['name']) || empty($user_data['email']) || empty($user_data['password']) || empty($user_data['password2']) ){
        echo json_encode(array('success' => false, 'error' => array('message' => 'Fill in all fields', 'errorFields' => array('name','email','password','password2') )));
    }
    elseif (!filter_var($user_data['email'], FILTER_VALIDATE_EMAIL) || !preg_match($regex_email, $user_data['email']) ){
        echo json_encode(array('success' => false, 'error' => array('message' => 'Enter valid email', 'errorFields' => array('email'))));
      
    }
    elseif(!preg_match($regex_password, $user_data['password'])){
        validate_password($user_data['password']);
    }
    elseif ($user_data['password'] != $user_data['password2']){
        echo json_encode(array('success' => false, 'error' => array('message' => 'Password does not match', 'errorFields' => array('password','password2') )));
        
    }
    else {
        
        $create_user_reponse = db_create_user($user_data);
        if($create_user_reponse['success']){
            // user has been successfully created
            echo json_encode(array('success' => true));
        }
        // failed to create user
        else  echo json_encode(array('success' => false, 'error' => array('message' => $create_user_reponse['error']['message'])));
        
    }

    


}


// log in user to their page
elseif(isset($_POST["userData_signIn"])) {
    // echo json_encode(array('success' => true));
    $regex_email = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
    $signIn_data =  $_POST["userData_signIn"];

    if (empty($signIn_data['email']) || empty($signIn_data['password']) ){
        echo json_encode(array('success' => false, 'error' => array('message' => 'Enter your email and password', 'errorFields' => array('email','password'))));
    }
    elseif (!filter_var($signIn_data['email'], FILTER_VALIDATE_EMAIL) || !preg_match($regex_email, $signIn_data['email'])){
        echo json_encode(array('success' => false, 'error' => array('message' => 'Enter valid email', 'errorFields' => array('email'))));
    }
    else echo json_encode(login($signIn_data['email'],$signIn_data['password']));
}



else echo json_encode(array('success' => false, 'error' => array('message' => 'Server Error: Invalid endpoint.')));
