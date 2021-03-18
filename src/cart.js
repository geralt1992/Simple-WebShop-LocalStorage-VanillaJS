//CONST
const tableOut = document.getElementById('tableOut');
const checkoutBtn = document.getElementById('paypal-button-container');
const totalCost = document.getElementById('total');
const totalCost2 = document.getElementById('total2');


let store = localStorage;

checkoutBtn.addEventListener('click' , (e) => {

});


//FUNKCIJA PRIKAŽI CART IZ LSTOREA
function showFromCart(){

    let cart = JSON.parse(store.getItem('cart'));

    if(cart === null){
        console.log('Nema ništa u cartu!');
    }else{

        cart.forEach( (item) => {

            let tr = document.createElement('tr');
            tr.innerHTML =
            `
            <td data-th="Product">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="nomargin">${item.name}</h4>
                        <ul>
                        <li>${item.name}</li>
                        <li>${item.users}</li>
                        <li>${item.storage}</li>
                        <li>${item.email}</li>
                        <li>${item.email}</li>
                        </ul>
                        <p>Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
            </td>
            <td data-th="Price">$${item.price}</td>
            <td class="quanity" data-th="Quantity">
                <input max="5" min="1" type="number" class="form-control text-center" value="1">
            </td>
            <td data-th="Subtotal" class=" subtotal text-center">${item.price}</td>
            <td class="actions" data-th="">
                <button class="btn btn-danger btn-sm remove"><i class="fa fa-trash-o"></i></button>
            </td>
            `;
            tableOut.appendChild(tr);
        });
    }
}
showFromCart();


//REMOVE FUNKCIJA
function removeItemFromCart(){

    let cartItems = JSON.parse(store.getItem('cart'));
    let removeBtn = document.querySelectorAll('.remove');

    for(let i = 0; i < removeBtn.length; i++){

        //JEBENA STVAR ZA BRISATI ITEME IZ POLJA, tj. Lstorea!
        removeBtn[i].addEventListener('click' , (e) => {
            //za brisanje iz polja
            cartItems.splice([i] , 1);
            store.setItem('cart' , JSON.stringify(cartItems));
            location.reload();
        })
    }
}
removeItemFromCart()


//FUNKCIJA KOJA PRIKAZUJE TOTAL PRICE BEZ QUANITITY PROMIJENA
function totalPriceWithoutQuanityChanges(){
    let subtotal = document.querySelectorAll('.subtotal');
    sum = 0;
            subtotal.forEach( (item) => {
                let numberSubtotal = +item.innerHTML;
                sum += numberSubtotal;
            });
            totalCost.innerHTML = 'Total $' +sum;
            totalCost2.innerHTML = sum;
}
totalPriceWithoutQuanityChanges();


//QUANITY FUNKCIJA
function quanityAndTotalPrice(){

    let subtotal = document.querySelectorAll('.subtotal');
    let cartItems = JSON.parse(store.getItem('cart'));
    let quanityBtn = document.querySelectorAll('.quanity');

    for(let i = 0; i < quanityBtn.length; i++){

        let startingPrice = cartItems[i].price

        quanityBtn[i].addEventListener('input' , (e) => {
            let qunanitValue = quanityBtn[i].querySelector('input').value
            let newPrice = qunanitValue * startingPrice ;
            subtotal[i].innerHTML =  newPrice;

            //TOTAL PRICE
            sum = 0;
            subtotal.forEach( (item) => {
                let numberSubtotal = +item.innerHTML;
                sum += numberSubtotal;
                totalCost.innerHTML = 'Total $' +sum;
                totalCost2.innerHTML = sum;
            });
        });
    }
}
quanityAndTotalPrice();
