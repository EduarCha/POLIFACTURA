import { auth } from '../../script/firebase.js'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"

export function validarLogin() {
    onAuthStateChanged(auth, async (user) => {
        if (user) { // Verifica si el usuario está autenticado
            userEmailValue = user.email; // Obtiene el correo electrónico del usuario
            userEmail.textContent = userEmailValue; // Actualiza el contenido del elemento HTML
        } else {
            userEmail.textContent = 'Usuario no logueado'; // Maneja el caso de usuario no autenticado
            await signOut(auth)
            window.location.href = '../index.html'
        }
    });
}