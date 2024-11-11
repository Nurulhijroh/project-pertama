if (localStorage.getItem("loggedIn") === "true") {
  showDashboard();
}

function login() {
  const username = document.getElementById("username").value;
  if (username) {
    localStorage.setItem("loggedIn", "true");
    showDashboard();
  } else {
    alert("Harap masukkan nama pengguna");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("attendanceRecords");
  location.reload();
}

function showDashboard() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  loadAttendanceRecords();
}

function showAddAttendanceForm() {
  document.getElementById("attendance-form").style.display = "block";
}

function addAttendance() {
  const teacherName = document.getElementById("teacher-name").value;
  const date = new Date();

  if (teacherName) {
    const attendance = {
      name: teacherName,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };

    let attendanceRecords =
      JSON.parse(localStorage.getItem("attendanceRecords")) || [];
    attendanceRecords.push(attendance);

    localStorage.setItem(
      "attendanceRecords",
      JSON.stringify(attendanceRecords)
    );

    document.getElementById("teacher-name").value = "";
    document.getElementById("attendance-form").style.display = "none";
    loadAttendanceRecords();
  } else {
    alert("Harap masukkan nama guru");
  }
}

function loadAttendanceRecords() {
  const table = document.getElementById("attendance-table");
  const attendanceRecords =
    JSON.parse(localStorage.getItem("attendanceRecords")) || [];

  table.innerHTML = `
        <tr>
            <th>No.</th>
            <th>Nama Guru</th>
            <th>Tanggal</th>
            <th>Waktu</th>
        </tr>
    `;

  attendanceRecords.forEach((record, index) => {
    const row = table.insertRow();
    row.insertCell(0).textContent = index + 1;
    row.insertCell(1).textContent = record.name;
    row.insertCell(2).textContent = record.date;
    row.insertCell(3).textContent = record.time;
  });
}
