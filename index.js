var inputArray = [];
var todayDate = new Date().toLocaleDateString("en-CA");
var soonDate = addDays(new Date(), 3).toLocaleDateString("en-CA");

function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

function ClearForm() {
  const FormToReset = document.getElementById("submitform");
  FormToReset.reset();
}

function StoreFood() {
  const DisplayArray =
    JSON.parse(window.localStorage.getItem("GlobalArray")) || [];

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";

  let input1 = document.getElementById("fname");
  let input2 = document.getElementById("expdate");
  let input3 = document.getElementById("ftype");
  let input4 = document.getElementById("numb");
  let input5 = document.getElementById("owns");
  let input6 = document.getElementById("costpu");

  let value1 = input1.value;
  let value2 = input2.value;
  let value3 = input3.value;
  let value4 = input4.value;
  let value5 = input5.value;
  let value6 = input6.value;

  if (
    !input1.value ||
    !input2.value ||
    !input3.value ||
    !input4.value ||
    !input5.value ||
    !input6.value
  ) {
    alert("Please ensure all fields are added, then try again");
  } else {
    let numbinteger = Number(document.getElementById("numb").value);
    if (isNaN(numbinteger)) {
      alert("you must enter a number in the number field");
    } else {
      let costinteger = Number(document.getElementById("costpu").value);
      if (isNaN(costinteger)) {
        alert("you must enter a number in the cost field");
      } else {
        let namestring = String(document.getElementById("fname").value);
        if (!isNaN(namestring) && namestring.length != 0)
          alert("you must enter a name in the name field");
        else {
          let ownerstring = String(document.getElementById("owns").value);
          if (!isNaN(ownerstring) && ownerstring.length != 0)
            alert("you must enter something in the owner field");
          else {
            let object = {};
            let firstKey = "foodname";
            let firstKeyValue = value1;
            let secondKey = "expdate";
            let secondKeyValue = value2;
            let thirdKey = "ftype";
            let thirdKeyValue = value3;
            let fourthKey = "numb";
            let fourthKeyValue = value4;
            let fifthKey = "owns";
            let fifthKeyValue = value5;
            let sixthKey = "costpu";
            let sixthKeyValue = value6;

            object[firstKey] = firstKeyValue;
            object[secondKey] = secondKeyValue;
            object[thirdKey] = thirdKeyValue;
            object[fourthKey] = fourthKeyValue;
            object[fifthKey] = fifthKeyValue;
            object[sixthKey] = sixthKeyValue;

            let inputArray = DisplayArray;
            inputArray.push(object);

            localStorage.setItem("GlobalArray", JSON.stringify(inputArray));

            const FormToReset = document.getElementById("submitform");
            FormToReset.reset();

            let inputPull = JSON.parse(
              window.localStorage.getItem("GlobalArray")
            );
            RebuildTable(inputPull);
            alert("Item Added!");
          }
        }
      }
    }
  }
}

function loadPantryData() {
  const DisplayArray =
    JSON.parse(window.localStorage.getItem("GlobalArray")) || [];
  if (document.getElementById("database") != null) {
    table = document.getElementById("database");
    for (let i = 0; i < DisplayArray.length; i++) {
      var table = document.getElementById("database");
      var row = document.createElement("tr");
      for (let j = 0; j < Object.keys(DisplayArray[i]).length; j++) {
        var cell = document.createElement("td");
        if (Object.keys(DisplayArray[i])[j] === "foodname") {
          cell.innerHTML =
            "<button id=deletebutton class=deletebutton value =" +
            [i] +
            " " +
            "onclick='removeitem(this.value)'> X </button>" +
            "     " +
            DisplayArray[i].foodname;
          row.appendChild(cell);
        } else {
          cell.innerHTML = Object.values(DisplayArray[i])[j];
          if (DisplayArray[i].expdate < todayDate) {
            cell.style = "color:red";
          }
          row.appendChild(cell);
          table.appendChild(row);
        }
      }
    }
  }
}

