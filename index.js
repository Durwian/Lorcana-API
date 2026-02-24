
let url = 'https://api.lorcana-api.com/cards/fetch?displayonly=Set_Num;Set_Name;name;image;set_num;card_num;body_text;color';
let allCards = [];
let selectedSet = "";
let selectedColor = "";

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

    let table = "";
    let cartesFiltrades = allCards.filter(card => 
        (setSeleccionat === "" || card.Set_Name === setSeleccionat) &&
        (colorSeleccionat === "" || card.Color === colorSeleccionat)
    );

    for(let card of cartesFiltrades){
        table += `
            <tr>
                <td>${card.Card_Num}</td>
                <td><img src="${card.Image}" width="100"></td>
                <td>${card.Name}</td>
                <td>${card.Body_Text ?? ""}</td>
            </tr>
        `;
    }
    document.getElementById('data').innerHTML = table;
}

document.getElementById('sets').addEventListener('change', function() {
    selectedSet = this.value;
    mostrarTaula(selectedSet, selectedColor);
});

document.getElementById('colors').addEventListener('change', function() {
    selectedColor = this.value;
    mostrarTaula(selectedSet, selectedColor);
});
        
