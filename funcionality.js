// ERRORES A SOLUCIONAR:
// UNA VEZ SE LIMPIA EL CLEAR INTERVAL SE JODIO. YA HAY QUE REFRESCAR TODO
//quedaria darle color a los ion content
//que genere un check verification nada mas en vez de tres?
//al darle al ok del alert que refresque la pagina
//Se podria quitar el checking de error ya que hay un alert ya
//bordear los inputs en verde o rojo si no funcionan
//boton comprobar codigos aunque sean dos y que ese boton envie los datos

const d = document;
let $first = d.querySelector(`#first_input`),
    $second = d.querySelector(`#second_input`),
    $third = d.querySelector(`#third_input`),
    $checkText = d.querySelector(`#checkText`),//...
    $checking,//...
    sumInterval = 0;
let firstLabel = d.querySelector(`#first_item`),
    secondLabel = d.querySelector(`#second_item`),
    thirdLabel = d.querySelector(`#third_item`);

/* const createVerification = () => {
    const ionCard = d.createElement('ion-card'),
        ionCardContent = d.createElement('ion-card-content');
    ionCardContent.textContent = $checking + ``;
    ionCard.appendChild(ionCardContent);
    $checkText.appendChild(ionCard);
} */

const presentAlert = () => {
    const alert = d.createElement('ion-alert');
    alert.header = 'Los datos no coinciden';
    alert.subHeader = 'Por favor verifique los datos';
    alert.message = 'Pulse cancelar para introducir manualmente. \n Refrescar para recargar la aplicacion. \n Enviar para subir a la base de datos.';
    //
    //Meter un alert con tres botones        cancelar, refrescar y enviar
    alert.buttons = [
        {
            text: 'Cancelar',
            handler: () => {
                checkFirstInput();
                //aqui me tiene que dejar introducir a mano y que no me ponga en negro los inputs
            }
        },
        {
            text: 'Refrescar',
            handler: () => {
                location.reload();
            }
        },
        {
            text: 'Enviar',
            handler: () => {
                //POST AJAX
            }
        }
    ];
    d.body.appendChild(alert);
    return alert.present();
}

const inactivityAlert = () => {
    const alert = d.createElement('ion-alert');
    alert.header = 'Aplicación detenida';
    alert.message = 'La aplicación se detiene tras dos horas de inactividad. Por favor, refresque para comenzar de nuevo.'; //PONER EN EL SEGUNDO IF DE FIRSTINPUTINTERVAL 7200 PARA QUE SEAN DOS HORAS
    alert.buttons = [
        {
            text: 'Ok',
            handler: () => {
                location.reload();
            }
        }];
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
        } if (sumInterval == 7200) {
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
            secondLabel.style.boxShadow = "0px 0px 20px 1px #FF0000";
            //createVerification();
            clearInterval(secondInputInterval);
            presentAlert();
        }
    }, 1000);

    let thirdInputInterval = setInterval(() => {
        if ($second.value > '1' && $second.value == $third.value) {
            checkThirdInput();
        } if ($third.value > '1' && $second.value != $third.value) {
            $checking = `Los codigos insertados no son iguales`;
            thirdLabel.style.boxShadow = "0px 0px 20px 1px #FF0000";
            //createVerification();
            clearInterval(thirdInputInterval);
            presentAlert();
        }
    }, 1000);





    function checkFirstInput() {
        clearInterval(firstInputInterval);
        setSecondFocus();
        //$checking = "Primer valor añadido";
        //firstLabel.style.borderColor = '#00FF1F';
        firstLabel.style.boxShadow = "0px 0px 20px 1px #00FF1F";
        //createVerification();
    }
    function checkSecondInput() {
        clearInterval(secondInputInterval);
        setThirdFocus();
        //$checking = "Segundo valor añadido";
        //secondLabel.style.borderColor = '#00FF1F';
        secondLabel.style.boxShadow = "0px 0px 20px 1px #00FF1F";
        //createVerification();
    }
    function checkThirdInput() {
        clearInterval(thirdInputInterval);
        //$checking = "Los codigos introducidos coinciden";
        //thirdLabel.style.borderColor = '#00FF1F';
        thirdLabel.style.boxShadow = "0px 0px 20px 1px #00FF1F";
        //createVerification();
    }
}
verifyContent()

//544654654654654