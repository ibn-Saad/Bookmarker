var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var bookmarkList = [];

if (localStorage.getItem("bookmarkList") != null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  displayBookmarks(bookmarkList);
}

function addBookmark() {
  if (validateSiteName() === true && validateSiteUrl() === true) {
    var bookmark = {
      name: siteName.value,
      url: siteUrl.value,
    };

    bookmarkList.push(bookmark);
    displayBookmarks(bookmarkList);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    clearForm();
  } else {
    alert(`Site Name or Url is not valid, Please follow the rules below :
    Site name must contain at least 3 characters
    Site URL must be a valid one that start with https://`);
  }
}

function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
}

function displayBookmarks(list) {
  var bookmarks = "";

  for (var i = 0; i < list.length; i++) {
    bookmarks += `
        <tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td><button class="btn btn-success"> <a  href="${
          list[i].url
        }" target="_blank">
        <i class="fa-solid fa-eye"></i>
        Visit
        </a>
        </button></td>
        <td><button class="btn btn-danger" onclick="deleteBookmark(${i})">
        <i class="fa-solid fa-trash-can"></i>
        Delete
        </button></td>
        </tr>
        `;
  }
  document.getElementById("tableBody").innerHTML = bookmarks;
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  displayBookmarks(bookmarkList);
}

function validateSiteName() {
  var nameRegex = /^\w{3,}(\s+\w+)*$/;
  if (nameRegex.test(siteName.value)) {
    return true;
  } else {
    return false;
  }
}

function validateSiteUrl() {
  var urlRegex =
    /(((ftp|http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (urlRegex.test(siteUrl.value)) {
    return true;
  } else {
    return false;
  }
}