function removeitem(row) {
  const SmallerArray =
    JSON.parse(window.localStorage.getItem("GlobalArray")) || [];
  ClearPantry();
  SmallerArray.splice(row, 1);
  localStorage.setItem("GlobalArray", JSON.stringify(SmallerArray));
}

function loadExpiryData1() {
  let DisplayArray =
    JSON.parse(window.localStorage.getItem("GlobalArray")) || [];
  if (document.getElementById("almostexpiredfood") != null) {
    table = document.getElementById("almostexpiredfood");
    for (let i = 0; i < DisplayArray.length; i++) {
      var table = document.getElementById("almostexpiredfood");
      var row = document.createElement("tr");
      if (
        DisplayArray[i].expdate > todayDate &&
        DisplayArray[i].expdate < soonDate
      ) {
        for (let j = 0; j < Object.keys(DisplayArray[i]).length; j++) {
          var cell = document.createElement("td");
          cell.innerHTML = Object.values(DisplayArray[i])[j];
          {
            row.appendChild(cell);
            table.appendChild(row);
          }
        }
      }
    }
  }
}

function loadExpiryData2() {
  let DisplayArray =
    JSON.parse(window.localStorage.getItem("GlobalArray")) || [];
  if (document.getElementById("expiredfood") != null) {
    table = document.getElementById("expiredfood");
    for (let i = 0; i < DisplayArray.length; i++) {
      var table = document.getElementById("expiredfood");
      var row = document.createElement("tr");
      if (DisplayArray[i].expdate < todayDate) {
        for (let j = 0; j < Object.keys(DisplayArray[i]).length; j++) {
          var cell = document.createElement("td");
          cell.innerHTML = Object.values(DisplayArray[i])[j];
          row.appendChild(cell);
          table.appendChild(row);
        }
      }
    }
  }
}

function filterByFType(filtervalue) {
  let DisplayArray =
    JSON.parse(window.localStorage.getItem("GlobalArray")) || [];
  if (filtervalue === "Nil") {
    let table = document.getElementById("database");
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
    loadPantryData();
  } else {
    const filteredpantryitems = DisplayArray.filter(
      (pantryitem) => pantryitem.ftype === filtervalue
    );
    RebuildTable(filteredpantryitems);
  }
}

function sortbydate(sortvalue) {
  if (document.getElementById("databasemain") != null) {
    let DisplayArray =
      JSON.parse(window.localStorage.getItem("GlobalArray")) || [];
    let table = document.getElementById("database");
    if (sortvalue === "Nil") {
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }
      loadPantryData();
    } else {
      if (sortvalue === "Newest_To_Oldest") {
        let filteredpantryitems = DisplayArray.sort(function (a, b) {
          return new Date(b.expdate) - new Date(a.expdate);
        });

        RebuildTable(filteredpantryitems);
      }
      if (sortvalue === "Oldest_To_Newest") {
        let filteredpantryitems = DisplayArray.sort(function (a, b) {
          return new Date(a.expdate) - new Date(b.expdate);
        });
        RebuildTable(filteredpantryitems);
      }
    }
  }
}

function sortbydateload() {
  document.getElementById("datefilter").value = "Oldest_To_Newest";
  sortbydate("Oldest_To_Newest");
}

function sortbyname(sortvalue) {
  let DisplayArray =
    JSON.parse(window.localStorage.getItem("GlobalArray")) || [];
  if (sortvalue === "Nil") {
    let table = document.getElementById("database");
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
    loadPantryData();
  } else {
    if (sortvalue === "A_To_Z") {
      let filteredpantryitems = DisplayArray.sort(function (a, b) {
        if (a.foodname < b.foodname) {
          return -1;
        }
        if (a.foodname > b.foodname) {
          return 1;
        } else return 0;
      });
      RebuildTable(filteredpantryitems);
    }
    if (sortvalue === "Z_To_A") {
      let filteredpantryitems = DisplayArray.sort(function (a, b) {
        if (a.foodname > b.foodname) {
          return -1;
        }
        if (a.foodname < b.foodname) {
          return 1;
        } else return 0;
      });
      RebuildTable(filteredpantryitems);
    }
  }
}

