// menadżerowanie burgera i otwieranie bocznego menu

const hamburger = document.querySelector('.hamburger')
const menu = document.querySelector('.nav__menu')
const linksMobile = document.querySelectorAll('.nav__menu--link')

const manageNav = () => {
    hamburger.classList.toggle('is-active')
    menu.classList.toggle('active')
}

linksMobile.forEach(link => link.addEventListener('click', () => manageNav()))
hamburger.addEventListener('click', () => manageNav())