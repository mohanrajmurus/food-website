let cartData = JSON.parse(localStorage.getItem("cart"));
const cart_display = document.getElementById("cart--number");
const totalAmount = document.getElementById('total--amount');
const cart_div = document.getElementById("cart--item");
cart_display.textContent = cartData.length;

cartData.map((data, i) => {
  const price = data.item_price.split("$");

  return cart_div.insertAdjacentHTML(
    "afterbegin",
    `<div class="cart--item w-full grid grid-cols-4 p-2 border-b-2"><span class="text-center">${
      data.item_name
    }</span><span class="text-center flex justify-center space-x-3"><span class="text-xl text-white px-2 bg-grey cursor-pointer" id='decreament'>-</span><span class="text-2xl" id='qty'>${
      data.item_qty
    }</span><span class="text-xl text-white px-2 bg-grey cursor-pointer" id='increament'>+</span></span><span class="text-center">${
      price[1]
    }</span><span class="text-center total--price">${
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
  totalPrice.forEach(ele => console.log(ele))

  //console.log(totalPrice);

//totalAmount.textContent = totalPrice?.reduce((acc,curr) => acc += Number(curr.textContent),0)
let sum = 0
for(const ele of totalPrice){
  sum += Number(ele.textContent)
}

totalAmount.textContent = sum
}
calculateTotalAmount()
