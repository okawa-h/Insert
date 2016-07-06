<?php

	header("Access-Control-Allow-Origin: *");

	#文字コード指定
	// setlocale(LC_ALL,'ja_JP.UTF-8');

	// #Ajax通信ではなく、直接URLを叩かれた場合は処理をしないようにしたい
	// if (!(isset($_SERVER['HTTP_X_REQUESTED_WITH']) 
	// 	&& strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest')
	// && (!empty($_SERVER['SCRIPT_FILENAME']) 
	// 	&& basename($_SERVER['SCRIPT_FILENAME']) === 'board.php')
	// ) {
	// 	die();
	// }

	// #リファラーを使いたいので、入っていなければノーカウント
	// $referer = htmlspecialchars($_SERVER['HTTP_REFERER'], ENT_QUOTES, 'UTF-8');
	// if (!(isset($referer))) {
	// 	exit;
	// }

	#処理を判別(GET)
	$action = htmlspecialchars($_GET['act'], ENT_QUOTES, 'UTF-8');
	switch ($action) {
		case 'show':
			showJson();
			break;
		case 'write':
			writeJson();
			break;
		default:
			exit;
	}
	exit;

	/* =======================================================================
		Show Json
	========================================================================== */
	function showJson() {

		$jsonname = 'board.json'; 
		$json     = file_get_contents($jsonname);
		$json     = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
		$arr      = json_encode($json, true);

		echo $arr;
	}

	/* =======================================================================
		Write Json
	========================================================================== */
	function writeJson() {

		$jsonname = 'board.json';
		// $json     = file_get_contents($jsonname);
		// $pluscnt  = json_decode($json, true);

		//$content = htmlspecialchars($_GET['content'], ENT_QUOTES, 'UTF-8');
		$status = array(
			"id"   => "0",
			"name" => "なまえ",
			"ip"   => $_SERVER["REMOTE_ADDR"],
			"date" => date("Y-m-d H:i:s"),
			"content" => "content",
		);

		$handle = fopen( $jsonname,'w' );
		fwrite($handle, json_encode( $status ));
		fclose($handle);

		echo json_encode( json_decode($status, true) );
	}
?>