

function handleSlide() {

    // In case: they don't have any image --> intialize them
    // document.onload = function() {
    //     const imgArr = [];
    //     for(let i = 0; i < 3;i++) {
    //         imgArr[i] = new Image();
    //         imgArr[i] = `../img/carousel${i}-.jpg`;
    //     }
    // }


    const carouselItemList = document.querySelectorAll(".carousel-item");
    
    // console.log(carouselItemList);
    const carouselImgList = document.querySelectorAll(".carousel-item > img");
    // console.log(carouselImgList);


    const paneList = document.querySelectorAll(".carousel-indicators > li");
    // console.log(paneList);

    
    let currentIdx = 0;
    const nextBtn = document.querySelector(".carousel-captiop__btn-right");
    const prevBtn = document.querySelector(".carousel-captiop__btn-left");

    if(!nextBtn) return;
    nextBtn.addEventListener("click", () => {
        // console.log("hello next btn");
        // console.log(currentIdx);
        // console.log(currentIdx);
        
        if(currentIdx === carouselItemList.length - 1) currentIdx = -1;
        currentIdx++;
        
        // Cai nay giong nhau 

        handleActiveClass();

    });

    if(!prevBtn) return;
    prevBtn.addEventListener("click", () => {

        console.log("hello prev btn");
        
        // console.log(currentIdx);
        if(currentIdx === 0) currentIdx = carouselItemList.length;
        
        currentIdx--;
        
        // console.log(currentIdx);
        
        // Cai nay giong nhau
        handleActiveClass();

    });

    const setIntervalId = setInterval(() => {

        if(currentIdx === carouselItemList.length - 1) {
            // console.log(currentIdx);
            currentIdx = 0;
            handleActiveClass();
        } else {
            // console.log(currentIdx);
            currentIdx ++;
            handleActiveClass();
        }

    }, 5000)


    function handleActiveClass() {
        for(const item of carouselItemList) {
            item.classList.remove("active");
        }

        for(const pane of paneList) {
            pane.classList.remove("active");
        }

        carouselItemList[currentIdx].classList.add("active");
        paneList[currentIdx].classList.add("active");

    }

}

handleSlide();

function showImage(index) {
    const productThumb = document.querySelector(".product-thumbnail-img");
    // console.log(productThumb);
    const imgUrl = "img/product-" + index + ".jpg";
    productThumb.src = imgUrl;
}

const modal = document.querySelector(".modal");

function validateForm() {
    // console.log("hello");
    const size = document.getElementById("size-input-list")
    const color = document.getElementById("color-input-list")
    const sizeInputList = Array.from(document.querySelectorAll("#size-input-list .custom-control-input"));
    const colorInputList = Array.from(document.querySelectorAll("#color-input-list .custom-control-input"));

    const isEmptySize = sizeInputList.every((size) => size.checked === false);
    const isEmptyColor = colorInputList.every((color) => color.checked === false);
    
    // console.log(modal);
    
    if(isEmptySize || isEmptyColor) {
        // alert("Please  select some product options before adding this product to your cart.");
        modal.style.display = "block";
        return;
    }
    else {
        modal.style.display = "block";
        modal.querySelector(".modal-title").innerText = "Successfully";
        modal.querySelector(".modal-title").className = "modal-title text-success ";
        modal.querySelector(".modal-body p").innerText = "congratulations You have bought this item sucess hihi !"
        addToCart();
    } 

}

function closeModal() {
    modal.style.display = "none";
}

function handleAmount(index) {

    const inputAmount = document.getElementById("inputAmount");
    inputAmount.value = Number(inputAmount.value) + Number(index);
    
}

function addToCart() {
    // console.log("hello");

    const itemAmount = document.getElementById("itemAmount");
    // console.log(itemAmount);
    itemAmount.innerText = Number(itemAmount.innerText) + 1;
}

