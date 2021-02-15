// ERRORES A SOLUCIONAR:
// NO DA TIEMPO A INGRESAR EL PRIMER VALOR, DEBERIA HABER MAS DELAY EN EL SETINTERVAL O QUE COJA UN EVENTO PORQUE SI ESTÁ OYENDO Y LE QUEDA MENOS DE UN SEGUNDO APENAS ENTRAN CARACTERES
// UNA VEZ SE LIMPIA EL CLEAR INTERVAL SE JODIO. YA HAY QUE REFRESCAR TODO
//añadir funcionalidad para meter codigos a mano sin interval
//quedaria darle color a los ion content
//que genere un check verification nada mas en vez de tres?
//al darle al ok del alert que refresque la pagina
//Se podria quitar el checking de error ya que hay un alert ya
//Borrar los console.log

const d = document;
let $first = d.querySelector(`#first_input`),
    $second = d.querySelector(`#second_input`),
    $third = d.querySelector(`#third_input`),
    $checkText = d.querySelector(`#checkText`);
let $checking, sumInterval = 0;

const createVerification = () => {
    const ionCard = d.createElement('ion-card'),
        ionCardContent = d.createElement('ion-card-content');
    ionCardContent.textContent = $checking + ``;
    ionCard.appendChild(ionCardContent);
    $checkText.appendChild(ionCard);
}

const presentAlert = () => {
    const alert = d.createElement('ion-alert');
    alert.header = 'Los datos no coinciden';
    //alert.subHeader = 'Por favor verifique los datos';
    alert.message = 'Por favor verifique los datos';
    //alert.message = 'Incorrección en los datos';
    alert.buttons = ['Ok'];
    d.body.appendChild(alert);
    return alert.present();
}

const inactivityAlert = () => {
    const alert = d.createElement('ion-alert');
    alert.header = 'Aplicación detenida';
    //alert.subHeader = 'La aplicación se detiene tras dos horas de inactividad';
    alert.message = 'La aplicación se detiene tras dos horas de inactividad. Por favor, refresque para comenzar de nuevo.'; //PONER EN EL SEGUNDO IF DE FIRSTINPUTINTERVAL 7200 PARA QUE SEAN DOS HORAS
    alert.buttons = ['Ok'];
    d.body.appendChild(alert);
    return alert.present();
}



function verifyContent() {                          /***********FUNCION PRINCIPAL***********/
    setFirstFocus()

    function setFirstFocus() { setTimeout(() => { this.first_input.setFocus(); }, 200) };
    function setSecondFocus() { setTimeout(() => { this.second_input.setFocus(); }, 100) };
    function setThirdFocus() { setTimeout(() => { this.third_input.setFocus(); }, 100) };


    let firstInputInterval = setInterval(() => {
        if ($first.value > '1') {
            checkFirstInput();
        } if (sumInterval == 5/*7200 son dos horas*/) {//...
            inactivityAlert();
            clearInterval(firstInputInterval);
        }
        sumInterval++;
    }, 1000);

    let secondInputInterval = setInterval(() => {
        if ($first.value > '1' && $first.value == $second.value) {
            checkSecondInput();
        } if ($second.value > '1' && $first.value != $second.value) {
            $checking = `Los codigos insertados no son iguales`;
            createVerification();
            clearInterval(secondInputInterval);
            presentAlert();
        }
    }, 1000);

    let thirdInputInterval = setInterval(() => {
        if ($second.value > '1' && $second.value == $third.value) {
            checkThirdInput();
        } if ($third.value > '1' && $second.value != $third.value) {
            $checking = `Los codigos insertados no son iguales`;
            createVerification();
            clearInterval(thirdInputInterval);
            presentAlert();
        }
    }, 1000);





    function checkFirstInput() {
        clearInterval(firstInputInterval);
        setSecondFocus();
        $checking = "Primer valor añadido";
        createVerification();
    }
    function checkSecondInput() {
        clearInterval(secondInputInterval);
        setThirdFocus();
        $checking = "Segundo valor añadido";
        createVerification();
    }
    function checkThirdInput() {
        clearInterval(thirdInputInterval);
        $checking = "Los codigos introducidos coinciden";
        createVerification();
    }
}
verifyContent()