let cart = JSON.parse(window.localStorage.getItem('cart'));
const deleteCart = document.getElementById('delete-all');
const buy = document.getElementById('buy');

renderGlasses();

deleteCart.onclick = function (event) {
    let wrapper = document.getElementsByClassName('container')[0];
    wrapper.innerHTML = "";
    cart = [];
    window.localStorage.removeItem('cart');
};

buy.onclick = function () {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    let glassesOrder = [];
    let order = {};
    order.quantity_item = [];
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let courier = document.getElementById('courier').value;
    cart.forEach((el) => {
        glassesOrder.push({_id: el.id});
    });
    order.glasses = glassesOrder;
    cart.forEach(el => {
        order.quantity_item.push({glasses_id: el.identifier, quantity: el.quantity});
    });
    order.glasseQuantity = [{

    }];
    order.phone = phone;
    order.address = address;
    order.courier = courier;
    let data = toFormData(order);
    makeOrder(data);
};

function makeOrder(orderObject) {
    return fetch('order', {
        method: "post",
        body: orderObject
    })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
}

function toFormData(dataObject) {
    let formData = new FormData();
    for (let k in dataObject) {
        if (dataObject.hasOwnProperty(k)) {
            if (dataObject[k] && dataObject[k].files) {
                let file = dataObject[k].files[0];
                formData.append(k, file, file.name);
            } else if (Array.isArray(dataObject[k])) {
                formData.append(k, JSON.stringify(dataObject[k]));
            } else if (typeof dataObject[k] === 'object' && !(dataObject[k] instanceof File)) {
                formData.append(k, JSON.stringify(dataObject[k]));
            } else {
                formData.append(k, dataObject[k]);
            }
        }
    }
    return formData;
}

function renderGlasses() {
    const glassesWrapper = document.getElementsByClassName('item-wrapper')[0];
    if (cart !== null) {
        let summ = 0;
        let summElement = document.getElementById('summ');
        cart.forEach((el) => {
            summ += el.price * el.quantity;
            summElement.innerText = summ + " UAH";
            let itemGlasses = document.createElement('a');
            let glassesName = document.createElement('span');
            let glassesId = document.createElement('span');
            let glassesPrice = document.createElement('span');
            let glassesImg_1 = document.createElement('img');

            let decrementItem = document.createElement('button');
            let incrementItem = document.createElement('button');
            decrementItem.classList.add('decrement');
            incrementItem.classList.add('increment');
            decrementItem.dataset.id = el.id;
            incrementItem.dataset.id = el.id;

            itemGlasses.classList.add('item');
            glassesImg_1.classList.add('item-photo');
            glassesName.classList.add('item-name');
            glassesId.classList.add('item-id');
            glassesPrice.classList.add('item-price');

            glassesName.innerHTML = el.name;
            glassesId.innerHTML = el.identifier;
            glassesPrice.innerHTML = el.price;

            glassesImg_1.setAttribute('src', el.foto_1);

            itemGlasses.setAttribute('id', el.id);
            itemGlasses.appendChild(glassesImg_1);
            itemGlasses.appendChild(glassesName);
            itemGlasses.appendChild(glassesId);
            itemGlasses.appendChild(glassesPrice);
            itemGlasses.appendChild(decrementItem);
            itemGlasses.appendChild(incrementItem);
            glassesWrapper.appendChild(itemGlasses);
            decrementItem.onclick = function (event) {
                cart.forEach((el, index) => {
                   if (el.id === event.target.dataset.id && el.quantity >= 1) {
                       --el.quantity;
                       summ =+ el.price * el.quantity;
                       summElement.innerText = summ + " UAH";
                       if (el.quantity === 0) {
                           cart.splice(index, 1);
                           let deleteItem = document.getElementById(el.id);
                           deleteItem.remove();
                       }
                   }
                });
                window.localStorage.setItem('cart', JSON.stringify(cart));
            };
            incrementItem.onclick = function (event) {
                cart.forEach(el => {
                   if (el.id === event.target.dataset.id) {
                       ++el.quantity;
                       summ =+ el.price * el.quantity;
                       summElement.innerText = summ + " UAH";
                   }
                });
                window.localStorage.setItem('cart', JSON.stringify(cart));
            }
        });
    } else {
        let emptyCart = document.getElementById('empty-cart');
        emptyCart.innerHTML = "Ваш список замовлень пустий";
    }
}

