/**
 *
 * 1. Complete the `getErrorMessage` function to generate a unique validation message for each of the inputs
 * 2. Refactor rest of the codebase for calculator to work
 * 3. Only validata input on blur if a value was entered.
 */

 function getErrorMessage(input) {
    return `Invalid entry for ${input.dataset.label}. Must be a number between ${input.min} and ${input.max}. \r\n`;
  }
  
  function calculatBill(form) {
    const elements = Array.from(form.elements);
    const inputs = elements.filter(function (element) {
      return element.type !== "submit";
    });
  
    let error = "";
  
    for (const input of inputs) {
      
      input.addEventListener('blur', function(event) {
        console.log(input.length);
        if (input.length > 0) {
          
          if (inputValidation(input.value,input.min,input.max,parseInt(input.dataset.decimial,10))) {
            event.target.style.background = "#90EE90";
          
          } else {
            event.target.style.background = "#FF6347";
          }
        }
        
      });
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
  
      console.log(totalBill);
    } else {
      alert(error);
    }
  }
   
    //     output.innerText = "";
    //     alert(error);
    //     form.reset();
    //     taxInput.style.background = "white";
    //     priceInput.style.background = "white";
    //     tipInput.style.background = "white";

  
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
  
  // function InputBackground(input) {
  //   if (
  //     inputValidation(taxInput.value, taxInput.min, taxInput.max, 2) === false
  //   ) {
  //     document.getElementById("taxInput").style.background = "#FF6347";
  //   } else {
  //     document.getElementById("taxInput").style.background = "#90EE90";
  //   }
  // }
  
  // function priceInputBackground() {
  //   if (
  //     inputValidation(priceInput.value, priceInput.min, priceInput.max, 2) ===
  //     false
  //   ) {
  //     document.getElementById("priceInput").style.background = "#FF6347";
  //   } else {
  //     document.getElementById("priceInput").style.background = "#90EE90";
  //   }
  // }
  
  // function tipInputBackground() {
  //   if (
  //     inputValidation(tipInput.value, tipInput.min, tipInput.max, 1) === false
  //   ) {
  //     document.getElementById("tipInput").style.background = "#FF6347";
  //   } else {
  //     document.getElementById("tipInput").style.background = "#90EE90";
  //   }
  // }