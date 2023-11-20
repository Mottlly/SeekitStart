//things I need to make be able do
// 1. Add food item to pantry !!Check!!
// 2. have pantry update in dashboard
// 3. have bad items display on dashboard
// 4. have close to expiry items display on dashboard in order of ripeness
// 5. have graphic update on dashboard

//This is now not being used, as table is populating from the array, not the form. Will keep for later tho.
function PublishTab () {
    let fname = document.getElementById('fname').value;
    let expdate = document.getElementById('expdate').value;
    let ftype = document.getElementById('ftype').value;
    let numb = document.getElementById('numb').value;
    let owns = document.getElementById('owns').value;
    let costpu = document.getElementById('costpu').value;
    let FormToReset = document.getElementById ("submitform");

        let tableElement = document.getElementById('database');
        let trElement = document.createElement('tr');
        let tbodyElement = document.createElement('tbody');
        let fnameEle = document.createElement('td');
        let expdateEle = document.createElement('td');
        let ftypeEle = document.createElement('td');
        let numbEle = document.createElement('td');
        let ownsEle = document.createElement('td');
        let costpuEle = document.createElement('td');
            fnameEle.innerHTML = fname;
            expdateEle.innerHTML = expdate;
            ftypeEle.innerHTML = ftype;
            numbEle.innerHTML = numb;
            ownsEle.innerHTML = owns;
            costpuEle.innerHTML = costpu;
                trElement.appendChild(fnameEle);
                trElement.appendChild(expdateEle);
                trElement.appendChild(ftypeEle);
                trElement.appendChild(numbEle);
                trElement.appendChild(ownsEle);
                trElement.appendChild(costpuEle);
                    tbodyElement.appendChild(trElement);
                    tableElement.appendChild(tbodyElement);

                    alert ("Item Added!");
}

function ClearForm () {
    const FormToReset = document.getElementById ("submitform");
        FormToReset.reset ();

}

function StoreFood () {

    let inputArray = [];

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

    inputArray.push([value1, value2, value3, value4, value5, value6]);

    localStorage.setItem("inputArray", JSON.stringify(inputArray));

    console.log(inputArray);

}

function PopTab () {
    //work in progress, problem is that it keeps adding the WHOLE array, which results in duplicates. Need to make it only populate the most recent submit, or omit existing rows.

    const inputArray = JSON.parse(window.localStorage.getItem("inputArray"));
    table = document.getElementById('database');
    //sets the i(X)variable, or else it will only be 1 cell with the whole array
    for(let i = inputArray.length-1; i < inputArray.length; i++)
    {
        // creates a new row with the j(Y) variable
        let newRow = table.insertRow(table.length);
        for(var j = 0; j < inputArray[i].length; j++)
        {
            // creates the new cells
            let cell = newRow.insertCell(j);
            
            // adds array values to the cell
            cell.innerHTML = inputArray[i][j];
        }
    }
    
    alert ("Item Added!");
}

function loadPantryData () {
    let table = JSON.parse(window.localStorage.getItem("inputArray"));
    
    for(let i = inputArray.length-1; i < inputArray.length; i++)
    {
        // creates a new row with the j(Y) variable
        let newRow = table.insertRow(table.length);
        for(var j = 0; j < inputArray[i].length; j++)
        {
            // creates the new cells
            let cell = newRow.insertCell(j);
            
            // adds array values to the cell
            cell.innerHTML = inputArray[i][j];
        }
    }

}

function loadPieData () {
    let data = JSON.parse(window.localStorage.getItem("inputArray"));
}
