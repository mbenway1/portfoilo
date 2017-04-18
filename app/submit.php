<?php $email_to = "benwaymichael@gmail.com";
$email_subject = "MB Designs";
$nameCompany = $_POST['NameCompany'];
$phone = $_POST['Phone'];
$email = $_POST['Email'];
$message = $_POST['Message'];
$budget = $_POST['Budget'];
$email_message = "Form details below.\n\n";
function clean_string($string)
{
    $bad = array("content-type", "bcc:", "to:", "cc:", "href");
    return str_replace($bad, "", $string);
}

$email_message .= "Name/Company: " . $nameCompany . "\n";
$email_message .= "Phone: " . $phone . "\n";
$email_message .= "Email: " . $email . "\n";
$email_message .= "Message: " . $message . "\n";
$email_message .= "Budget: " . $budget . "\n";
$headers = 'From: ' . $email . "\r\n" . 'Reply-To: ' . $email . "\r\n" . 'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);
header('Location: http://dev.michaelbenway.com');