const addCart = document.querySelectorAll(".add--cart");
const itemName = document.querySelectorAll(".item--name");
const itemPrice = document.querySelectorAll(".item--price");
const cart_display = document.getElementById("cart--number");
const delete_items = document.querySelectorAll(".delete--item");

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
