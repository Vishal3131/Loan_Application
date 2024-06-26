const nameInput=document.getElementById('name');                    
const emailInput=document.getElementById('email');
const panInput=document.getElementById('pan');
const loanInput=document.getElementById('loan');
const submitBtn= document.getElementById('submitBtn');
const nameMsg= document.getElementById('nameMsg')
const emailMsg=document.getElementById('emailMsg')
const panMsg=document.getElementById('panMsg')
const loanMsg=document.getElementById('loanMsg')

function ValidateName(){                                                   // here All validation on Name
    let name = nameInput.value.trim();
    let words = name.split(/\s+/);

       // Regular expression to match only alphabets.
       const regex = /^[a-zA-Z\s]+$/;
       
       // Check if the input matches the regular expression
       if (!regex.test(name)) {
           nameMsg.textContent = 'Only alphabets are allowed.';
           return false;
       }

      // Check if each word has at least 4 characters
      for (let word of words) {                                        // iteration over the words array
        if (word.length < 4) {                                                         // whenever word length will less than 4. then execute this block
            nameMsg.innerText = 'should be min 4 characters in each word.';
            return false;
        }
    }

    // checks atleast 2 word or not
    if (words.length < 2) {
        nameMsg.innerText = 'Please enter at least two words.';
        return false;
    }
     
      // If all checks pass, clear the error message
      nameMsg.innerText = '';
      return true;
}

function validateEmail() {                                                   // here is done All validation on email address
    const email = emailInput.value.trim();
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)){                                                 // test method is check basis on regular expression.
         emailMsg.innerText='Invalid email address.'
         return false;
    }

    emailMsg.innerText='';                                                // If all checks pass, clear the error message
    return true;
}

function validatePan(){                                                       // here is done, All validation on pan number
  const pan=panInput.value.trim();                                           // trim method of string, the remove all white spaces between string

  const panRegex=/^[A-Z]{5}[0-9]{4}[A-Z]$/;
  if(!panRegex.test(pan)){
    panMsg.textContent='Format must be ABCDE1234F.'                          // i gives dynamically change the html element, means add this text in the tag.
     return false;
  }

  panMsg.innerText='';
  return true;
}

function calculateLoan(){                                           // here is done, All validation on loan
   const laonAmount=parseFloat(loanInput.value.trim());
   let num= laonAmount.toString();                           // convert number to string.
 if(isNaN(laonAmount)|| num.length>9){
    loanMsg.innerText='upto 9 digits allow'
    loanMsg.style.color='red'
    return false;
 }
   if(laonAmount <= 0){                                      // check if loanAmount is greater than 0. or is a 
    loanMsg.innerText='Please enter a valid loan amount.';
   }else{                                                        // calculate the estimated emi in this else block.
      const AnnualInterestRate=8.5;
     const tenureYear=15;
     const monthlyInterestRate=AnnualInterestRate/12/100;
     const tenureMonth= tenureYear*12;
     const emi=(laonAmount*monthlyInterestRate*Math.pow(1+monthlyInterestRate,tenureMonth))/(Math.pow(1+monthlyInterestRate,tenureMonth)-1)
     loanMsg.innerText=`Estimated EMI: ₹${emi.toFixed(2)}`
     loanMsg.style.color='green';
     return true;
   }

   loanMsg.style.color='red';
}

// below function calling on the events

nameInput.addEventListener('change', ()=>{  
    ValidateName();
})

emailInput.addEventListener('change', ()=>{
    validateEmail();
})

panInput.addEventListener('change', ()=>{
    validatePan();
})

loanInput.addEventListener('keyup', ()=>{
    calculateLoan();
})

// this function are final submit
submitBtn.addEventListener('click',(e)=>{                                              
    e.preventDefault();

    if(ValidateName() && validateEmail() && validatePan() && calculateLoan()){            // if all validation will true, then submit the form
        let name=nameInput.value.split(/\s+/)
        sessionStorage.setItem('username',name[0])                                     // set name in sessionStorage because we need to next page
        sessionStorage.setItem('email',emailInput.value)                               // set email in sessionStorage because we need to next page
         window.location.href='confirm.html'                                        // redirect user confirm.html page
    }
})