let doc = document;
let updateButtonGlasses = document.getElementById('update');

updateButtonGlasses.onclick = function (event) {
    event.preventDefault();
    const id = event.srcElement.dataset.id;
    let object = {
        mongoId: id,
        name: doc.getElementById('name').value,
        id: doc.getElementById('id').value,
        type: doc.getElementById('type').value,
        sex: doc.getElementById('sex').value,
        shape: doc.getElementById('shape').value,
        colorOfGlass: doc.getElementById('lenscolor').value,
        gradient: doc.getElementById('gradient').value,
        lenstype: doc.getElementById('lenstype').value,
        colorOfFrame: doc.getElementById('color').value,
        material: doc.getElementById('material').value,
        price: doc.getElementById('price').value,
        description: doc.getElementById('description').value,
        quantity: doc.getElementById('quantity').value,
    };
    const editedGlass = toFormData(object);
    return fetch(`/edit`, {
        method: "put",
        body: editedGlass
    })
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        })
};

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