
let url = 'https://api.lorcana-api.com/cards/fetch?displayonly=Set_Num;Set_Name;name;image;set_num;card_num;body_text;color';
let allCards = [];
let selectedSet = "";
let selectedColor = "";
let colleccio = JSON.parse(localStorage.getItem("colleccio")) || {};
const getQuantitat = (cardSetNum, cardNum) => {
    const key = `${cardSetNum}-${cardNum}`;
    return colleccio[key] || 0;
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        allCards = data;  
        mostrarData(data);
    })
    .catch(error => console.log(error))

const mostrarData = (data) => {
    console.log(data);
    let nextSet = data[0].Set_Name;
    
    let select = `<option selected>Tots</option>`;
    let select_colors = `<option selected>Tots</option>`;
    let sets_name = [];
    let colors = [];
    for(let i = 0; i < data.length; i++){
        if(sets_name.indexOf(data[i].Set_Name) === -1){
            sets_name.push(data[i].Set_Name);
        }
        if(colors.indexOf(data[i].Color) === -1){
            colors.push(data[i].Color);
        }
    }
    for(let option of sets_name){
        select += `<option value="${option}">${option}</option>`;
    }
    for(let option of colors){
        select_colors += `<option value="${option}">${option}</option>`;
    }
    document.getElementById('sets').innerHTML = select;
    document.getElementById('colors').innerHTML = select_colors;
}
const mostrarTaula = (setSeleccionat, colorSeleccionat) => {

    let html = "";

    let cartesFiltrades = allCards.filter(card => 
        (setSeleccionat === "" || card.Set_Name === setSeleccionat) &&
        (colorSeleccionat === "" || card.Color === colorSeleccionat)
    );

    for(let card of cartesFiltrades){

        html += `
            <div class="col-md-4 mb-4 text-center">
                <div class="card p-2">
                    <img src="${card.Image}" 
                         class="img-fluid"
                         style="cursor:pointer"
                         onclick="mostrarDetall('${card.Card_Num}')">

                    <input type="number" min="0" 
                        value="${getQuantitat(card.Card_Num)}"
                        onchange="actualitzarColleccio('${card.Card_Num}', this.value)"
                        class="form-control mt-2">
                </div>
            </div>
        `;
    }

    document.getElementById('data').innerHTML = html;
}

const mostrarDetall = (cardNum) => {

    let card = allCards.find(c => c.Card_Num == cardNum);

    document.getElementById("modalTitle").textContent = card.Name;
    document.getElementById("modalNumber").textContent = card.Card_Num;
    document.getElementById("modalDescription").textContent = card.Body_Text ?? "";

    let modal = new bootstrap.Modal(document.getElementById('cardModal'));
    modal.show();
}

document.getElementById('sets').addEventListener('change', function() {
    selectedSet = this.value;
    mostrarTaula(selectedSet, selectedColor);
});

document.getElementById('colors').addEventListener('change', function() {
    selectedColor = this.value;
    mostrarTaula(selectedSet, selectedColor);
});
        
const actualitzarColleccio = (cardSetNum, cardNum, quantitat) => {

    const key = `${cardSetNum}-${cardNum}`;
    quantitat = parseInt(quantitat);

    if(quantitat > 0){
        colleccio[key] = quantitat;
    } else {
        delete colleccio[key];
    }

    localStorage.setItem("colleccio", JSON.stringify(colleccio));
}