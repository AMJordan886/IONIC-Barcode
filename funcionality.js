// ERRORES A SOLUCIONAR:
//quedaria darle color a los ion content            HABRIA QUE MEJORARLO
//MINIMO HAY QUE ENVIAR UNO
//UNA OPCION SERIA QUE MANDASE EL ALERT SOLO AL DARLE A COMPROBAR

const d = document;
let $first = d.querySelector(`#first_input`),
    $second = d.querySelector(`#second_input`),
    $third = d.querySelector(`#third_input`),
    $checkButton = d.querySelector(`#checkButton`),
    firstLabel = d.querySelector(`#first_item`),
    secondLabel = d.querySelector(`#second_item`),
    thirdLabel = d.querySelector(`#third_item`),
    $reload = d.querySelector(`#reload`),
    $stadistics = d.querySelector('#stats-chart'),
    sumInterval = 0;



const presentAlert = () => {
    const alert = d.createElement('ion-alert');
    //alert.cssClass = 'mycustomclass';
    alert.header = 'Los datos no coinciden\n';
    alert.subHeader = 'Por favor, verifiquelos.\n';
    alert.message = `Pulse cancelar para introducir manualmente. <br> Refrescar para recargar la aplicacion. <br> Enviar para subir a la base de datos.`;
    alert.buttons = ['Cancelar',
        {
            text: 'Refrescar',
            handler: () => {
                location.reload();
            }
        }/* ,
        {
            text: 'Enviar',
            handler: () => {
                //BACKEND
                location.reload();
            }
        } */
    ];
    d.body.appendChild(alert);
    return alert.present();
}

const inactivityAlert = () => {
    const alert = d.createElement('ion-alert');
    alert.header = 'Aplicación detenida';
    alert.message = 'La aplicación se detiene tras dos horas de inactividad. Por favor, refresque para comenzar de nuevo.'; 
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

/* BOTON COMPROBAR */
$checkButton.addEventListener("click", (e) => {
    if ($first.value !== '' && $second.value !== '' 
    || $second.value !== '' && $third.value !== '' 
    || $first.value  !== '' && $third.value !== '' 
    || $second.value !== '' && $first.value !== '') {
        //BACKEND
        console.log('enviando...', $first.value, $second.value, $third.value);
    } else {
        presentAlert();
    }
});


// BOTON RECARGAR
$reload.addEventListener("click", (e) => {
    if (e.target) {
        location.reload();
    }
});


function verifyContent() {
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
        } if ($second.value > '1' && $first.value !== $second.value) {
            secondLabel.style.boxShadow = "0px 0px 20px 1px #FF0000"; //ROJO
            clearInterval(secondInputInterval);
            setThirdFocus();
        }
    }, 1000);

    let thirdInputInterval = setInterval(() => {
        if ($second.value > '1' && $second.value == $third.value) {
            checkThirdInput();
        } if ($third.value > '1' && $second.value !== $third.value) {
            thirdLabel.style.boxShadow = "0px 0px 20px 1px #FF0000"; //ROJO
            clearInterval(thirdInputInterval);
        } if ($second.value !== $third.value && $third.value == $first.value) {
            thirdLabel.style.boxShadow = "0px 0px 20px 1px #00FF1F"; //VERDE
            clearInterval(thirdInputInterval);
        } if ($third.value > '1' && $second.value == $third.value && $first.value !== $third.value) {
            secondLabel.style.boxShadow = "0px 0px 20px 1px #00FF1F"; //VERDE
            firstLabel.style.boxShadow = "0px 0px 20px 1px #FF0000"; //ROJO
            clearInterval(thirdInputInterval);
        } if ($third.value > '1' && $first.value !== $second.value && $second.value !== $third.value && $first.value !== $third.value) {
            firstLabel.style.boxShadow = "0px 0px 20px 1px #FF0000"; //ROJO
            clearInterval(thirdInputInterval);
        }
    }, 1000);



    function checkFirstInput() {
        clearInterval(firstInputInterval);
        setSecondFocus();
        firstLabel.style.boxShadow = "0px 0px 20px 1px #00FF1F"; //VERDE
    }
    function checkSecondInput() {
        clearInterval(secondInputInterval);
        setThirdFocus();
        secondLabel.style.boxShadow = "0px 0px 20px 1px #00FF1F"; //VERDE
    }
    function checkThirdInput() {
        clearInterval(thirdInputInterval);
        thirdLabel.style.boxShadow = "0px 0px 20px 1px #00FF1F"; //VERDE
    }
}
verifyContent()