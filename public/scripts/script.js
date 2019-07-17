var base;

function loadGoods() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'glasses.json', false);

    xhr.send();

    if (xhr.status !== 200)
        console.error(xhr.responseText);
    else
        base = JSON.parse(xhr.response);

    var doc = document;

    function aceOfBase(obj) {
        if (doc.querySelector('#jsonItems')) {
            var wrapperForGlasses = doc.querySelector("#jsonItems"),
                elements = doc.createElement("a"),
                head = doc.createElement("h5"),
                price = doc.createElement("p"),
                image = doc.createElement("img"),
                description = doc.createElement("p"),
                id = doc.createElement("p"),
                butt = doc.createElement("button");

            head.classList.add("items-glasses-name");
            price.classList.add("items-glasses-price");
            image.classList.add("items-glasses-image");
            description.classList.add("items-glasses-description");
            butt.classList.add("add-to-cart");
            elements.classList.add("items-glasses");
            elements.classList.add("sort");
            elements.setAttribute("data-name", obj.name);
            id.classList.add("items-glasses-id");

            head.innerHTML = obj.name;
            price.innerHTML = 'Ціна: ' + obj.price;
            id.innerHTML = 'ID: ' + obj.id;
            image.src = obj.foto_1;
            description.innerHTML = 'Опис: ' + obj.descript;
            elements.appendChild(head);
            elements.appendChild(price);
            elements.appendChild(id);
            elements.appendChild(image);
            elements.appendChild(description);
            wrapperForGlasses.appendChild(elements);
        }
    }

    function filter(object) {
        if (doc.querySelector('#jsonItems')) {
            var items = doc.querySelector('#jsonItems');

            for (var i = 0; i < object.length; i++) {

                var isType = false,
                    isBrand = false,
                    isSex = false;

                if (items.getAttribute('data-type').length > 0 && items.getAttribute('data-type') === object[i].type) {
                    isType = true;
                } else if (items.getAttribute('data-type').length === 0) {
                    isType = true;
                }

                if (items.getAttribute('data-name').length > 0 && items.getAttribute('data-name') === object[i].name) {
                    isBrand = true;
                } else if (items.getAttribute('data-name').length === 0) {
                    isBrand = true;
                }

                if (items.getAttribute('data-sex').length > 0 && items.getAttribute('data-sex') === object[i].sex) {
                    isSex = true;
                } else if (items.getAttribute('data-sex').length === 0) {
                    isSex = true;
                }

                if (isType && isBrand && isSex) {
                    aceOfBase(base[i]);
                }
            }
        }
    }

    filter(base);

    var divForm = document.querySelector('.designer-info-wrapped-form'),
        jsonWrapper,
        itemsGlasses;

    divForm.onclick = function (event) {
        itemsGlasses = document.querySelector('.items-glasses');
        jsonWrapper = document.querySelector("#jsonItems");
        jsonWrapper.innerHTML = "";


        for (var i = 0; i < base.length; i++) {

            if (event.target.value === base[i].name && jsonWrapper.getAttribute("data-sex") === base[i].sex) {
                aceOfBase(base[i]);
            } else if (event.target.getAttribute("data-sex") === base[i].sex && jsonWrapper.getAttribute("data-sex") === base[i].sex){
                aceOfBase(base[i]);
            }
        }
    }
}
loadGoods();