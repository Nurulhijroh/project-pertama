<?php>
session_start();
$response = ["status" => "error", "message" => "permintaan tidak valid"];


if (isset($_POST['action'])){
    $action = $_POST['action'];

    if ($action == "login" && isset($_POST['username'])){
        $_SESSION['username'] = $_POST['username'];
        $response = ["status" => "succes", "message" => "login berhasil"];
    }

    elseif ($action == "logout"){
        session_unset();
        session_destroy();
        $response = ["status" => "succes", "message" => "logout berhasil"];
    }

    elseif ($action == "addAttendance" && isset($_SESSION['username']) && isset($_POST['teacherName'])) {
        $teacherName = $_POST['teacherName'];
        $date = date("Y-m-d");
        $time = date("H:i:s");
}
    

elseif ($action == "getAttendance" && isset($_SESSION['username'])) { 
    $records = [];
if (file_exists("attendance.txt")) {
     $fileData = file("attendance.txt", FILE_IGNORE_NEW_LINES); 
     foreach ($fileData as $index => $line) { 
        list($teacherName, $date, $time) = explode(", ", $line);
        $records[] = ["no" => $index + 1, "teacherName" => $teacherName, "date" => $date, "time" => $time];
         } 
         } 
         
        $response = ["status" => "success", "records" => $records]; 
        } } header('Content-Type: application/json'); 
        echo json_encode($response); 
        ?>

