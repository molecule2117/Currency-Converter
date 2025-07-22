const converterForm= document.getElementById("converter-form");
const fromCurr =document.getElementById("from");
const to=document.getElementById("to");
const amount= document.getElementById("amount");
const result=document.getElementById("result");

window.addEventListener("load",fetchCurrency);
converterForm.addEventListener("submit",convertCurrency);

async function fetchCurrency(){
    const response= await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data= await response.json();
    const currencyOptions=Object.keys(data.rates);

    currencyOptions.forEach(currency=>{
        const option1=document.createElement("option");
        option1.value=currency;
        option1.textContent=currency;
        fromCurr.appendChild(option1);

    });

    currencyOptions.forEach(currency=>{
        const option2=document.createElement("option");
        option2.value=currency;
        option2.textContent=currency;
        to.appendChild(option2);

    });



}

 async function convertCurrency(e){
    e.preventDefault();
    const amt=parseFloat(amount.value);
    const fromval=fromCurr.value;
    const toval=to.value;
    if(amt<0){alert("enter a valid value");
    return;}
    const response=await fetch(`https://api.exchangerate-api.com/v4/latest/${fromval}`);
    const data= await response.json();
    const rate=data.rates[toval];
    const convertedAmt= (amt*rate).toFixed(2);
    result.textContent=`${amt} ${fromval} = ${convertedAmt} ${toval}`;


} 