import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import WebSocketInitiator from './utils/websocket-initiator';
import CONFIG from './globals/config';

const app = new App({
    content: document.querySelector('#mainContent')
});

window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
    swRegister();
    WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});


//hamburger

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".drawer-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu(event) {
    event.preventDefault();
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

//navlink
const navLink = document.querySelectorAll(".drawer-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}