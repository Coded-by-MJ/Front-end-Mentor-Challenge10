const stepOne = document.querySelector(".step-one");
const stepTwo = document.querySelector(".step-two");
const stepThree = document.querySelector(".step-three");
const stepFour = document.querySelector(".step-four");
const tabBtns = document.querySelectorAll(".tab-btn");

const contents = document.querySelectorAll(".content-box");
let checkedBox = document.getElementById("checked");
const confirmBtn  = document.getElementById("confirm");
let total = document.querySelector(".total");

const nextBtn = document.querySelectorAll(".next");
const prevBtn =  document.querySelectorAll(".prev");



function handleTabButtonState() {
    tabBtns.forEach((btn, index) => {
        if (contents[index].classList.contains("active")) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}
handleTabButtonState();


//next and prev handlers
prevBtn[0].addEventListener("click", movetoStepOne);
prevBtn[1].addEventListener("click", movetoStepTwo);
prevBtn[2].addEventListener("click", movetoStepThree);


nextBtn[1].addEventListener("click", movetoStepThree);
nextBtn[2].addEventListener("click", movetoStepFour);
nextBtn[2].addEventListener("click", updateCheckout);










//Step one codes
const form = document.getElementById("myform");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (form.checkValidity()){
        let errTxts = form.querySelectorAll(".err-txt");
        let inputs = form.querySelectorAll("input");
        errTxts.forEach((err) => {
            err.style.display = "none";
       }); 
        inputs.forEach((input) => {
        input.classList.remove("err");
        input.value = "";
      }); 
      setTimeout(()=>  movetoStepTwo(), 200);

    }else{
        handleError();
    }
});



function handleError() {
    let formEl = form.querySelectorAll(".form-control");

    formEl.forEach((el, index) => {
        let errTxt = el.querySelector('.err-txt');
        let input = el.querySelector('input');


        input.addEventListener('input', () => {
            errTxt.textContent = "";
            errTxt.style.display = "none";
            input.classList.remove("err");
        });

        if (input.value.trim() === "") {
            errTxt.textContent = "This field is required";
            errTxt.style.display = "block";
            input.classList.add("err");
        } else if (index === 2 && !input.checkValidity()) {
            errTxt.textContent = "Wrong number format";
            errTxt.style.display = "block";
            input.classList.add("err");
        } else if (index === 1 && !input.checkValidity()) {
            errTxt.textContent = "Wrong email address";
            errTxt.style.display = "block";
            input.classList.add("err");
        } else {
            input.classList.remove("err");
            errTxt.textContent = "";
            errTxt.style.display = "none";
           
            return;
        }
    });
};



//step two codes

let stepTwoItems = stepTwo.querySelectorAll(".item");

checkedBox.addEventListener("change", updatePrices);

function updatePrices() {
    stepTwoItems.forEach((item, index) => {
        const priceEl = item.querySelector(".price");
        const free = item.querySelector(".free");
        if (index === 0) {
            priceEl.innerHTML = checkedBox.checked ? "$90/yr" : "$9/mo";
        } else if (index === 1) {
            priceEl.innerHTML = checkedBox.checked ? "$120/yr" : "$12/mo";
        } else if (index === 2) {
            priceEl.innerHTML = checkedBox.checked ? "$150/yr" : "$15/mo";
        }
       
         free.style.display = checkedBox.checked ? "block" : "none";
    });
}

updatePrices();

stepTwo.addEventListener("click", (e) => {
    const clickedItem = e.target.closest(".item");
    if (!clickedItem || !stepTwo.contains(clickedItem)) return; // Exit if not clicking on an item within stepTwo

    // Remove active class from all items
    stepTwoItems.forEach((item) => {
        item.classList.remove("active");
    });

    // Add active class to the clicked item
    clickedItem.classList.add("active");
});









//step three codes;
let stepThreeItems = stepThree.querySelectorAll(".item")

checkedBox.addEventListener("change", updatePickonsPrices);

function updatePickonsPrices() {
    stepThreeItems.forEach((item, index) => {
        const priceEl = item.querySelector(".price");
        if (index === 0) {
            priceEl.innerHTML = checkedBox.checked ? "+$10/yr" : "+$1/mo";
        } else if (index === 1) {
            priceEl.innerHTML = checkedBox.checked ? "+$20/yr" : "+$2/mo";
        } else if (index === 2) {
            priceEl.innerHTML = checkedBox.checked ? "+$20/yr" : "+$2/mo";
        }

    });
}

updatePickonsPrices();
updatechecks();

