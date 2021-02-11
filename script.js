/* deceleration of variables */
let studentsArray = [];
let studentElement, name, code, mail, number;
let uname, ucode, umail, unumber;



/* onFormSubmit function link to the html page */
function onFormSubmit() {
  name = document.getElementById('name').value;
  code = document.getElementById('code').value;
  mail = document.getElementById('mail').value;
  number = document.getElementById('number').value;
  studentElement = {
    name: name,
    code: code,
    mail: mail,
    number: number
  };
  /*Get and set the value in Local storage */
  if (onValidate()) {
    studentsArray.push(studentElement);
    setAndGetItem("insert");
  }

}




/* check if html loaded completely */
var readyStateCheckInterval = setInterval(function () {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);
    setAndGetItem();
  }
}, 10); //checks after 10 ms


/* Getters and Setters for local storage */
function setAndGetItem(value) {
  if (!value) {

    let arr = JSON.parse(localStorage.getItem("User"));
    if (arr && arr.length) {
      studentsArray = arr;
      insertRecord();
    }
    else {

      if (studentsArray && studentsArray.length)
        localStorage.setItem('User', JSON.stringify(studentsArray));
    }
  }
  else {
    localStorage.removeItem('User');
    if (studentsArray && studentsArray.length) {
      localStorage.setItem('User', JSON.stringify(studentsArray));
      insertRecord();
      resetForm();
    }
    else {
      document.getElementById("employeeList").getElementsByTagName('tbody').innerHTML = "";
      insertRecord();

    }
  }
}

/* Insert the data from the form */
function insertRecord() {
  let table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
  table.innerHTML = "";
  for (i = 0; i < studentsArray.length; i++) {
    let newRow = table.insertRow(i);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = studentsArray[i].name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = studentsArray[i].code;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = studentsArray[i].mail;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = studentsArray[i].number;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a id=${i} onclick = "editRow(this.id)">Edit</a> 
                     <a id=${i} onclick ="deleteRow(this.id)">Delete</a>`;

  }
}

/* Reset the form */
function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("code").value = "";
  document.getElementById("mail").value = "";
  document.getElementById("number").value = "";
  selectedRow = null;
}

/* Edit the Row storage() */
function editRow(rowId) {

  document.getElementById("name").value = studentsArray[rowId].name;
  document.getElementById("code").value = studentsArray[rowId].code;
  document.getElementById("mail").value = studentsArray[rowId].mail;
  document.getElementById("number").value = studentsArray[rowId].number;
  let x = document.getElementById("update");
  x.style.display = "inline";
  let y = document.getElementById("submit");
  y.style.display = "none";
  document.getElementById("update").value = rowId;
}
/* update the row */
function updateRow() {
  rowId = document.getElementById("update").value;
  uname = document.getElementById("name").value;
  ucode = document.getElementById("code").value;
  umail = document.getElementById("mail").value;
  unumber = document.getElementById("number").value;
  let x = document.getElementById("update");
  x.style.display = "none";
  let y = document.getElementById("submit");
  y.style.display = "inline";

  studentsArray.splice(rowId, 1, { name: uname, code: ucode, mail: umail, number: unumber });
  setAndGetItem("update");
}


/* Delete the row */
function deleteRow(rowId) {
  if (confirm("Are you sure you want to delete the row")) {
    studentsArray.splice(rowId, 1);
    setAndGetItem("delete");
  }
}

// Provide the validation to the user name is it empty or not
function onValidate() {
  let username = document.getElementById("name").value;
  let usercode = document.getElementById("code").value;
  let usermail = document.getElementById("mail").value;
  let usernumber = document.getElementById("number").value;
  if (username.trim() == "") {
    document.getElementById("username").innerHTML = "**Please Enter the Username";
    return false;
  }
  if ((username.length <= 2) || (username.length > 20)) {
    document.getElementById("username").innerHTML = "**Please Enter the between 2 characters to 20 characters in Username";
    return false;
  }
  if (!isNaN(username)) {
    document.getElementById("username").innerHTML = "**Please Enter Only character";
    return false;
  }
  document.getElementById("username").style.display = "none";


  if (usercode.trim() == "") {
    document.getElementById("pass").innerHTML = "**Please Enter the Usercode";
    return false;
  }
  if ((usercode.length <= 2) || (usercode.length > 10)) {
    document.getElementById("pass").innerHTML = "**Please Enter the code Between 2 to 9 character & number";
    return false;
  }
  document.getElementById("pass").style.display = "none";


  if (usermail.trim() == "") {
    document.getElementById("email").innerHTML = "**Please Enter the Email id";
    return false;
  }
  if (usermail.indexOf('@') <= 0) {
    document.getElementById("email").innerHTML = "**Please check the Position @ ";
    return false;
  }
  if ((usermail.charAt(usermail.length - 4) != ".") && (usermail.charAt(usermail.length - 3) != ".")) {
    document.getElementById("email").innerHTML = "**Please check the Position . ";
    return false;
  }
  document.getElementById("email").style.display = "none";
  if (usernumber.trim() == "") {
    document.getElementById("mobileNumber").innerHTML = "**Please Enter the Mobile Number";
    return false;
  }
  if (usernumber.length != 10) {
    document.getElementById("mobileNumber").innerHTML = "**Please Enter 10 digits Number Only";
    return false;
  }
  document.getElementById("mobileNumber").style.display = "none";

  return true;
}


//Show the data 
function showData() {
  let x = document.getElementById("table");
  x.style.display = "block";
}

//sort the data
function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("employeeList");
  switching = true;
  while (switching) {

    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;

      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

