const $axiosAsync = document.getElementById('data'),
    $reload = document.querySelector(`#reload`),
    $fragment = document.createDocumentFragment();

async function getData() {
    try {
        let res = await axios.get("http://localhost:5555/database"),
            json = await res.data;

        console.log(res)
        console.log(json)


        json.forEach((el) => {
            const $li = document.createElement("ion-col");
            $li.innerHTML = `${el.first} -- ${el.second} -- ${el.third}`;
            $fragment.appendChild($li);
        }) 
        $axiosAsync.appendChild($fragment);
       


    }
    catch (err) {
        console.log("Se ha producido un error de axios async: ", err.response, err.status, err.statusText, err.status);
        //onsole.log(err.response.data);
        //console.log(err.response.status);
        //console.log(err.response.headers);
        let message = err.statusText || "Ocurrió un error"; //response es un metodo de axios diferente a los anteriores
        $axiosAsync.innerHTML = `Error: ${err.status}: ${message}`;
    }
    finally {
        console.log("Función cargada.")
    }

}

document.addEventListener("DOMContentLoaded", getData());


// BOTON RECARGAR
$reload.addEventListener("click", (e) => {
    if (e.target) {
        location.reload();
    }
});