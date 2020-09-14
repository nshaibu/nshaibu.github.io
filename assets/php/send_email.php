<?php
if($_POST) {
    $subject = $_POST['subject'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $subject = "Hire me -" . $subject;
    $headers = "From: " . $email;
   
    $result = mail("nafiushaibu1@gmail.com", $subject, $message, $headers);
    if ($result)
        echo("Message Sent");
    else
        echo("Sending message failed!");
}
?>

