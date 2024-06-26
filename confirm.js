const username=document.getElementById('name');
const useremail=document.getElementById('email');
const OtpButton=document.getElementById('submitOtp')
const userOtp=document.getElementById('otp')
const ErrorMsg=document.getElementById('ErrorMsg')
const TextBlock=document.getElementById('textblock');

let OtpStore;
let count=1;

function onPageLoad(){                                         // this function is execute whenever page is loaded.
    const name=sessionStorage.getItem('username');              // get data from sessionStorage
    const email=sessionStorage.getItem('email');
   username.innerText=name;                                   // assign the name in html element tag
   useremail.innerText=email;
    GenerateRandamNumber();                               
}

window.addEventListener('load', onPageLoad);                // when the window's load event is fired. This event occurs when the entire page has fully loaded                  

function GenerateRandamNumber(){                                               //Generate random 4 digit number here
    const RandamNumber= Math.floor(1000 + Math.random() * 9000);
    console.log(`Generated  OTP: ${RandamNumber}`)
    OtpStore=RandamNumber;
}


function ValidateUser(){                                                  // this function is check OTP is correct or not and perform some conditional validation
     if(OtpStore==userOtp.value){
        TextBlock.style.visibility = 'hidden';                               // hide validation form whenever user gives correct OTP
         ErrorMsg.innerText='Validation Successfull!'
         ErrorMsg.style.color='green';
         setTimeout(() => {                                               // this function execute after 1 sec and redirect on pixel6 website
            window.location.href='https://pixel6.co/'                     // after 1 sec we redirect pixel6 website home page
         }, 1000);
        
     }else{
        userOtp.value='';
        ErrorMsg.innerText='Re-enter otp';
        ErrorMsg.style.color='red';
        if(count < 3){
            count++;
        }else{
            TextBlock.style.visibility = 'hidden';                               // hide validation form whenever user gives 3 times incorrect OTP
            ErrorMsg.innerText='Validation Failed!'
            ErrorMsg.style.color='red';
            setTimeout(() => {
                window.location.href='https://pixel6.co/program'                  // we redirect pixel6 website 404 page.
            }, 1000);
        }
     }
}

OtpButton.addEventListener('click', ()=>{  
   ValidateUser();                                          // call the function when user click validate button
})