<?php

$email_to = "benwaymichael@gmail.com";
$email_subject = "MB Designs";
$nameCompany = $_POST['NameCompany']; // required
$phone = $_POST['Phone']; // required
$email = $_POST['Email']; // required
$message = $_POST['Message']; // not required
$budget = $_POST['Budget']; // required
// These are for testing if it is broken in the app
//$nameCompany = "test"; // required
//$phone = "test"; // required
//$email = "test"; // required
//$message = "test"; // not required
//$budget = "Message test"; // required
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

// create email headers
$headers = 'From: ' . $email . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);

// Below is the redirect line that needs to be enabled for live
//header('Location: http://dev.michaelbenway.com');


// remove everything below when going to the live minimized file
?>
<!DOCTYPE html>
<html lang="en">
<body>
<?php
print '<code class="block"><pre>sent to: ' . $email_to . '</pre></code>';
print '<code class="block"><pre>subject: ' . $email_subject . '</pre></code>';
print '<code class="block"><pre>' . $nameCompany . '</pre></code>';
print '<code class="block"><pre>result: ' . $phone . '</pre></code>';
print '<code class="block"><pre>result: ' . $email . '</pre></code>';
print '<code class="block"><pre>result: ' . $message . '</pre></code>';
print '<code class="block"><pre>result: ' . $budget . '</pre></code>';
?>
</body>
</html>
