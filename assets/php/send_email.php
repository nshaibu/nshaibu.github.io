<?php
if($_POST) {
    $subject = $_POST['subject'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $subject = "Hire me -" . $subject;

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: " . $email . "\r\n";;
   
    mail("nafiushaibu1@gmail.com", $subject, $message, $headers);
    // if ($result)
    //     echo("Message Sent");
    // else
    //     echo("Sending message failed!");
}
?>

