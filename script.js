const $cart = document.querySelector("#cart");
const $cartContent = document.querySelector("#cart-content");
const $burger = document.querySelector("#burger");
const $nav = document.querySelector("#nav");
const $linkNav = $nav.querySelectorAll("a");
const $plus = document.querySelector("#plus");
const $minus = document.querySelector("#minus");
const $nb = document.querySelector("#nb");
const $add = document.querySelector("#add");
const $notify = document.querySelector("#notify");
const $load = document.querySelector("#load");
const $cartBody = document.querySelector("#cart-body");

if($burger) $burger.addEventListener("click",openMenu);
if($linkNav) {
    $linkNav.forEach(element => {
        element.addEventListener("click",closeMenu);
    });
}
if($cart) $cart.addEventListener("click",toggleCart);
if($add) $add.addEventListener("click",addToCart);
if($plus) $plus.addEventListener("click",function() {
    ++$nb.value
});
if($minus) $minus.addEventListener("click",function() {
    --$nb.value;
    if($nb.value < 1) $nb.value = 1
});


function openMenu(e) {
    e.preventDefault();
    $nav.classList.add("active");
}
function closeMenu(e) {
    e.preventDefault();
    $nav.classList.remove("active");
}
function toggleCart(e) {
    e.preventDefault();
    $cartContent.classList.toggle("active");
}
function addToCart() {
    const getCarts =  JSON.parse(localStorage.getItem('carts'));
    if(in_array(getCarts, article.id)){
        const index = getCarts.map(e => e.id).indexOf(article.id);
        getCarts[index].quantity += parseInt($nb.value);

    }else{
        getCarts.push({
            ...article, quantity: parseInt($nb.value)
        })
    }
    localStorage.setItem('carts', JSON.stringify(getCarts));
    notifyCart();

}

function updateCart() {
    const getCarts =  JSON.parse(localStorage.getItem('carts'));
    if(getCarts.length) {
        $cartBody.innerHTML=`
            <div class="cart-list">
                <div class="list-articles" id="products"></div>
                <div class="col">
                    <a href="javascript:();" onClick="checkout()" class="btn btn-theme">Checkout</a>
                </div>
            </div>
        `;

        const $products = document.querySelector("#products");

        for (let i = 0; i < getCarts.length; i++) {
            const element = getCarts[i];
            const price  = !element.reduc ? element.price : (element.price-((element.price*element.reduc)/100)) 
            $products.insertAdjacentHTML("beforeend", `
                <article class="product">
                    <div class="product-thumbail">
                        <img src="${element.images[0].thumbnail}" alt="">
                    </div>
                    <div class="product-desc">
                        <p>${truncate(element.title, 30)}</p>
                        <p>$${price} x ${element.quantity} <strong>$${price*element.quantity}</strong></p>
                    </div>
                    <div class="product-action">
                        <a href="javascript:();" onClick="removeItem(${i})">
                            <img src="./images/icon-delete.svg" alt="">
                        </a>
                    </div>
                </article>
            `);
        }

    }else{
        $cartBody.innerHTML=`
            <div class="cart-empty">
                Your cart is empty
            </div>
        `
    }
}

function notifyCart() {
    const getCarts =  JSON.parse(localStorage.getItem('carts'));
    if(getCarts.length) {
        let quantity = 0;
        getCarts.forEach(element => {
            quantity+=element.quantity
        });
        $notify.innerHTML = `<span>${quantity}</span>`;
    }else{
        $notify.innerHTML = ``;
    }
    updateCart()
}
notifyCart()

function in_array(array, id) {
    for(var i=0;i<array.length;i++) {
        return (array[i].id === id)
    }
    return false;
}

function removeItem(index) {
    const getCarts =  JSON.parse(localStorage.getItem('carts'));
    getCarts.splice(index,1);
    localStorage.setItem('carts', JSON.stringify(getCarts));
    notifyCart();
}

function checkout() {
    const getCarts =  JSON.parse(localStorage.getItem('carts'));
    localStorage.setItem('carts', JSON.stringify([]));

    let total = 0;
    for (let i = 0; i < getCarts.length; i++) {
        const element = getCarts[i];
        const price  = !element.reduc ? element.price : (element.price-((element.price*element.reduc)/100))
        total+=price*element.quantity
    }

    $cartBody.innerHTML=`
        <div class="cart-empty" style="color: green !important">
            you have completed purchases totaling $${total}
        </div>
    `
    $load.classList.add('active');

    setTimeout(() => {
        location.reload();    
    }, 5000);

}

function truncate (str, len) {
    if (str.length > len) {
       if (len <= 3) {
          return str.slice(0, len - 3) + "...";
       }
       else {
          return str.slice(0, len) + "...";
       };
    }
    else {
       return str;
    };
 };