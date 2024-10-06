

function showResult(patientUserName) {

  if (patientUserName.length == 0) {
    document.getElementById("search-result").innerHTML = "";
    document.getElementById("search-result").style.border = "0px";
    return;
  }
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {
    output = "";
    if (this.status == 200) {
      //console.log(this.responseText);
      const patients = JSON.parse(this.responseText);
      console.log(patients.patients);
      for (let patient of patients.patients) {
        output += `<ul> <li> <a href="/patient/view/${patient.userName}">  Patient Name : ${patient.firstName} \n Patient Username : ${patient.userName}  </a> </li></ul>`;
      }

      document.getElementById('search-result').innerHTML = output;
    }
  }
  xmlhttp.open("GET", "/patient/find/"+ patientUserName, true);
  xmlhttp.send();
}
