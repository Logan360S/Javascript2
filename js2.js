function calculatBill (form) {
    const taxInput = form.elements["taxInput"];
    const priceInput = form.elements["priceInput"];
    const tipInput = form.elements["tipInput"];
    const output = document.getElementById("output");
    console.log(form.elements);

    if (inputValidation(taxInput.value,taxInput.min, taxInput.max,2) === true && inputValidation(priceInput.value,priceInput.min, priceInput.max,2) === true && inputValidation(tipInput.value,tipInput.min, tipInput.max,1) === true) {
        let bill = parseFloat(priceInput.value);
        let taxBill = bill * (parseFloat(taxInput.value)/100);
        let tipBill = (bill + taxBill) * (tipInput.value/100);
        let totalBill = bill + taxBill + tipBill;
        
        output.innerText = "Price: $" + bill.toFixed(2) + "\r\n" + "Tax: $" + taxBill.toFixed(2)  + "\r\n" + "Tip: $" + tipBill.toFixed(2) + "\r\n" + "Total: $" + totalBill.toFixed(2);
    } else {
        let error = "";
        

        if (inputValidation(taxInput.value,taxInput.min, taxInput.max,2) === false) {
            error = error + "Invalid entry for tax percent. Must be a number between 0 and 100. \r\n";
        }
        
        if (inputValidation(priceInput.value,priceInput.min, priceInput.max,2) === false) {
            error = error + "Invalid entry for price. Must be a number between 0 and 1000. \r\n"
        }

        if (inputValidation(tipInput.value,tipInput.min, tipInput.max,1) === false) {
            error = error + "Invalid entry for tip percent. Must be a number between 0 and 200. \r\n"
        }
        output.innerText = "";
        alert(error);
        form.reset();
        taxInput.style.background="white";
        priceInput.style.background="white";
        tipInput.style.background="white";
    };


};

function inputValidation(Input,min,max,decimal) {
    let Input1 = parseFloat(Input);

    if (!Number.isNaN(Input1) && Input1 >= min && Input1 <= max && inputDecimal(Input1,decimal)) {
        return true;
    } else {
        return false;
    };
};

function inputDecimal (Input1,decimal) {
    let numPattern = /^\d+(\.\d{1,2})?$/;
    let intPattern = /^\d+(\.\d{0})?$/;
    
    if (decimal===2) {
        return numPattern.test(Input1)

    } else if (decimal===1) {
        return intPattern.test(Input1);
    
    };
};

function taxInputBackground() {
    if (inputValidation(taxInput.value,taxInput.min, taxInput.max,2) === false) {
        document.getElementById("taxInput").style.background = "#FF6347";
    } else {
        document.getElementById("taxInput").style.background = "#90EE90";
    };
};

function priceInputBackground() {
    if (inputValidation(priceInput.value,priceInput.min, priceInput.max,2) === false) {
        document.getElementById("priceInput").style.background = "#FF6347";
    } else {
        document.getElementById("priceInput").style.background = "#90EE90";
    };
};

function tipInputBackground() {
    if (inputValidation(tipInput.value,tipInput.min, tipInput.max,1) === false) {
        document.getElementById("tipInput").style.background = "#FF6347";
    } else {
        document.getElementById("tipInput").style.background = "#90EE90";
    };
};