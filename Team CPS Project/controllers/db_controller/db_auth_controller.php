<?php
require "../../config/db_connection.php";

function random_num($length)
{

	$text = "";
	if($length < 5)
	{
		$length = 5;
	}

	$len = rand(4,$length);

	for ($i=0; $i < $len; $i++) { 
		# code...

		$text .= rand(0,9);
	}

	return $text;
}

function check_user($email){
    global $con;

    $query = "select * from login where user_email = '$email' limit 1";

    $result = mysqli_query($con,$query);
    if($result && mysqli_num_rows($result) > 0)
    {
        return false;
    }
    else return true;
}


function db_create_user($user_data){
    global $con;
    $name = $user_data['name'];
    $email = $user_data['email'];
    $password = $user_data['password'];
    $user_id = random_num(20);

// check if user exists
    if(check_user($email)){ 
        //if user does not exist, create user
        $hashedPwd = password_hash($password,PASSWORD_DEFAULT);
        $query = "insert into login (user_id,user_name,user_email,password) values ('$user_id','$name','$email','$hashedPwd')";
	    
        if(mysqli_query($con, $query)){
            return array('success' => true);
        }
        else return array('success' => false, 'error' => array('message' => 'Internal Server error: Failed to register user'));
    }
    else return array('success' => false, 'error' => array('message' => 'User already exist')); //false

}


function login($email,$pwd){
    // check user exist
    global $con;
    $isEmailExists = checkEmail($email);
    $isPasswordExists = checkPassword($pwd,$email);
    if( $isEmailExists['success'] && $isPasswordExists['success']){
        $query = "SELECT * FROM `login` WHERE user_email =  '$email'";
        $result = mysqli_query($con, $query);
        if(mysqli_num_rows($result) > 0){
            $login_data = mysqli_fetch_assoc($result);
            return array('success' => true, 'data' => array('email' => $login_data['user_email'], 'name' => $login_data['user_name']));
        }
        else return array('success' => false, 'error' => array('message' => 'Account does not exist.'));

    }
    else{
        if(!$isEmailExists['success']) return array('success' => false,'error' => $isEmailExists['error'] );
        return array('success' => false,'error' => $isPasswordExists['error'] );
    }}
    

function checkPassword($pwd, $email){
    global $con;
    $query = "SELECT password FROM `login` WHERE user_email =  '$email'";
    $result = mysqli_query($con, $query);
    if(mysqli_num_rows($result) > 0){
        // Compare the passwords to see if they are correct
        $password = mysqli_fetch_assoc($result)['password'];
        $verify_pwd = password_verify($pwd, $password );
       if($verify_pwd == true) return array('success' => true);
       else return array('success' => false, 'error' => array('message' => 'Incorrect password.', 'errorFields' => array('password')));
    }
    else return array('success' => false, 'error' => array('message' => 'Account does not exist', 'errorFields' => array('password')));
}

function checkEmail($email){
    global $con;
   
    $query = "SELECT user_email FROM `login` WHERE user_email =  '$email'";
    $result = mysqli_query($con, $query);
    if(mysqli_num_rows($result) > 0){
        // Compare the passwords to see if they are correct
       return array('success' => true);
    }
    else return array('success' => false, 'error' => array('message' => 'Account does not exist', 'errorFields' => array('email')));
}

function validate_password($pwd){
    if(strlen($pwd) < 6 || strlen($pwd) > 20) echo json_encode(array('success' => false, 'error' => array('message' => 'Password must be 6 to 20 characters', 'errorFields' => array('password','password2') )));
    
    elseif(!preg_match("/^(?=.*[0-9])/",$pwd)) echo json_encode(array('success' => false, 'error' => array('message' => 'Password must include numeric value', 'errorFields' => array('password','password2') ))); 

    elseif(!preg_match("/^(?=.*[a-z])/",$pwd)) echo json_encode(array('success' => false, 'error' => array('message' => 'Password must include a lowcase letter', 'errorFields' => array('password','password2') ))); 

    elseif(!preg_match("/^(?=.*\W)/",$pwd)) echo json_encode(array('success' => false, 'error' => array('message' => 'Password must include a special character', 'errorFields' => array('password','password2') ))); 

    elseif(!preg_match("/^(?=.*[A-Z])/",$pwd)) echo json_encode(array('success' => false, 'error' => array('message' => 'Password must include an uppercase letter', 'errorFields' => array('password','password2') ))); 
}

    