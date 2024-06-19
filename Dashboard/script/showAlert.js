
//función alerta
export function showAlert(message) {
    document.getElementById("alert-message").innerHTML = message;
    document.getElementById("custom-alert").style.display = "flex";
   
}

export function hideAlert(){
    // Evento para ocultar la alerta cuando se hace clic en "Aceptar"
    document.getElementById('alert-ok-button').addEventListener('click', function () {
        document.getElementById("custom-alert").style.display = "none";
    });
}

