const BASE_URL ="https://api.frankfurter.app";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



window.addEventListener("load", () =>{
  updateExchangeRate();
});



for (let select of  dropdowns){
    for (currCode in countryList) {
  let newOption = document.createElement("option");
  newOption.innerText = currCode;
   newOption.value = currCode;
   if(select.name  === "from" && currCode  ===  "USD"){
    newOption.selected ="selected";
   } else if(select.name  === "to" && currCode  ===  "INR"){
       newOption.selected ="selected";
   }
    select.append(newOption);
   }

   select.addEventListener("change", (evt)=>{
    updateFlag(evt.target);
   });
}
const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};




btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
});
const updateExchangeRate = async () =>{
  let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === ""|| amtVal<1){
        amtVal = 1;
        amount.Value = "1";
    }
   // console.log(fromCurr.value,toCurr.value);
  // https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}
  //https://api.frankfurter.app/latest?amount=1&//from=INR&to=JPY

const URL = `${BASE_URL}/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`;
  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);
  let rate = data.conversion_rate;


  let finalAmount = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
});
window.addEventListener("load", () => {
  updateExchangeRate();
});
