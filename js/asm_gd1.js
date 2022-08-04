
const productList = document.querySelectorAll(".product-item");
// console.log(productList);
const quanityWishItem = document.getElementById("quanityWishItem")
const quanityCartItem = document.getElementById("quanityCartItem")
const modalElement = document.querySelector(".modal");
// console.log(modalElement);


function handleEventMouse(e) {
    const cartItemList = e.target.querySelectorAll(".product-action > a");
    if(e.type ==="mouseover")  {
        for(const cartItem of cartItemList) {
            cartItem.style.opacity = 1;
            cartItem.style.marginTop = 0;
            // cartItem.style.cssText =
            cartItem.style.transition = "transition: .3s .05s";
            cartItem.classList.add("btn-outline-dark","btn-square");
        }

    }

    if(e.type ==="mouseout") {
        for(const cartItem of cartItemList) {
            cartItem.style.opacity = 0;
            // e.target.style.backgroundColor = "unset";
            cartItem.addEventListener("mouseover", (e)=> {
                cartItemList.forEach((item) => {

                    item.style.opacity = 1;
                    
                })
            })
        }

    }

}


for(const product of productList) {
    product.addEventListener("mouseover", handleEventMouse);
    product.addEventListener("mouseout",handleEventMouse);


    

}


for(const product of productList) {
    
    const wishItemList = product.querySelectorAll(".product-action a");
   
    const cartItem = wishItemList[0];
    cartItem.addEventListener("click", function(e) {
        e.preventDefault();
        // console.log("hello");
        modalElement.style.display = "block";
        modalElement.querySelector(".modal-body > p").innerText = "You have added the Item into the cart list";

        quanityCartItem.innerText = Number(quanityCartItem.innerText) + 1;

        
    })
    
    const wishEmotionItem = wishItemList[1];
    wishEmotionItem.addEventListener("click", function(e) {
        e.preventDefault();
        e.currentTarget.style.color = "red";
        
        modalElement.style.display = "block";
        modalElement.querySelector(".modal-body > p").innerText = "You have added the Item into the wish list";

        quanityWishItem.innerText = Number(quanityWishItem.innerText) + 1;

    })

    const seachIcon = wishItemList[3];
    seachIcon.addEventListener("click", function(e) {
        e.preventDefault();
        location.assign("detail.html")
    })

}


document.getElementById("cartBtn").addEventListener("click", (e) => {
    e.preventDefault();
    location.assign("detail.html");
})
document.getElementById("wishBtn").addEventListener("click", (e) => {
    e.preventDefault();
    location.assign("detail.html");
})