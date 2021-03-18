import {item1 , item2 , item3 , item4 , item5} from './items.js';


//CONSTS
const addNewItem = document.getElementById('addNewItemBtn');
const clear = document.getElementById('clear');
const parent = document.getElementById('parentRow');
const cart = document.getElementById('cart');


let store = localStorage;

//RANDOM ITEMS FROM ARRAY
let itemArray = [ item1 , item2 , item3 , item4 , item5];
let randomItem = itemArray[Math.floor(Math.random() * itemArray.length)];


//ZA PUNJENJE STOREA
addNewItem.addEventListener('click' , (e) => {

    if(store.getItem('shopItems') === null){
        let items = [];
        items.push(randomItem);
        store.setItem('shopItems' , JSON.stringify(items));
    }else{
        let items = JSON.parse(store.getItem('shopItems'));
        items.push(randomItem);
        store.setItem('shopItems' , JSON.stringify(items));
    }

    location.reload();
});


//FUNKCIJA PRIKAZA IZ STOREA U HTML
function showFromStore(){
    let store = localStorage;
    let items = JSON.parse(store.getItem('shopItems'));

    if(items === null){
        console.log('Trenutno nema itema za prodaju!');

    }else{

        items.forEach( (item) => {
            let out = document.createElement("div");
            out.innerHTML =
            `
                <div class="col">
                    <div class="card mb-4 shadow-sm">
                        <div class="card-header">
                        <h4 id="name" class="my-0 fw-normal">${item.name}</h4>
                        </div>
                        <div class="card-body">
                        <h1 class="card-title pricing-card-title">$${item.price} <small class="text-muted">/ mo</small></h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li class="users">${item.users} users included</li>
                            <li class="storage">${item.storage} of storage</li>
                            <li class="email">${item.emailOrNot}</li>
                            <li class="help">${item.helpOrNot}</li>
                        </ul>
                        <button type="button" class="w-100 btn btn-lg btn-outline-primary">Dodaj u Košaricu </button>
                        </div>
                    </div>
                </div>
            `
            parent.appendChild(out);
        });
    }
}
showFromStore();


//FUNKCIJA SPREMI STVARI U CART
function saveToCart(){
    let cards = document.querySelectorAll('.card')

    for(let i = 0; i < cards.length; i++){

        let btnForEvent = cards[i].querySelector('button');
        btnForEvent.addEventListener('click' , (e) => {
            e.preventDefault();

            //price
            let price = e.target.parentNode.querySelector('h1').innerText;
                //plus je tu da pretvori string u number
            let finalPrice = +price.slice(1, 4);

            //name
            let name = e.target.parentNode.parentNode.querySelector('#name').innerText
            //users
            let users = e.target.parentNode.querySelector('.users').innerText;
            //storage
            let storage = e.target.parentNode.querySelector('.storage').innerText;
             //email
            let email = e.target.parentNode.querySelector('.email').innerText;
            //help
            let help = e.target.parentNode.querySelector('.help').innerText;


            //item for saveing to lstore
            let item = {
                price : finalPrice,
                name : name,
                users : users,
                storage : storage,
                email : email,
                help : help
            }

            //save to lStore
            if(store.getItem('cart') === null){
                let items = [];
                items.push(item);
                store.setItem('cart' , JSON.stringify(items));
            }else{
                let items = JSON.parse(store.getItem('cart'));
                items.push(item);
                store.setItem('cart' , JSON.stringify(items));
            }
            location.reload();
        });
    }
}

saveToCart();

//FUNKCIJA OČISTI STORE
clear.addEventListener('click'  , (e) => {
    e.preventDefault();
    localStorage.clear();
    location.reload();
});


//FUNKCIJA SHOW CART ICON
function showIcon(){
    let store = localStorage;
    let items = JSON.parse(store.getItem('cart'));

    if(items === null){
        cart.style.display = 'none';
    }else{
        cart.style.display = 'block';
    }
}
showIcon();
