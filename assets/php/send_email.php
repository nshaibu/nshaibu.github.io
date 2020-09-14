<?php
if($_GET) {
    $subject = $_GET['subject'];
    $email = $_GET['email'];
    $message = $_GET['message'];

    $subject = "Hire me -" . $subject;

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: " . $email . "\r\n";
   
    mail("nafiushaibu1@gmail.com", $subject, $message, $headers);
    echo "Hello world";
}
?>