function updatechecks() {
    stepThreeItems.forEach((item) => {
        const check = item.querySelector("input[type='checkbox']");

        if (check.checked) {
            item.classList.add("active");
        }

    
        check.addEventListener("change", function() {
            if (check.checked) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    });
}



//step four codes;

updateCheckout();

function updateCheckout() {
    let checkout = stepFour.querySelector(".check-out");
    let planName = getSelectedPlan()[0];
    let planPrice = getPriceOfSelectedPlan()[0];
    let priceValue = checkedBox.checked ? `$${planPrice}/yr` : `$${planPrice}/mo`;
    let addOns = getSelectedAddOns();
    let addOnsPrice = getPriceOfSelectedAddOns();
    let totalPrice = planPrice + addOnsPrice.reduce((total, price) => total + price, 0);


    checkout.innerHTML = " ";

    let PlanContainer = document.createElement('div');
    PlanContainer.classList.add("item");
    PlanContainer.innerHTML = `
        <div class="sm-txt">
            <h3>${planName} (${checkedBox.checked ? "Yearly" : "Monthly"})</h3> 
            <a href="#" id="change" >Change</a>
        </div>
        <span class="price">${priceValue}</span>
    `;

    checkout.appendChild(PlanContainer);

    let change = document.getElementById("change")
    change.addEventListener("click", movetoStepTwo);

    // Iterate over add-ons and create elements
    for (let i = 0; i < addOns.length; i++) {
        let item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
            <span>${addOns[i]}</span>
            <span class="price">${checkedBox.checked ? `+$${addOnsPrice[i]}/yr` : `+$${addOnsPrice[i]}/mo`}</span>
        `;
        // Append the add-on item directly to the checkout container
        checkout.appendChild(item);
    }


    
 let totalItems = total.querySelectorAll("span")
 totalItems[0].innerHTML = `Total (${checkedBox.checked ? "per year" : "per month"})`;
 totalItems[1].innerHTML =  `${checkedBox.checked ? `$${totalPrice}/yr` : `+$${totalPrice}/mo`}`;
 
}










function getSelectedPlan(){
    let activeItems = stepTwo.querySelectorAll(".item.active");

    let planName = [];

    activeItems.forEach((item)=>{
        let headTag = item.querySelector("h3");
        let name = headTag.innerHTML.trim();
        planName.push(name);
    })

    return planName;
}



function getPriceOfSelectedPlan() {
    let activeItems = stepTwo.querySelectorAll(".item.active");
    let prices = [];
    activeItems.forEach((item) => {
        let priceElement = item.querySelector(".price");
        let priceHtml = priceElement.innerHTML.trim(); 
        let priceNumeric = parseFloat(priceHtml.replace(/[^\d.]/g, '')); 
        prices.push(priceNumeric);
    });

    return prices;
}






function getSelectedAddOns(){
    let activeItems = stepThree.querySelectorAll(".item.active");

    let planName = [];

    activeItems.forEach((item)=>{
        let headTag = item.querySelector("h3");
        let name = headTag.innerHTML.trim();
        planName.push(name);
    })

    return planName;
}





function getPriceOfSelectedAddOns() {
    let activeItems = stepThree.querySelectorAll(".item.active");
    let prices = [];
    activeItems.forEach((item) => {
        let priceElement = item.querySelector(".price");
        let priceHtml = priceElement.innerHTML.trim(); 
        let priceNumeric = parseFloat(priceHtml.replace(/[^\d.]/g, '')); 
        prices.push(priceNumeric);
    });

    return prices;
}














function movetoStepOne(){
    contents.forEach((content, index) =>{
       content.classList.remove("active");
       if(index === 0){
        content.classList.add("active");
       }
    })
    handleTabButtonState();
}



function movetoStepTwo(){
    contents.forEach((content, index) =>{
       content.classList.remove("active");
       if(index === 1){
        content.classList.add("active");
       }
    })
    handleTabButtonState();
}


function movetoStepThree(){
    contents.forEach((content, index) =>{
       content.classList.remove("active");
       if(index === 2){
        content.classList.add("active");
       }
    })
    handleTabButtonState();

}

function movetoStepFour(){
    contents.forEach((content, index) =>{
       content.classList.remove("active");
       if(index === 3){
        content.classList.add("active");
       }
    })
    handleTabButtonState();
}





//confirmed message;


setTimeout(() => {
    confirmBtn.addEventListener("click", function(){
        setTimeout(() => {
            confirmed();
        }, 1000);
    });
}, 1000);


function confirmed(){

    const lastContent = contents[3];
    lastContent.innerHTML = " ";
    const notify = document.createElement("div");
    notify.classList.add("notify");

    notify.innerHTML = `
    <img src="images/icon-thank-you.svg" alt="checkmark">

    <h2>Thank you!</h2>
    <p>
       Thanks for confirming your subscription! We hope you have fun 
       using our platform. If you ever need support, please feel free 
       to email us at support@loremgaming.com.
     </p>
    `;
    
    lastContent.appendChild(notify);

    setTimeout(() => {
        window.location.reload();
    }, 6000);
  
  
}
