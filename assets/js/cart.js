let cartData = JSON.parse(localStorage.getItem('cart'))

const cart_div = document.getElementById('cart--item')

cartData.map((data,i) => {
    const price = data.item_price.split('$')

    return (
        cart_div.insertAdjacentHTML('afterbegin',`<div class="cart--item w-full grid grid-cols-4 p-2 border-b-2"><span class="text-center">${data.item_name}</span><span class="text-center flex justify-center space-x-3"><span class="text-xl text-white px-2 bg-grey cursor-pointer">-</span><span class="text-2xl" id='qty'>${data.item_qty}</span><span class="text-xl text-white px-2 bg-grey cursor-pointer" id='increament'>+</span></span><span class="text-center">${price[1]}</span><span class="text-center">${Number(price[1])*data.item_qty}</span></div>`)
    )
})

const incQty = document.querySelectorAll('#increament')
incQty.forEach((ele,i) => {
    ele.addEventListener('click',()=>{
        const itemName = ele.parentElement.previousSibling.textContent;
        cartData = cartData.map(data => {
            return data.item_name === itemName ? Object.assign({},data,{item_qty:data.item_qty+1}):data
        })
        console.log(cartData);
        
    })
})
