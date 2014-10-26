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
$timelines = array();

foreach ($ffSummarizedDir as $id => $community) {
	if (isset($community->timeline)) {
		$entry = array(
			'id' => $id,
			'name' => $community->name,
			'timeline' => $community->timeline
		);
		array_push($timelines, $entry);
	}
}

print_r(json_encode($timelines));
?>