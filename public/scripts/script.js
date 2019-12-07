const doc = document;
const storage = window.localStorage;
let toCartButtons = doc.querySelectorAll('[data-id]');
let storageCart = [];
let quantity = 0;
let summOfGlasses = 0;
let counter = doc.getElementById('counter');
const searchToggle = doc.getElementById('search-toggle');
const searchInput = doc.getElementById('search-input');
const form = doc.getElementById('search-form');
form.onsubmit = function (event) {
    event.preventDefault();
    const searchRequest = {request: searchInput.value};
    fetch('find', {
        method: "post",
        body: JSON.stringify(searchRequest),
        headers:{
            'Accept':'text/html',
            'Content-Type': 'application/json'
        }
    }).then(resp => {
        fetch('search')
            .then(resp => {
                console.log(resp);
                location.replace(resp.url);
            })
            .catch(error => {
                console.log(error);
            });
    }).catch(err => {
        console.log(err);
    })
};

counter.innerText = '0';
storageCart = JSON.parse(storage.getItem('cart'));
if (storageCart !== null) {
    storageCart.forEach(el => {
        summOfGlasses += el.quantity;
    });
    counter.innerText = summOfGlasses;
}

function showWhichElementInCart (store) {
  let inCart = document.getElementsByClassName('added-to-cart');
  if (store !== null && store.length !== 0) {
    for (let i = 0; i < inCart.length; i++) {
      for(let j = 0; j < store.length; j++) {
        if(inCart[i].dataset.visibility === store[j].id) {
          console.log(inCart[i]);
          inCart[i].style.display = 'block';
        }
      }
    }
  }
}

showWhichElementInCart(storageCart);

function addToCart (event) {
    const dataAttribute = event.target.dataset;
    ++summOfGlasses;
    counter.innerText = summOfGlasses;
    if (storageCart !== null && storageCart.length > 0) {
        let flag = storageCart.find(el => el.id === event.target.dataset.id);
        if (flag === undefined) {
            let newGlasses = {
                id: dataAttribute.id,
                quantity: 1,
                name: dataAttribute.name,
                identifier: dataAttribute.glassesidentificator,
                shape: dataAttribute.shape,
                sex: dataAttribute.sex,
                colorOfGlass: dataAttribute.colorg,
                gradient: dataAttribute.gradient,
                lenstype: dataAttribute.lenstype,
                colorOfFrame: dataAttribute.colorf,
                material: dataAttribute.material,
                price: dataAttribute.price,
                description: dataAttribute.description,
                foto_1: dataAttribute.foto_1,
                foto_2: dataAttribute.foto_2,
                foto_3: dataAttribute.foto_3
            };
            storageCart.push(newGlasses);
            console.log(storageCart);
            storage.setItem('cart', JSON.stringify(storageCart));
            showWhichElementInCart(storageCart);
        } else {
            storageCart.forEach((el) => {
                if (el.id === event.target.dataset.id) {
                    ++el.quantity;
                }
            });
            storage.setItem('cart', JSON.stringify(storageCart));
            showWhichElementInCart(storageCart);
        }
    } else {
        storageCart = [];
        let newGlasses = {
            id: dataAttribute.id,
            quantity: 1,
            name: dataAttribute.name,
            identifier: dataAttribute.glassesidentificator,
            shape: dataAttribute.shape,
            sex: dataAttribute.sex,
            colorOfGlass: dataAttribute.colorg,
            gradient: dataAttribute.gradient,
            lenstype: dataAttribute.lenstype,
            colorOfFrame: dataAttribute.colorf,
            material: dataAttribute.material,
            price: dataAttribute.price,
            description: dataAttribute.description,
            foto_1: dataAttribute.foto_1,
            foto_2: dataAttribute.foto_2,
            foto_3: dataAttribute.foto_3
        };
        storageCart.push(newGlasses);
        storage.setItem('cart', JSON.stringify(storageCart));
        showWhichElementInCart(storageCart);
    }
}

for (let i = 0; i < toCartButtons.length; i++) {
    toCartButtons[i].onclick = addToCart;
}
