<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require `phpmailer/src/Exception.php`;
require `phpmailer/src/PHPMailer.php`;

$mail = new PHPMailer(true);
$mail->CharSet = `UTF-8`;
$mail->setLanguage(`ru`,`phpmailer/language`);
$mail->IsHTML(true);
$mail->setForm(`tarassz@mail.ru`,`palich`);
$mail->addAddress(`mossnabitkana@gmail.com`);
$mail->Subject = `Привет`;
$hand = "Правая";
if($_POST[`hand`] == "left"){
$hand = "Левая";
}

$body = `<h1>Привет это моё первое письмо</h1>`;
if(trim(!empty($_POST[`name`]))){
$body.=`<p><strong>Имя:</strong> `.$_POST[`name`].`</p>`;
}

$mail->Body = $body;
if(!$mail->send()){
    $message = `Ошибка`;
} else {
    $message = `Данные отправлены`;
}
$response = [`message` => $message];
header(`Content-type: application/json`);
echo json_encode($response);
?>