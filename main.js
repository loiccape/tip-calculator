let tipAmountPerPerson = 0;
let totalToPay = 0;
let tipPercentage = 0;
let numberOfPerson = 0;

const tipPerPerson = document.getElementById("tipPerPerson");
const total = document.getElementById("total");
const billInput = document.getElementById("bill");
const buttons = document.querySelectorAll(".btn");
const customInput = document.getElementById("custom");
const numberOfPersonInput = document.getElementById("people");
const resetButton = document.getElementById("resetButton");
const errorMessage = document.getElementById('errorMessage');
resetButton.addEventListener("click", handleResetButton);

buttons.forEach((element) => {
    element.onclick = () => {

        handleButtonClick(element.id);
        changeBackgroundColorOnSelect(element)
    }
});

numberOfPersonInput.value = 0
billInput.value = 0

validateInput()
function validateInput() {
    if (parseInt(numberOfPersonInput.value) === 0) {

        errorMessage.innerText = "Can't be zero"
        errorMessage.style.display = "block"
    } else if (parseInt(numberOfPersonInput.value) < 0){
errorMessage.innerText = "Can't be negativ number"
        errorMessage.style.display = "block"
    } 
    else {
        errorMessage.style.display = 'none';
    }
}

  
  numberOfPersonInput.addEventListener('input', validateInput);

function handleButtonClick(buttonId) {
    tipPercentage = parseFloat(buttonId);
    calculateTotal();
}

function handleInputChange(event, type) {
    resetAllButtonsBackgroundColor()
    const value = parseFloat(event.target.value);
    if (isNaN(value) || value <= 0) return;

    switch (type) {
        case 'bill':
            totalToPay = value;
            break;
        case 'customTip':
            tipPercentage = value;
            break;
        case 'people':
            numberOfPerson = value;
            validateInput()
            break;
    }
    calculateTotal();
}

billInput.onchange = (event) => handleInputChange(event, 'bill');
customInput.onchange = (event) => handleInputChange(event, 'customTip');
numberOfPersonInput.onchange = (event) => handleInputChange(event, 'people');

function calculateTotal() {
    if (numberOfPerson > 0) {
        // Calcul du montant total du pourboire
        const totalTip = (totalToPay * tipPercentage) / 100;

        // Calcul du montant total à payer par tous
        const grandTotal = totalToPay + totalTip;

        // Calcul du montant que chaque personne doit payer
        const totalPerPerson = grandTotal / numberOfPerson;
        tipAmountPerPerson = totalTip / numberOfPerson;

        // Met à jour l'affichage
        tipPerPerson.innerText = "$" + tipAmountPerPerson.toFixed(2); // Pourboire par personne
        total.innerText = "$" +totalPerPerson.toFixed(2); // Total à payer par personne
    } else {
        tipPerPerson.innerText = "0.00";
        total.innerText = "0.00";
    }
}

function handleResetButton() {
    console.log("fonction reset");
    
    // Réinitialisation des variables
    tipAmountPerPerson = 0;
    totalToPay = 0;
    tipPercentage = 0;
    numberOfPerson = 1;

// Réinitialisation de l'affichage des résultats
tipPerPerson.innerText = (0).toFixed(2); // Affiche "0.00"
total.innerText = (0).toFixed(2);        // Affiche "0.00"

    // Réinitialisation des champs de saisie
    billInput.value = "";
    customInput.value = "";
    numberOfPersonInput.value = "";

    // Réinitialisation des couleurs des boutons de pourboire
    resetAllButtonsBackgroundColor();
}



function changeBackgroundColorOnSelect(button) {
    resetAllButtonsBackgroundColor()
    button.style.backgroundColor = "#26C2AE"
    button.style.color = "#00474B"
}

function resetAllButtonsBackgroundColor() {
    buttons.forEach((element) => {
        element.style.backgroundColor = "#00474B"
        element.style.color = "white"
    })
}