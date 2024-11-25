var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");

var bookMarList = [];

 
if (localStorage.getItem("sites") != null) {
  bookMarList = JSON.parse(localStorage.getItem("sites"));
  //3ashan 2l-elms tebqa mawgoda 7ata b3d 2l-refreash
  displaySites(bookMarList);
} else {
  bookMarList = [];
}

//!!!!! ADD
function addBookMark() {

  var site = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };
  //lw 2l-input fady
  if (!site.name || !site.url) {
       alert("Please fill out both fields.");
       return;
    }else if(!matched) {
       alert("Sorry, url is not valid.");
       return;
     }

 // lw fy name mtkarar
 if (bookMarList.some(site => site.name === siteNameInput.value)) {
  alert("Sorry, this name already exists.");
  return;
}

  bookMarList.push(site);
  displaySites(bookMarList);
  clearForm();
  localStorage.setItem("sites", JSON.stringify(bookMarList));
}

//!!!!! CLEAR
function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

//!!!!! DISPLAY
function displaySites(list) {
  var cartona = ``;
  for (var i = 0; i < list.length; i++) {
    cartona += `
  <tr>
    <td>${i + 1}</td>
    <td>${list[i].name}</td>
    <td>
     <a href="${list[i].url}" target="_blank">
     <button type="button" class="btn btn-info py-0" style="color:#fff;">Visit</button></a>
    </td>
    <td>
     <button onclick="deleteSite(${i})" type="button" class="btn btn-danger py-0">Delete</button>
    </td> 
  </tr>`;
    document.getElementById("rowData").innerHTML = cartona;
  }
}

//!!!!! DELETE
function deleteSite(index) {
  //------------
  bookMarList.splice(index, 1);
  // 2ro7 25azen 2l-list 2lgededa
  displaySites(bookMarList);
  localStorage.setItem("sites", JSON.stringify(bookMarList));
}

//! VALIDATION
var regex ={ 
  siteUrl : /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-\.]+\.[a-z]{2,}(\:[0-9]{1,5})?(\/.*)?$/,  
}

var matched ;

function validate(elm) {
 
  matched = regex[elm.id].test(elm.value) ;
  if (matched) {
    elm.classList.remove("is-invalid");
    elm.classList.add("is-valid");
    //!alert
    elm.nextElementSibling.classList.add("d-none");
  }else{
    elm.classList.add("is-invalid");
    elm.classList.remove("is-valid");
    //!alert
    elm.nextElementSibling.classList.remove("d-none");
  }
}