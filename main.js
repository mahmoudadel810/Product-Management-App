/** @format */

//functions to do : main map of the project

//1- get total price function
//2- create Product
//3- save to the local storage
//4- clear inputs after use
//5- read data , get all data
//6- create num of products user added
//7- delete one or all products
//8- update the product
//9- search for the product
//10- clean data made a validation

//NOTE -   get the elements

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");


let mood = "create"; // create or update the product , use it later in update func
let tmp; // fake one to use in glopal

//TODO - Function get total price

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040"; //red
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02"; //green
  }
}

//TODO - Function create product
let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}


//TODO - On click , CREATE BUTTON EVENT
submit.onclick = function() { 
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value <= 100
  ) {
    if (mood === "create") {
      // the submit bootn create or update
      if (newPro.count > 1) {
        for (
          let i = 0;
          i < newPro.count;
          i++ // number of counts user added
        ) {
          dataPro.push(newPro);
        }
      } else {
        //if the user puts something invalid
        dataPro.push(newPro);
      }
    } else {
      // if the mood is Update
      dataPro[tmp] = newPro; //tmp holds the value of i , later in update() function .
      mood = "create"; //reset the mood after update
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData(); // call this function to clear the data
  }

  //use local storage

  localStorage.setItem("product", JSON.stringify(dataPro)); //local storage just accepts string

  // console.log(dataPro);
  showData(); // call this function to Print all the data in the table
};

//clear all inputs after adding them

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//TODO - get all the data , print the data in table =========================

function showData() {
  getTotal();
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += ` <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick = "updateData(${i})" id="update">update</button></td>
                    <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
                    
                </tr> `;
  }
  document.getElementById("tbody").innerHTML = table; // add the table to tbody

  let btnDelete = document.getElementById("deleteAll");
  //check if there is a data in tbl or not

  //NOTE -  delete all data from tbl
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `  <button onclick = deleteAll()> Delete All Data (${dataPro.length}) </button> `;
  } else {
    btnDelete.innerHTML = ""; // remove delete all data button
  }
}
showData();

//TODO - delete data , delete  data in table ============================================

function deleteData(i) {
  dataPro.splice(i, 1); // delete from array
  localStorage.product = JSON.stringify(dataPro); //update the local storage with deleted
  showData();
}

//TODO -  make a function to delete all the data in the table

function deleteAll() {
  localStorage.clear(); // clear the local storage
  dataPro.splice(0); // delete all the data from array
  showData();  
}

//TODO - update product

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;

  submit.innerHTML = "Update";
  mood = "update";

  tmp = i; // to let i visible all over the code and can use it any way

  scroll({
    top: 0,
    behavior: "smooth", //will get me up to update
  });
}

//TODO - Search  for a product based on title or category

let searchMood = "title"; //the default

function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "search with title of the Product";
  } else {
    searchMood = "category";
    search.placeholder = "search with category of the Product";
  }
  search.focus(); // open search box when click
  search.value = "";
  showData();
}

//TODO - function to search for data either with name or category =====

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    //search with title
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += ` <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick = "updateData(${i})" id="update">update</button></td>
                    <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>`;
      }
    }
  } else {
    //search but with category
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value)) {
        table += ` <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick = "updateData(${i})" id="update">update</button></td>
                    <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
