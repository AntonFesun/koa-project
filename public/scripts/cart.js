let cart = JSON.parse(window.localStorage.getItem('cart'));
const deleteCart = document.getElementById('delete-all');
const buy = document.getElementById('buy');

renderGlasses();

deleteCart.onclick = function (event) {
    let wrapper = document.getElementsByClassName('wrapper')[0];
    wrapper.innerHTML = "";
    cart = [];
    window.localStorage.removeItem('cart');
};

buy.onclick = function (event) {
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
    const glassesWrapper = document.getElementsByClassName('wrapper')[0];
    cart.forEach((el) => {
        let itemGlasses = document.createElement('div');
        let glassesName = document.createElement('span');
        let glassesId = document.createElement('span');
        let glassesImg_1 = document.createElement('img');
        let glassesImg_2 = document.createElement('img');
        let glassesImg_3 = document.createElement('img');

        itemGlasses.classList.add('item-glasses');
        glassesName.innerHTML = el.name;
        glassesId.innerHTML = el.id;
        glassesImg_1.setAttribute('src', el.foto_1);
        glassesImg_2.setAttribute('src', el.foto_2);
        glassesImg_3.setAttribute('src', el.foto_3);
        itemGlasses.appendChild(glassesName);
        itemGlasses.appendChild(glassesId);
        itemGlasses.appendChild(glassesImg_1);
        itemGlasses.appendChild(glassesImg_2);
        itemGlasses.appendChild(glassesImg_3);
        glassesWrapper.appendChild(itemGlasses);
    });
}

