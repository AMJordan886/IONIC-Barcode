// ERRORES A SOLUCIONAR:
//quedaria darle color a los ion content            HABRIA QUE MEJORARLO
//MINIMO HAY QUE ENVIAR UNO
//UNA OPCION SERIA QUE MANDASE EL ALERT SOLO AL DARLE A COMPROBAR

const { default: axios } = require("axios");


//AXIOS + ASYNC AWAIT

import {
    IonButton,
    IonList,
    IonItem
  } from '@ionic/react';
  
  import axios from 'axios'; 


// FALTA DEFINIR Y QUIZA LLAMAR AL SCRIPT EN EL INDEX
// https://efficientcoder.net/send-http-get-request-for-consuming-a-rest-api-with-axios-in-ionic-app-based-on-typescript-and-react-hooks/
//const  apiKEY  =  "<YOUR_API_KEY_HERE>";
//const  endpoint  =  `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;
//In the end of document is the function



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
    const $form = d.querySelector(".post-form");



const presentAlert = () => {
    const alert = d.createElement('ion-alert');
    //alert.cssClass = 'mycustomclass';
    alert.header = 'Los datos no coinciden\n';
    alert.subHeader = 'Por favor, verifíquelos.\n';
    alert.message = `Pulse cancelar para introducir manualmente. <br> Refrescar para recargar la aplicacion. <br> Enviar para subir a la base de datos.`;
    alert.buttons = ['Cancelar',
        {
            text: 'Refrescar',
            handler: () => {
                location.reload();
            }
        },
        {
            text: 'Enviar',
            handler: () => {
                //BACKEND
                axiosPost();
                //location.reload();
            }
        }
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

/* BOTON ENVIAR */
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




//Post axios
/* const $form = d.querySelector(".form");
const firstinputsend = d.querySelector("#first_input");

d.addEventListener("submit", async (e) => {
    if (e.target === firstinputsend) {
        console.log("hola hola");
    }
}) */




//Post -- AXIOS + Async Await
    d.addEventListener("submit", async (e) => {
        if (e.target === $form) {
            
        try {
            let options = {
                method: "POST",
                headers: { "Content-type": "application/json; charset=utf-8" },
                data: JSON.stringify({
                    first: $first.value,
                    second: $second.value,
                    third: $third.value,
                }),
            };
            let res = await axios("YOUR ENDPOINT", options),
                json = await res.data;

                console.log("hooasdf")
            }            
    
        catch (err){
            console.log(`Error de envío: `, err.response);
            let message = err.response.statusText || "Ocurrió un error";
            console.log(message);
        }
    
        finally {
           console.log("Function Post enabled!") 
        }





        }
    })
//axiosPost();
