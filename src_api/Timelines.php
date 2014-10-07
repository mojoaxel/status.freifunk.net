<?php
$jsonurl = "https://freifunk.net/map/ffSummarizedDir.json";

$ffSummarizedDir_json = file_get_contents($jsonurl, 0, null, null);
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