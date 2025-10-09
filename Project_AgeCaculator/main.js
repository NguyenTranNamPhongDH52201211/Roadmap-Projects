document.addEventListener("DOMContentLoaded",()=>{
    const bthDateInput=document.querySelector("#birthDate");
    const btnCal=document.querySelector("#btn_CalAge");
    const placeResult=document.querySelector("#place_age");
    
    btnCal.addEventListener("click",()=>{
       const today=new Date();
       const birthDate=new Date(bthDateInput.value);

       if(!bthDateInput.value){
        placeResult.textContent="Please select your birth date.";
        return;
       }

       const result=today-birthDate;
       const age=Math.floor(result/(1000*60*60*24*365.25));
       placeResult.textContent=`You are ${age} years old`
    })
})
