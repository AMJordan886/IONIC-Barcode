// ERRORES A SOLUCIONAR:
// SOLO COMPARA NUMEROS     // $first.value > "1" en vez de  > 1
// NO DA TIEMPO A INGRESAR EL PRIMER VALOR, DEBERIA HABER MAS DELAY EN EL SETINTERVAL O QUE COJA UN EVENTO PORQUE SI ESTÁ OYENDO Y LE QUEDA MENOS DE UN SEGUNDO APENAS ENTRAN CARACTERES
// UNA VEZ SE LIMPIA EL CLEAR INTERVAL SE JODIO. YA HAY QUE REFRESCAR TODO
// GASTA MUCHA MEMORIA TENER UN INTERVAL CORRIENDO TODO EL RATO
//SOLO COMPARA NUMEROS  //AQUI SE PODRIA METER UN LISTENER DE ALGUN MODO
//lo que me detiene la app cuando falla es el alert por lo que sin el no va bien del todo
//añadir funcionalidad para meter codigos a mano sin interval
//quedaria darle color a los ion content
//que genere un check verification nada mas en vez de tres?

const d = document;
let $first = d.querySelector(`#first_input`),
    $second = d.querySelector(`#second_input`),
    $third = d.querySelector(`#third_input`),
    $checkText = d.querySelector(`#checkText`);
    var $checking;
    
    const createVerification = () => {
    const ionCard = d.createElement('ion-card'),
    ionCardContent = d.createElement('ion-card-content')
    ionCardContent.textContent = $checking + ``;
    ionCard.appendChild(ionCardContent);
    $checkText.appendChild(ionCard);
}



function verifyContent() {
    setFirstFocus()

    function setFirstFocus() {setTimeout(() => {this.first_input.setFocus();}, 200)};
    function setSecondFocus() {setTimeout(() => {this.second_input.setFocus();}, 100)};
    function setThirdFocus() {setTimeout(() => {this.third_input.setFocus();}, 100)};


    let firstInputInterval = setInterval(() => {
        if ($first.value > "1") {
            console.log($first.value)//...
            checkFirstInput();
        }
    }, 1000);

    let secondInputInterval = setInterval(() => {
        if ($first.value > "1" && $first.value == $second.value) {
            checkSecondInput();
        } if ($second.value > "1" && $first.value != $second.value) {
            $checking = `Los codigos insertados no son iguales`;
            createVerification();
            clearInterval(secondInputInterval);
            //alert("Los codigos insertados no son iguales");//...
        }
    }, 1000);

    let thirdInputInterval = setInterval(() => {
        if ($second.value > "1" && $second.value == $third.value) {
            checkThirdInput();
        } if ($third.value > "1" && $second.value != $third.value) {
            $checking = `Los codigos insertados no son iguales`;
            createVerification();
            clearInterval(thirdInputInterval);
            //alert("Los codigos insertados no son iguales");//...
        }
    }, 1000);





    function checkFirstInput() {
        clearInterval(firstInputInterval);
        setSecondFocus();
        $checking = "Primer valor añadido";
        createVerification();
        console.log("Primer valor añadido");
    }
    function checkSecondInput() {
        clearInterval(secondInputInterval);
        setThirdFocus();
        $checking = "Segundo valor añadido";
        createVerification();
        console.log("Segundo valor añadido");
    }
    function checkThirdInput() {
        clearInterval(thirdInputInterval);
        $checking = "Los codigos introducidos coinciden";
        createVerification();
        console.log("Los codigos introducidos coinciden");
    }
}
verifyContent()
//465465465465465
//sdfsadfsadfsadfsadf