function setGradient() {
  if (document.getElementById("pie") != null) {
    var graph = document.getElementById("pie");
    var expiredTable = document.getElementById("expiredfood");
    var closeExpiredTable = document.getElementById("almostexpiredfood");
    var pantryTable = document.getElementById("database");

    var totalItems = pantryTable.rows.length - 1;
    var expiredPercent = ((expiredTable.rows.length - 1) / totalItems) * 100;
    var closeExpiredPercent =
      ((closeExpiredTable.rows.length - 1) / totalItems) * 100 + expiredPercent;
    var expiredPercentString = expiredPercent.toString();
    var closeExpiredString = closeExpiredPercent.toString();
    let newGrad =
      "conic-gradient(#7E6B8F 0.00% " +
      expiredPercentString +
      "%, #5CB8FF " +
      expiredPercentString +
      "% " +
      closeExpiredString +
      "%, #8FF599 " +
      closeExpiredString +
      "% 100.00% )";
    console.log(newGrad);

    graph.style.background = newGrad;
  }
}

function ClearPantry() {
  const ClearArray = [];
  localStorage.setItem("GlobalArray", JSON.stringify(ClearArray));
  loadPantryData();
  location.reload();
}

function RebuildTable(filtereditems) {
  let table = document.getElementById("database");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  for (let i = 0; i < filtereditems.length; i++) {
    var row = document.createElement("tr");
    for (let j = 0; j < Object.keys(filtereditems[i]).length; j++) {
      var cell = document.createElement("td");
      if (Object.keys(filtereditems[i])[j] === "foodname") {
        cell.innerHTML =
          "<button id=deletebutton class=deletebutton value =" +
          [i] +
          " " +
          "onclick='removeitem(this.value)'> X </button>" +
          "  " +
          filtereditems[i].foodname;
        row.appendChild(cell);
      } else {
        cell.innerHTML = Object.values(filtereditems[i])[j];
        if (filtereditems[i].expdate < todayDate) {
          cell.style = "color:red";
        }
        row.appendChild(cell);
        table.appendChild(row);
      }
    }
  }
}

function CallEdamam() {
  var xhttp = new XMLHttpRequest();
  if (document.getElementById("recipes") != null) {
    xhttp.open(
      "GET",
      "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=05567a42&app_key=b62303535d6536769387714d37717b61&field=label&field=image&field=source&field=url",
      true
    );
    xhttp.send();
    xhttp.onload = () => {
      if (xhttp.readyState === xhttp.DONE) {
        let recipedata = JSON.parse(xhttp.response);
        localStorage.setItem("recipedata", JSON.stringify(recipedata));
      }
    };
  }
}

