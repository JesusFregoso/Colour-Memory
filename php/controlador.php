<?php
	$servername = "127.0.0.1";
	$username = "root";
	$password = "";
	$dbname = "colour_memory";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	if (isset($_GET['get_records'])) {
		$sql = "SELECT * FROM records ORDER BY player_score DESC,player_time ASC limit 5;";
		$result = $conn->query($sql);
		$records = array();
		if ($result->num_rows > 0) {
		    // output data of each row
		    while($row = $result->fetch_assoc()) {
		    	$records[] = $row;
		    }
		}
		$conn->close();
		$res = array(
			'msg'=>'Records Found',
			'records'=>$records,
			'success'=>true,

		);
		echo json_encode($res);
		exit;
	}

	if (isset($_POST['save_record'])){
		$sql = "INSERT INTO records (player_name, player_score, player_time,player_email)
			VALUES ('".$_POST['player_name']."', '".$_POST['player_score']."', '".$_POST['player_time']."','".$_POST['player_email']."')";

		if ($conn->query($sql) === TRUE) {
			$res = array(
				'success'=>true,
				'msg'=>'New record created successfully'
			);
			sendEmail();
		} else {
			$res = array(
				'success'=>false,
				'msg'=>"Error: " . $sql . "<br>" . $conn->error
			);
		}
		$conn->close();

		echo json_encode($res);
		exit;
	}

	function sendEmail(){
		$headers =  'MIME-Version: 1.0' . "\r\n"; 
		$headers .= 'From: Your name <colour@memory.com>' . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 



		$msg = "Hi ".$_POST['player_name']." this is your record\n
				Score : ".$_POST['player_score']." Time: ".$_POST['player_score']."";
		$msg = wordwrap($msg,70);
		mail($_POST['player_email'],"Colour Memory Record",$msg,$headers);
	}


?>