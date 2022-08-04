

const tableAddCart = document.getElementById('tableAddCart');
const tableRemoveCart = document.getElementById("tableRemoveCart");
const addQuantityList =  tableAddCart.querySelectorAll(".input-group-btn button.btn.btn-plus");
const inputAmount = tableAddCart.querySelector(".input-group .form-control");
const subtractQuantityList = tableAddCart.querySelectorAll(".input-group-btn button.btn.btn-minus");
const subTotal = document.getElementById("subTotal");
const shippingFee = document.getElementById("shippingFee");
const finalTotalElement = document.getElementById("finalTotal");



function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
}

for(const addItem of addQuantityList) {

    // Handle When clicked Item
    addItem.addEventListener("click",(e)=> {
        const plusBtn = e.currentTarget;
        handleValueItem(plusBtn,1);
        
    })
}

for(const subtractItem of subtractQuantityList) {
    // Handle When clicked Item
    subtractItem.addEventListener("click", (e) => {
        minusBtn = e.currentTarget;
        handleValueItem(minusBtn,-1);
    })
}

function handleValueItem(targetElement, num) {
    const currentRowElement = getParent(targetElement,"tr");
    handleValue(currentRowElement,num)
 
}

function addToCart(addBtn) {
    // console.log(addBtn);
    const nameAddProduct = getParent(addBtn, "tr").querySelector("td:nth-child(1)").textContent.trim();
    const cloneRowList = tableRemoveCart.querySelectorAll("tr");
    for(const cloneRow of cloneRowList) {
        if(cloneRow.getAttribute("id-name") ==  nameAddProduct) {
            const numberAddAmount = Number(getParent(addBtn, "tr").querySelector("td:nth-child(3) input").value);
            // console.log(numberAddAmount);
            handleValue(cloneRow, numberAddAmount);
            
            // getMoneySummary(cloneRow, "+");
            const rowList = Array.from(tableRemoveCart.querySelectorAll(".row-remove-item"));
            // console.log(rowList);
            
            getMoneySummary(rowList,"+");

            return;
        }
    }

    const clonedRowElement = getParent(addBtn, "tr").cloneNode(true);
    clonedRowElement.className = "row-remove-item";
    const nameItem = clonedRowElement.querySelector("td:nth-child(1)").textContent.trim();
    clonedRowElement.setAttribute("id-name",nameItem);
    // console.log(clonedRowElement);
    // console.log(clonedRowElement.getAttribute("id-name"));
    clonedRowElement.querySelector("td:nth-child(3) button.btn.btn-plus").setAttribute("disabled",true);
    clonedRowElement.querySelector("td:nth-child(3) button.btn.btn-minus").setAttribute("disabled",true);
    clonedRowElement.querySelector("td:nth-child(3) input").setAttribute("disabled",true);
    clonedRowElement.querySelector("td:nth-child(5) button").className = "btn btn-sm btn-danger";
    clonedRowElement.querySelector("td:nth-child(5) button i").className = "fa fa-times";
    clonedRowElement.querySelector("td:nth-child(5) button").setAttribute("onclick", "removeOutCart(this)");

    // console.log();
    tableRemoveCart.querySelector("tbody").appendChild(clonedRowElement);

    const rowList = Array.from(tableRemoveCart.querySelectorAll(".row-remove-item"));
    getMoneySummary(rowList,"+");

}

function removeOutCart(removeBtn){
    const rowRemoveItem = getParent(removeBtn, "tr");
    rowRemoveItem.remove();
    const rowList = Array.from(tableRemoveCart.querySelectorAll(".row-remove-item"));
    getMoneySummary(rowList,"-");
}


function handleValue(rowElement, num) {
    const currentQuantityElement = rowElement.querySelector("td:nth-child(3) input");
    const currentTotalElement = rowElement.querySelector("td:nth-child(4)");
    const currentPriceElement = rowElement.querySelector("td:nth-child(2)");
    const currentPrice = Number(currentPriceElement.innerText.substring(1));
    
    let currentQuantity = Number(currentQuantityElement.value);
    currentQuantityElement.value = currentQuantity + num;
    currentTotal = Number(currentQuantityElement.value) * currentPrice;
    currentTotalElement.innerText = "$"+currentTotal;
}

function getMoneySummary(rowList, plusOrMinus) {

    switch(plusOrMinus) {
        case "+":
            let sumAdd = 0;
            for(const row of rowList) {
                const totalItemValue = Number(row.querySelector("td:nth-child(4)").innerText.substring(1));
                sumAdd+= totalItemValue;
            }
            subTotal.innerText = "$" + sumAdd;
            break;
        case "-":

            let sumSubtract = 0;
            if(rowList.length === 0) {
                console.log("hi 0");
                sumSubtract = 0;
            } else {
                for(const row of rowList) {
                    const totalItemValue = Number(row.querySelector("td:nth-child(4)").innerText.substring(1));
                    sumSubtract+= totalItemValue;
                }
                console.log("hi sum subtract");
            }
            subTotal.innerText = "$" + sumSubtract;
            
            break;
    }
   
    getFinalTotal();
}


function showModal() {
    const modal = document.querySelector(".modal");
    console.log(modal);
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function getFinalTotal() {
    let finalTotal = Number(subTotal.innerText.substring(1)) + Number(shippingFee.innerText.substring(1));
    finalTotalElement.innerText = "$" + finalTotal;
}