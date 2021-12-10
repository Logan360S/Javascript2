/**
 *
 * 1. Complete the `getErrorMessage` function to generate a unique validation message for each of the inputs
 * 2. Refactor rest of the codebase for calculator to work
 * 3. Only validata input on blur if a value was entered.
 */

 function getErrorMessage(input) {
    return `Invalid entry for ${input.dataset.label}. Must be a number between ${input.min} and ${input.max}. \r\n`;
  }
  
const elements = Array.from(document.getElementById("billForm").elements);
const inputs = elements.filter(function (element) {
    return element.type !== "submit";
});

const submit = document.getElementById("submitButton");
submit.addEventListener('click', calculateBill);

for (const input of inputs) {
  input.addEventListener('blur', function(event) {
    if (Boolean(input.value)) {

      const isValid = inputValidation(
        input.value,
        input.min,
        input.max,
        parseInt(input.dataset.decimal, 10));
      if (isValid) {
        event.target.style.background = "#90EE90";
      } else {
        event.target.style.background = "#FF6347";
      }
    }
    
  });
};

  
function calculateBill(event) {
   
  const form = event.target.parentElement;
    let error = "";
    
    for (const input of inputs) {
      if (
        !inputValidation(
          input.value,
          input.min,
          input.max,
          parseInt(input.dataset.decimal, 10)
        )
      ) {
        error += getErrorMessage(input);
      }
    }
  
    if (error.length < 1) {
      const price = form.elements["priceInput"];
      const tax = form.elements["taxInput"];
      const tip = form.elements["tipInput"];
  
      const bill = parseFloat(price.value);
      const taxBill = bill * (parseFloat(tax.value) / 100);
      const tipBill = (bill + taxBill) * (parseFloat(tip.value) / 100);
  
      const totalBill = bill + taxBill + tipBill;
  
      output.innerText = "Price: $" + bill.toFixed(2) + "\r\n" + "Tax: $" + taxBill.toFixed(2)  + "\r\n" + "Tip: $" + tipBill.toFixed(2) + "\r\n" + "Total: $" + totalBill.toFixed(2);
      
    } else {
      output.innerText = "";
      alert(error);
      form.reset();
      taxInput.style.background = "white";
      priceInput.style.background = "white";
      tipInput.style.background = "white";
    }
} 

  
  function inputValidation(Input, min, max, decimal) {
    let Input1 = parseFloat(Input);
  
    
      if (
        !Number.isNaN(Input1) &&
        Input1 >= min &&
        Input1 <= max &&
        inputDecimal(Input1, decimal)
      ) {
        return true;
      } else {
        return false;
      }
    
  }
  
  function inputDecimal(Input1, decimal) {
    let numPattern = /^\d+(\.\d{1,2})?$/;
    let intPattern = /^\d+(\.\d{0})?$/;
  
    if (decimal === 2) {
      return numPattern.test(Input1);
    } else if (decimal === 1) {
      return intPattern.test(Input1);
    }
  }
  