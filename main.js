const addCart = document.querySelectorAll(".add--cart");
const itemName = document.querySelectorAll(".item--name");
const itemPrice = document.querySelectorAll(".item--price");
const cart_display = document.getElementById("cart--number");
const delete_items = document.querySelectorAll(".delete--item");

//drop Down menu

const dropDown = document.getElementById('drop--down');
const subMenu = document.getElementById('sub--menu')
dropDown.addEventListener('click',()=>{
  subMenu.classList.toggle('hidden')
})

for (let i = 0; i < addCart.length; i++) {
  addCart[i].addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
    const item_name = itemName[i].textContent;
    const item_price = itemPrice[i].textContent;
    const item_qty = 1;
    const cartObject = {
      item_name,
      item_price,
      item_qty,
    };
    if (cart.find((data) => data.item_name === cartObject.item_name)) {
      return;
    } else {
      cart.push(cartObject);
      cart_display.textContent = cart.length;
      localStorage.setItem("cart", JSON.stringify(cart));
      addCart[i].nextElementSibling.classList.remove("hidden");
      addCart[i].classList.add("hidden");
    }

    //console.log(cart);
  });
}

for (const delete_item of delete_items) {
  delete_item.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const itemName =
      delete_item.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    cart = cart.filter((data) => data.item_name !== itemName);
    cart_display.textContent = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));
    delete_item.previousElementSibling.classList.remove("hidden");
    delete_item.classList.add("hidden");
  });
}

const closeMenu = document.querySelector('.close--menu');
const sidemenu = document.querySelector('.side--menu');
const menuBar = document.querySelector('.menubar')
const header = document.querySelector('.header')
closeMenu.addEventListener('click',(e)=>{
  sidemenu.classList.toggle('hidden')
  menuBar.classList.toggle('hidden')
  menuBar.classList.toggle('text-left')
  header.classList.toggle('justify-evenly')
  header.classList.toggle('justify-between')
})

menuBar.addEventListener('click',() => {
  sidemenu.classList.toggle('hidden')
  menuBar.classList.toggle('hidden')
  header.classList.toggle('justify-between')
  header.classList.toggle('justify-evenly')
 

})




//cart Display


let cartData = JSON.parse(localStorage.getItem("cart"))||[];
const totalAmount = document.getElementById('total--amount');
const cart_div = document.getElementById("cart--item");
cart_display.textContent = cartData.length;

[...cartData].map((data, i) => {
  const price = data.item_price.split("$");

  return cart_div.insertAdjacentHTML(
    "afterbegin",
    `<div class="cart--item w-full grid grid-cols-4 py-2 border-b-2 border-textcolor"><span class="text-center text-textcolor">${
      data.item_name
    }</span><span class="text-center flex justify-center space-x-3"><span class="text-xl text-white px-3 rounded-md bg-textcolor-sec cursor-pointer text-textcolor" id='decreament'>-</span><span class="text-2xl text-textcolor" id='qty'>${
      data.item_qty
    }</span><span class="text-xl text-white px-2 bg-textcolor-sec cursor-pointer text-textcolor rounded-md" id='increament'>+</span></span><span class="text-center text-textcolor">${
      price[1]
    }</span><span class="text-center total--price text-textcolor">${
      Number(price[1]) * data.item_qty
    }</span></div>`
  );
});

const incQty = document.querySelectorAll("#increament");
incQty.forEach((ele, i) => {
  ele.addEventListener("click", () => {
    const itemName = ele.parentElement.previousSibling.textContent;
    const price = ele.parentElement.nextSibling.textContent;
    cartData = cartData.map((data) => {
      const price = data.item_price.split("$");
      ele.previousSibling.textContent = data.item_qty + 1;
      
      // console.log(price[1]);
      return data.item_name === itemName
        ? Object.assign({}, data, { item_qty: data.item_qty + 1 })
        : data;
    });
    localStorage.setItem("cart", JSON.stringify(cartData));
    //console.log(cartData);
    ele.parentElement.parentElement.lastChild.textContent =
      Number(ele.previousSibling.textContent) * Number(price);
      calculateTotalAmount()
  });
});

const decQty = document.querySelectorAll("#decreament");
decQty.forEach((ele, i) => {
  ele.addEventListener("click", () => {
    const itemName = ele.parentElement.previousSibling.textContent;
    const price = ele.parentElement.nextSibling.textContent;
    const qty = ele.nextSibling.textContent;
    cartData = cartData.map((data) => {
      if (qty > 1) ele.nextSibling.textContent = data.item_qty - 1;
      // console.log(price[1]);
      return data.item_name === itemName && data.item_qty > 1
        ? Object.assign({}, data, { item_qty: data.item_qty - 1 })
        : data;
    });
    localStorage.setItem("cart", JSON.stringify(cartData));
    //console.log(cartData);
    ele.parentElement.parentElement.lastChild.textContent =
      Number(ele.nextSibling.textContent) * Number(price);
      calculateTotalAmount()
  });
});

const calculateTotalAmount = () =>{
  const totalPrice = document.querySelectorAll('.total--price');

  //console.log([totalPrice]);

totalAmount.textContent = [...totalPrice].reduce((acc,curr) => acc += Number(curr.textContent),0)
/* let sum = 0
for(const ele of totalPrice){
  sum += Number(ele.textContent)
}

totalAmount.textContent = sum */
}
calculateTotalAmount()


