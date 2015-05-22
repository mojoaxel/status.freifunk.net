<?php
$jsonurl = "https://freifunk.net/map/ffSummarizedDir.json";

$opts = array(
	'http'=>array(
			'method'=>"GET",
			'header'=>
				"Accept-language: en\r\n" .
				"User-Agent: Mozilla/5.0 (Windows NT 5.1; rv:23.0) Gecko/20100101 Firefox/23.0\r\n"
	)
);
$context = stream_context_create($opts);
$ffSummarizedDir_json = file_get_contents($jsonurl, false, $context);
$ffSummarizedDir = json_decode($ffSummarizedDir_json);

print_r(json_encode($ffSummarizedDir));
?>