<?php

$postData = file_get_contents("php://input");
$request = json_decode($postData);
$json = $request;
$result = json_encode($json);
file_put_contents('../layers.json', $result);
echo $result;
