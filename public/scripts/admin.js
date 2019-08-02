let doc = document;
let saveButtonGlasses = doc.getElementById('save');
saveButtonGlasses.onclick = function (event) {
    event.preventDefault();
    let object = {
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
        foto_1: doc.getElementById('foto_1').files[0],
        foto_2: doc.getElementById('foto_2').files[0],
        foto_3: doc.getElementById('foto_3').files[0],
    };
    let formD = toFormData(object);
    saveNewGlasses(formD);
};

let deleteButtons = doc.getElementsByClassName('delete');
for(let i = 0; i < deleteButtons.length; i++) {
    (function(){
        deleteButtons[i].onclick = deleteGlass;
    }());
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

function saveNewGlasses(newGlassObject) {
    return fetch('glass', {
        method: "post",
        body: newGlassObject
    })
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        })
}

function deleteGlass(event) {
    const id = event.target.id;
    console.log(id);
    return fetch(`deleteGlass/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "delete",
        body: JSON.stringify({_id: id})
    })
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        })
}

function editGlass(event, editedGlass) {
    const id = event.target.id;
    console.log(id);
    return fetch(`edit/${id}`, {
        method: "post",
        body: editedGlass
    })
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        })
}
