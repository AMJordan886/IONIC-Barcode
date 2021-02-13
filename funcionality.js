// ERRORES A SOLUCIONAR:
// SOLO COMPARA NUMEROS
// NO DA TIEMPO A INGRESAR EL PRIMER VALOR, DEBERIA HABER MAS DELAY EN EL SETINTERVAL O QUE COJA UN EVENTO PORQUE SI ESTÁ OYENDO Y LE QUEDA MENOS DE UN SEGUNDO APENAS ENTRAN CARACTERES
// UNA VEZ SE LIMPIA EL CLEAR INTERVAL SE JODIO. YA HAY QUE REFRESCAR TODO
// GASTA MUCHA MEMORIA TENER UN INTERVAL CORRIENDO TODO EL RATO
//SOLO COMPARA NUMEROS  //AQUI SE PODRIA METER UN LISTENER DE ALGUN MODO
const d = document;
let $first = d.querySelector(`#first_input`),
    $second = d.querySelector(`#second_input`),
    $third = d.querySelector(`#third_input`),
    $checkText = d.querySelector(`#checkText`);

function verifyContent() {
    setFirstFocus()
    function setFirstFocus() {
        setTimeout(() => {
            this.first_input.setFocus();
        }, 200)
    }
    function setSecondFocus() {
        setTimeout(() => {
            this.second_input.setFocus();
        }, 100)
    }
    function setThirdFocus() {
        setTimeout(() => {
            this.third_input.setFocus();
        }, 100)
    }

    let firstInputInterval = setInterval(() => {
        if ($first.value > 1) {
            checkFirstInput();
        }
    }, 1000);
    let secondInputInterval = setInterval(() => {
        if ($first.value > 1 && $first.value == $second.value) {
            checkSecondInput();
        } if ($second.value > 1 && $first.value != $second.value) {
            alert("Los codigos insertados no son iguales");//...
            clearInterval(secondInputInterval);
        }
    }, 1000);
    let thirdInputInterval = setInterval(() => {
        if ($second.value > 1 && $second.value == $third.value) {
            checkThirdInput();
        } if ($third.value > 1 && $second.value != $third.value) {
            alert("Los codigos insertados no son iguales");//...
            clearInterval(thirdInputInterval);
        }
    }, 1000);

    function checkFirstInput() {
        clearInterval(firstInputInterval);
        setSecondFocus();
        console.log("Primer valor añadido");
    }
    function checkSecondInput() {
        clearInterval(secondInputInterval);
        setThirdFocus();
        console.log("Segundo valor añadido");
    }
    function checkThirdInput() {
        clearInterval(thirdInputInterval);
        console.log("Los codigos añadidos coinciden")
        //$checkText.innerHTML = `<p>Los codigos coinciden</p>`
    }
}
verifyContent()

//numero prueba
//123321321321545