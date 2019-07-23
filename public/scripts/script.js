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
        quantity: doc.getElementById('quantity').value
    };
    saveNewGlasses(object);
};

let deleteButtons = doc.getElementsByClassName('delete');
for(let i = 0; i < deleteButtons.length; i++) {
    (function(){
        deleteButtons[i].onclick = deleteGlass;
    }());
}

function saveNewGlasses(newGlassObject) {
    return fetch('glass', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "post",
        body: JSON.stringify(newGlassObject)
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
