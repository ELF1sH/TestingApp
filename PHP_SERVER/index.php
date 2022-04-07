<?php
include_once 'helpers/headers.php';

header("Content-type: application/json");

global $Link;
$Link = mysqli_connect("127.0.0.1", "root", "", "testapp");
if (!$Link) {
    setHTTPStatus("500", ["message" => "DB connection error. Error number: " . mysqli_connect_errno() . ". Text error: " . mysqli_connect_error()]);
    exit;
}

function getMethod()
{
    return $_SERVER['REQUEST_METHOD'];
}

function getData($method)
{
    $data = new stdClass();
    $data->parameters = [];
    foreach ($_GET as $key => $value) {
        if ($key != "q") {
            $data->parameters[$key] = $value;  // url request parameters
        }
    }
    if ($method != "GET") {
        $data->body = json_decode(file_get_contents('php://input'));  // raw body of POST, PUT, PATCH... requests
    }
    return $data;    // { "parametres": {**params from URL**}, "body": {**raw body**} }
}

$url = isset($_GET['q']) ? $_GET['q'] : '';
$url = rtrim($url, '/');
$urlList = explode('/', $url);
$router = $urlList[0];
$requestData = getData(getMethod());    // { "parametres": {**params from URL**}, "body": {**raw body**} }
$method = getMethod();                  // GET, POST, PUT, PATCH ...



// !!! API IS OVER HERE !!!
if ($router == 'multiply') {
    switch ($method) {
        case "GET":
            if ($urlList[1] == "getLastEntry") {
                $res = $Link->query("SELECT * FROM multiplication WHERE id=(SELECT max(id) FROM multiplication);");
                if ($res) {
                    $data = $res->fetch_assoc();
                    setHTTPStatus("200", $data);
                } else {
                    setHTTPStatus("500", ['message' => $Link->error]);
                }
            } else {
                setHTTPStatus("400");
            }
            break;
        case "POST":
            $a = $requestData->body->a;
            $b = $requestData->body->b;
            $result = $requestData->body->result;
            $stmt = $Link->prepare("INSERT INTO multiplication (a, b, result) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $a, $b, $result);
            $res = $stmt->execute();
            if ($res) {
                setHTTPStatus("200", ['message' => "OK"]);
            } else {
                setHTTPStatus("500", ['message' => $Link->error]);
            }
            break;
        default:
            setHTTPStatus("400");
            break;
    }
} else {
    setHTTPStatus("404");
}


mysqli_close($Link);
