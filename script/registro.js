// Form de registro 
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from './firebase.js';
import { showAlert } from './showAlert.js';
import { hideAlert } from './showAlert.js';

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = signupForm['inputEmail4'].value;
    const password = signupForm['inputPassword4'].value;
    const termsAccepted = signupForm['termsCheck'].checked;
    const privacyAccepted = signupForm['privacyCheck'].checked;

    hideAlert();

    if (!termsAccepted || !privacyAccepted) {
        showAlert('Debes aceptar los términos y condiciones y la política de tratamiento de datos');
        return;
    }

    if (!isValidEmail(email)) {
        showAlert('Por favor, ingrese un correo electrónico válido');
    } else if (!isValidPassword(password)) {
        showAlert('La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número');
    } else {
        try {
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials);

            const modalR = document.querySelector('#registrarse');
            const modal = bootstrap.Modal.getInstance(modalR);
            modal.hide();
        } catch (error) {
            console.log(error.message);
            console.log(error.code);

            if (error.code === 'auth/email-already-in-use') {
                showAlert("Correo ya en uso");
            } else if (error.code === 'auth/invalid-email') {
                showAlert("Correo invalido"); 
            } else if (error.code === 'auth/weak-password') {
                showAlert("Contraseña muy debil, ");
            } else if (error.code) {
                showAlert("Algo salio mal, Error (" + error.code + ") Toma foto y comunicate con soporte"); 
            }
        }
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}
