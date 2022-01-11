<?php
    function manda_email($mensagem,$email='',$assunto=''){
    
        include_once('class.phpmailer.php');
        include_once('class.smtp.php');
    
        $alt_content = strip_tags($mensagem);
        $html_content = utf8_decode($mensagem);
        
        if ( empty($assunto) ) $assunto = utf8_decode('Contato');
        if ( empty($email) ) $email = utf8_decode('');
    
        $mail = new PHPMailer();
    
        $mail->IsSMTP(); // telling the class to use SMTP
        $mail->SMTPDebug = false;
        $mail->IsHTML(true);
        $mail->Mailer = 'smtp';
        $mail->Host = ''; // SMTP server
    
        $mail->SMTPSecure = 'ssl';
    
        $mail->Port	  = '465';
    
        $mail->SMTPAuth   = true;
    
        $mail->Username   = '';

        $mail->Password   = '';
        
        $mail->From = '';
        $mail->FromName = 'Contato';
    
        $mail->Subject = $assunto;
        $mail->AltBody = $alt_content;
        $mail->MsgHTML($html_content);
        
        $mail->AddAddress($email);
    
        if($mail->Send()){
            return 1;
        }else{
            return 0;
        }
    }
?>
