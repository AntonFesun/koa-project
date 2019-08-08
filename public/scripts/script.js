const doc = document;
const storage = window.localStorage;
let toCartButtons = doc.querySelectorAll('[data-id]');
let storageCart = [];
storageCart = JSON.parse(storage.getItem('cart'));
let quantity = 0;
let counter = doc.getElementById('counter');
counter.innerText = '0';
let summOfGlasses = 0;
storageCart.forEach(el => {
    summOfGlasses += el.quantity;
    console.log(summOfGlasses);
});
counter.innerText = summOfGlasses;

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
            storage.setItem('cart', JSON.stringify(storageCart));
        } else {
            storageCart.forEach((el) => {
                if (el.id === event.target.dataset.id) {
                    ++el.quantity;
                }
            });
            storage.setItem('cart', JSON.stringify(storageCart));
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
    }
}

for (let i = 0; i < toCartButtons.length; i++) {
    toCartButtons[i].onclick = addToCart;
}