function ShowRecipes() {
  var xhttp = new XMLHttpRequest();
  let foodvalue = document.getElementById("keyword");
  let keyword = foodvalue.value;
  if (document.getElementById("recipes") != null) {
    xhttp.open(
      "GET",
      "https://api.edamam.com/api/recipes/v2?type=public&q=" +
        keyword +
        "&app_id=05567a42&app_key=b62303535d6536769387714d37717b61&random=true&field=label&field=image&field=source&field=url&field=ingredients&field=totalNutrients",
      true
    );
    xhttp.send();
    xhttp.onload = () => {
      if (xhttp.readyState === xhttp.DONE) {
        let response = JSON.parse(xhttp.response);
        let recipedata = response.hits;
        console.log(recipedata);
        if (recipedata.length != 0) {
          for (let i = 0; i < recipedata.length; i++) {
            let grandparent = document.getElementById("recipes");
            let parentDiv = document.createElement("div");
            let titleDiv = document.createElement("div");
            let imageDiv = document.createElement("div");
            let contentDiv = document.createElement("div");
            let leftrec = document.createElement("div");
            let rightrec = document.createElement("div");
            let sourceDiv = document.createElement("div");
            let ingredientList = document.createElement("div");
            let ingredientadd = document.createElement("div");
            let nutritionAdd = document.createElement("div");
            parentDiv.setAttribute("id", "recipe" + [i]);
            contentDiv.setAttribute("id", "recipe" + [i]);
            leftrec.setAttribute("id", "lefty" + [i]);
            rightrec.setAttribute("id", "righty" + [i]);
            titleDiv.setAttribute("id", "title" + [i]);
            imageDiv.setAttribute("id", "image" + [i]);
            sourceDiv.setAttribute("id", "source" + [i]);
            ingredientList.setAttribute("id", "ingredients" + [i]);
            nutritionAdd.setAttribute("id", "nutrition" + [i]);
            parentDiv.setAttribute("class", "recipecontainer");
            contentDiv.setAttribute("class", "recipediv");
            leftrec.setAttribute("class", "recipeleft");
            rightrec.setAttribute("class", "recipediv");
            titleDiv.setAttribute("class", "recipetitlediv");
            imageDiv.setAttribute("class", "recipediv");
            sourceDiv.setAttribute("class", "recipediv");
            ingredientList.setAttribute("class", "ingredientdiv");
            nutritionAdd.setAttribute("class", "ingredientdiv");
            let recipetitle = recipedata[i].recipe.label;
            let sourcename = recipedata[i].recipe.source;
            let recingredientsarray = recipedata[i].recipe.ingredients;
            let nutrientsarray = [
              recipedata[i].recipe.totalNutrients.ENERC_KCAL,
              recipedata[i].recipe.totalNutrients.CHOCDF,
              recipedata[i].recipe.totalNutrients.FAT,
              recipedata[i].recipe.totalNutrients.PROCNT,
              recipedata[i].recipe.totalNutrients.SUGAR,
              recipedata[i].recipe.totalNutrients.VITB12,
              recipedata[i].recipe.totalNutrients.FE,
            ];
            console.log(nutrientsarray);
            ingredientadd.innerHTML = "<u>Ingredient List<u>";
            ingredientList.appendChild(ingredientadd);
            for (let j = 0; j < recingredientsarray.length; j++) {
              let ingredientadd = document.createElement("div");
              ingredientadd.innerHTML = recingredientsarray[j].food;
              ingredientList.appendChild(ingredientadd);
            }
            for (let k = 0; k < nutrientsarray.length; k++) {
              let nutrientadd = document.createElement("div");
              nutrientadd.innerHTML =
                nutrientsarray[k].label +
                ":      " +
                nutrientsarray[k].quantity.toFixed(2) +
                "   " +
                nutrientsarray[k].unit;
              nutritionAdd.appendChild(nutrientadd);
            }
            let recipeimage = document.createElement("img");
            sourceDiv.innerHTML = "Source: " + sourcename;
            recipeimage.src = recipedata[i].recipe.image;
            titleDiv.innerHTML =
              "<a href=" +
              recipedata[i].recipe.url +
              " style=color:#CCFFCC;>" +
              recipetitle +
              "</a>";
            grandparent.appendChild(parentDiv);
            parentDiv.appendChild(titleDiv);
            parentDiv.appendChild(contentDiv);
            contentDiv.appendChild(leftrec);
            contentDiv.appendChild(rightrec);
            leftrec.appendChild(imageDiv);
            leftrec.appendChild(sourceDiv);
            rightrec.appendChild(ingredientList);
            rightrec.appendChild(nutritionAdd);
            document.getElementById("image" + [i]).appendChild(recipeimage);
          }
        }
      }
    };
  }
}

//https://example.com/path/to/page?name=ferret&color=purple
// API ID: 05567a42

window.onload = () => {
  loadPantryData();
  loadExpiryData1();
  loadExpiryData2();
  sortbydateload("Oldest_To_Newest");
  setGradient();
  CallEdamam();
};
