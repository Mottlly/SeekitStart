//things I need to make be able do
// 1. Add food item to pantry !!Check!!
// 2. have pantry update in dashboard
// 3. have bad items display on dashboard
// 4. have close to expiry items display on dashboard in order of ripeness
// 5. have graphic update on dashboard

function PublishTab () {
    const fname = document.getElementById('fname').value;
    const expdate = document.getElementById('expdate').value;
    const ftype = document.getElementById('ftype').value;
    const numb = document.getElementById('numb').value;
    const owns = document.getElementById('owns').value;
    const costpu = document.getElementById('costpu').value;
    const FormToReset = document.getElementById ("submitform");

        const tableElement = document.getElementById('database');
        const trElement = document.createElement('tr');
        const tbodyElement = document.createElement('tbody');
        const fnameEle = document.createElement('td');
        const expdateEle = document.createElement('td');
        const ftypeEle = document.createElement('td');
        const numbEle = document.createElement('td');
        const ownsEle = document.createElement('td');
        const costpuEle = document.createElement('td');
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
                    FormToReset.reset ();

}

function ClearForm () {
    const FormToReset = document.getElementById ("submitform");
        FormToReset.reset ();

}