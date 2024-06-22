import './registro.js'
import { showAlert } from './showAlert.js'
import { hideAlert } from './showAlert.js'
import { auth } from './firebase.js'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"


onAuthStateChanged(auth, async (user) => {
    if (user && user.email) {
        // Haz algo con user.email aquí
        window.location.href = 'Dashboard/index.html'
        showAlert("Usuario autenticado " + user.email)//Validar si esta logeado
    } else {
        showAlert('Se serro la sesión')//Validar si esta logeado
        hideAlert()
        // Manejar el caso en el que user o user.email no están definidos
    }

})


document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-button');
    const forgotPasswordLink = document.getElementById('forgot-password');

    //ation login
    loginButton.addEventListener('click', async function () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // Aquí puedes realizar la lógica de validación y autenticación

        hideAlert()

        if (!isValidEmail(email)) {
            showAlert('Por favor, ingrese un correo electrónico válido');
        } else if (!isValidPassword(password)) {
            showAlert('La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número');
        } else {

            try {
                const Credentials = await signInWithEmailAndPassword(auth, email, password)
                window.location.href = 'Dashboard/index.html';
                showAlert('Inicio de sesión exitoso' + Credentials);
            } catch (error) {
                if (error.code === 'auth/wrong-password') {
                    showAlert('Contraseña incorecta');
                } else if (error.code === 'auth/user-not-found') {
                    showAlert('Correo electonico no registrado');
                } else {
                    showAlert('Fallo inicio de sesión error ' + error.code);
                }
            }
        }
    });

    forgotPasswordLink.addEventListener('click', function () {
        showAlert('Funcionalidad de recuperación de contraseña aún no implementada');
    });

});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}


//validar boton selecionado
document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('#buttonGroup .btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove the outline class from all buttons
            buttons.forEach(btn => {
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-outline-secondary');
            });
            // Add the outline class to the clicked button
            button.classList.remove('btn-outline-secondary');
            button.classList.add('btn-secondary');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const btnAdm = document.getElementById('btnAdm');
    const btnPos = document.getElementById('btnPos');
    const container1 = document.getElementById('container1');
    const container2 = document.getElementById('container2');

    btnAdm.addEventListener('click', function () {
        container1.classList.add('active');
        container2.classList.remove('active');
    });

    btnPos.addEventListener('click', function () {
        container2.classList.add('active');
        container1.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const togglePasswordIcon = document.querySelector('.toggle-password');
    togglePasswordIcon.addEventListener('click', function () {
        const passwordInput = document.getElementById('password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordIcon.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            togglePasswordIcon.textContent = '👁️';
        }
    });
});


//funcion login cajero
document.addEventListener('DOMContentLoaded', function () {
    // Datos simulados como si vinieran de una base de datos
    const usuarios = [
        { rol: 'cajero', numDocumento: '123456', pin: '1234' },
        { rol: 'admin', numDocumento: '789012', pin: '5678' },
        // Agrega más usuarios según sea necesario
    ];

    const numDocumentoField = document.getElementById('numDocumento');
    const pinField = document.getElementById('pin');
    const rolField = document.getElementById('inputState');
    const loginButton = document.getElementById('login-button-p');

    loginButton.addEventListener('click', function () {
        const numDocumento = numDocumentoField.value.trim();
        const pin = pinField.value.trim();
        const rol = rolField.value;

        // Validar campos vacíos
        if (numDocumento === '' || pin === '') {
            alert('Por favor, ingrese su número de documento y PIN.');
            return;
        }

        // Validar rol seleccionado
        const usuarioEncontrado = usuarios.find(user => user.rol === rol && user.numDocumento === numDocumento && user.pin === pin);

        if (usuarioEncontrado) {
            // Redirigir al usuario a home/index.html
            window.location.href = 'home/index.html';
        } else {
            alert('Los datos ingresados no son válidos. Por favor, verifique y vuelva a intentarlo.');
        }
    });
});
