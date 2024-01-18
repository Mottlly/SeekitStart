var inputArray = [];
var todayDate = new Date().toLocaleDateString("en-CA");
var soonDate = addDays(new Date(), 3).toLocaleDateString("en-CA");

console.log(todayDate);

function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

console.log(soonDate);

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
            console.log(object);

            let inputArray = DisplayArray;
            inputArray.push(object);

            localStorage.setItem("GlobalArray", JSON.stringify(inputArray));

            console.log(inputArray);

            //clearformfunction next
            const FormToReset = document.getElementById("submitform");
            FormToReset.reset();

            let inputPull = JSON.parse(
              window.localStorage.getItem("GlobalArray")
            );
            table = document.getElementById("database");
            for (let i = inputPull.length - 1; i < inputPull.length; i++) {
              var table = document.getElementById("database");
              var row = document.createElement("tr");
              var cell1 = document.createElement("td");
              var cell2 = document.createElement("td");
              var cell3 = document.createElement("td");
              var cell4 = document.createElement("td");
              var cell5 = document.createElement("td");
              var cell6 = document.createElement("td");
              let rowid = [i];
              cell1.innerHTML =
                "<button id=deletebutton class=deletebutton value =" +
                [i] +
                " " +
                "onclick='removeitem(this.value)'> X </button>" +
                DisplayArray[i].foodname;
              cell2.innerHTML = inputPull[i].expdate;
              cell3.innerHTML = inputPull[i].ftype;
              cell4.innerHTML = inputPull[i].numb;
              cell5.innerHTML = inputPull[i].owns;
              cell6.innerHTML = inputPull[i].costpu;
              row.appendChild(cell1);
              row.appendChild(cell2);
              row.appendChild(cell3);
              row.appendChild(cell4);
              row.appendChild(cell5);
              row.appendChild(cell6);
              table.appendChild(row);

              alert("Item Added!");
            }
          }
        }
      }
    }
  }
}

function loadPantryData() {
  const DisplayArray =
    JSON.parse(window.localStorage.getItem("GlobalArray")) || [];
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
          DisplayArray[i].foodname;
        row.appendChild(cell);
      } else {
        cell.innerHTML = Object.values(DisplayArray[i])[j];
        row.appendChild(cell);
        table.appendChild(row);
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

function loadExpiryData2() {
  let DisplayArray =
    JSON.parse(window.localStorage.getItem("GlobalArray")) || [];
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
    let table = document.getElementById("database");

    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
    for (let i = 0; i < filteredpantryitems.length; i++) {
      var row = document.createElement("tr");
      var cell1 = document.createElement("td");
      var cell2 = document.createElement("td");
      var cell3 = document.createElement("td");
      var cell4 = document.createElement("td");
      var cell5 = document.createElement("td");
      var cell6 = document.createElement("td");
      cell1.innerHTML = filteredpantryitems[i].foodname;
      cell2.innerHTML = filteredpantryitems[i].expdate;
      cell3.innerHTML = filteredpantryitems[i].ftype;
      cell4.innerHTML = filteredpantryitems[i].numb;
      cell5.innerHTML = filteredpantryitems[i].owns;
      cell6.innerHTML = filteredpantryitems[i].costpu;
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      row.appendChild(cell5);
      row.appendChild(cell6);
      table.appendChild(row);
    }
  }
}

function sortbydate(sortvalue) {
  let DisplayArray =
    JSON.parse(window.localStorage.getItem("GlobalArray")) || [];
  if (sortvalue === "Nil") {
    let table = document.getElementById("database");
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
    loadPantryData();
  } else {
    if (sortvalue === "Newest_To_Oldest") {
      let filteredpantryitems = DisplayArray.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.expdate) - new Date(a.expdate);
      });

      let table = document.getElementById("database");

      while (table.rows.length > 1) {
        table.deleteRow(1);
      }
      for (let i = 0; i < filteredpantryitems.length; i++) {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var cell4 = document.createElement("td");
        var cell5 = document.createElement("td");
        var cell6 = document.createElement("td");
        cell1.innerHTML = filteredpantryitems[i].foodname;
        cell2.innerHTML = filteredpantryitems[i].expdate;
        cell3.innerHTML = filteredpantryitems[i].ftype;
        cell4.innerHTML = filteredpantryitems[i].numb;
        cell5.innerHTML = filteredpantryitems[i].owns;
        cell6.innerHTML = filteredpantryitems[i].costpu;
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        table.appendChild(row);
      }
    }
    if (sortvalue === "Oldest_To_Newest") {
      let filteredpantryitems = DisplayArray.sort(function (a, b) {
        return new Date(a.expdate) - new Date(b.expdate);
      });

      let table = document.getElementById("database");

      while (table.rows.length > 1) {
        table.deleteRow(1);
      }
      for (let i = 0; i < filteredpantryitems.length; i++) {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var cell4 = document.createElement("td");
        var cell5 = document.createElement("td");
        var cell6 = document.createElement("td");
        cell1.innerHTML = filteredpantryitems[i].foodname;
        cell2.innerHTML = filteredpantryitems[i].expdate;
        cell3.innerHTML = filteredpantryitems[i].ftype;
        cell4.innerHTML = filteredpantryitems[i].numb;
        cell5.innerHTML = filteredpantryitems[i].owns;
        cell6.innerHTML = filteredpantryitems[i].costpu;
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        table.appendChild(row);
      }
    }
  }
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

      let table = document.getElementById("database");
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }
      for (let i = 0; i < filteredpantryitems.length; i++) {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var cell4 = document.createElement("td");
        var cell5 = document.createElement("td");
        var cell6 = document.createElement("td");
        cell1.innerHTML = filteredpantryitems[i].foodname;
        cell2.innerHTML = filteredpantryitems[i].expdate;
        cell3.innerHTML = filteredpantryitems[i].ftype;
        cell4.innerHTML = filteredpantryitems[i].numb;
        cell5.innerHTML = filteredpantryitems[i].owns;
        cell6.innerHTML = filteredpantryitems[i].costpu;
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        table.appendChild(row);
      }
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

      let table = document.getElementById("database");
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }
      for (let i = 0; i < filteredpantryitems.length; i++) {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var cell4 = document.createElement("td");
        var cell5 = document.createElement("td");
        var cell6 = document.createElement("td");
        cell1.innerHTML = filteredpantryitems[i].foodname;
        cell2.innerHTML = filteredpantryitems[i].expdate;
        cell3.innerHTML = filteredpantryitems[i].ftype;
        cell4.innerHTML = filteredpantryitems[i].numb;
        cell5.innerHTML = filteredpantryitems[i].owns;
        cell6.innerHTML = filteredpantryitems[i].costpu;
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        table.appendChild(row);
      }
    }
  }
}

function setGradient() {
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
    "conic-gradient(#1F2833 0.00% " +
    expiredPercentString +
    "%, #45A29E " +
    expiredPercentString +
    "% " +
    closeExpiredString +
    "%, #5CDB95 " +
    closeExpiredString +
    "% 100.00% )";
  console.log(newGrad);

  graph.style.background = newGrad;
}

function ClearPantry() {
  const ClearArray = [];
  localStorage.setItem("GlobalArray", JSON.stringify(ClearArray));
  loadPantryData();
  location.reload();
}

window.onload = () => {
  loadPantryData();
  loadExpiryData1();
  loadExpiryData2();
  setGradient();
};
