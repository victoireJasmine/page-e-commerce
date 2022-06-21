/*global document*/

var images = Array.from(document.querySelectorAll('.illustration img')),
    imagesLength = images.length,
    currentImage = 1,
    nextBtn = document.getElementById("next"),
    prevBtn = document.getElementById("prev");


var navigatorUl = document.createElement('ul');
navigatorUl.setAttribute('id', 'ul-id');


for (var i = 1; i <= imagesLength; i = i + 1) {
    var navigatorLi = document.createElement("li");
    navigatorLi.setAttribute('data-index', i);
    navigatorLi.insertAdjacentHTML("beforeend", `
        <img src="${article.images[i-1].thumbnail}" alt="">
    `);
    navigatorUl.appendChild(navigatorLi);
}

document.getElementById("navigator").appendChild(navigatorUl);

var createdUl = document.getElementById('ul-id');

var createLi = Array.from(document.querySelectorAll('#ul-id li'));



for (var i = 0; i < createLi.length; i = i + 1){
    createLi[i].onclick = function () {
        "use strict";
        currentImage = parseInt(this.getAttribute("data-index"));
        
        theChecker();
    }
}


theChecker();   /*this is important,because it allows the currentImage to show directly when reloading the page, if you delete it the slider images will disappear when reloading the page and will not be shown until you click the next or prev buttons or click in the bullets numbers*/


nextBtn.onclick = function() {
    
    if(nextBtn.classList.contains('disabled')) {
        return false;
    } else {
        currentImage = currentImage + 1;
        theChecker();
    }
}

prevBtn.onclick = function() {
    
    if(prevBtn.classList.contains("disabled")) {
        return false;
    } else {
        currentImage = currentImage - 1;
        theChecker();
    }
}


function theChecker () {
        
    removeAttributes();
    
    images[currentImage - 1].classList.add('active');
    
    createLi[currentImage - 1].classList.add('active');
    
    if(currentImage == 1) {
        prevBtn.classList.add('disabled');
    } else {
        prevBtn.classList.remove('disabled');
    }
    
    if(currentImage == imagesLength) {
        nextBtn.classList.add('disabled');
    } else {
        nextBtn.classList.remove("disabled");
    }
}


function removeAttributes() {
    images.forEach(function(img) {
        img.classList.remove("active");
    });
    
    createLi.forEach(function(bullet) {
        bullet.classList.remove("active");
    });
}

//Play the checker function auto-matically..

setInterval(function autoPlay() {
    if (nextBtn.classList.contains('disabled')) {
        currentImage = 1;
        theChecker();
    } else {
        currentImage++;
        theChecker();
    }
}, 4000);