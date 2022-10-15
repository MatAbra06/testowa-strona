const mainColor = '#0071db'

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

// menadżerowanie scrollem i rozwijaniem/zwijaniem się nawigacji

const nav = document.querySelector('.nav')
const navDesktop = document.querySelector('.nav__desktop')
const logoDesktop = document.querySelector('.nav__desktop--logo')
const links = document.querySelectorAll('.nav__desktop--link')

const navMobile = document.querySelector('.nav__mobile')
const logoMobile = document.querySelector('.nav__mobile--logo')

const ejectNav = () => {
    if(scrollY > 1){
        nav.style.backgroundColor = mainColor
        navDesktop.style.padding = '0'
        logoDesktop.setAttribute('src', './dist/img/logo2-min.png')
        logoDesktop.style.transform = 'scale(0.7)'
        links.forEach(el => {
            el.style.color = "#fff"
            el.addEventListener('mouseover', () =>  el.style.color = '#000')
            el.addEventListener('mouseleave', () =>  el.style.color = '#fff')
        })

        navMobile.style.padding = '0 2rem'
        logoMobile.setAttribute('src', './dist/img/logo2-min.png')
        logoMobile.style.transform = 'scale(0.7)'
        logoMobile.style.transformOrigin = 'left'
        hamburger.classList.add('hamburger-active')

    }else{
        nav.style.backgroundColor = '#ffffff00'
        navDesktop.style.padding = '2rem 0'
        logoDesktop.setAttribute('src', './dist/img/logo-min.png')
        logoDesktop.style.transform = 'scale(1)'
        links.forEach(el => {
            el.style.color = "#000"
            el.addEventListener('mouseover', () =>  el.style.color = mainColor)
            el.addEventListener('mouseleave', () =>  el.style.color = '#000')
        })

        navMobile.style.padding = '2rem'
        logoMobile.setAttribute('src', './dist/img/logo-min.png')
        logoMobile.style.transform = 'scale(1)'
        hamburger.classList.remove('hamburger-active')
    }
}

window.addEventListener('scroll', () => ejectNav())

// observer (sekcja "w liczbach")

const section = document.querySelector('.incounts')

const number = document.querySelectorAll(".number");
const divs = document.querySelectorAll(".invisible");
let delay = 0;

const callback = (entry) => {

	if (entry[0].isIntersecting) {
		divs.forEach((div) => {

			const counter = () => {
				const finalNumber = div.getAttribute("data-number");
				const value = parseFloat(div.textContent);
				const speed = finalNumber / 451;

				if (value < finalNumber) {
                    div.previousElementSibling.children[0].textContent = Math.floor(value + speed)
					// div.previousElementSibling.textContent = Math.floor(value + speed)
					div.textContent = value + speed;
					setTimeout(counter,1)
				} else {
					div.textContent = finalNumber;
				}
			};
			counter()
		});
	}
};

const options = {
    rootMargin: '-50px'
}

const observer = new IntersectionObserver(callback, options)
observer.observe(section)

// formularz kontaktowy

const form = document.getElementById('form')
const inputName = document.getElementById('name')
const inputEmail = document.getElementById('email')
const inputTopic = document.getElementById('topic')
const textareaMessage = document.getElementById('msg')
const btnSend = document.getElementById('btn-send')

let error = 0

const inputs = [inputName, inputEmail, inputTopic, textareaMessage]

textareaMessage.nextElementSibling.style.marginTop = '0'

form.addEventListener('submit', (e) => {
    inputs.forEach(el => {
        if(el.value === ''){
            error++
            el.nextElementSibling.style.display = 'block'
            el.nextElementSibling.textContent = 'To pole nie może być puste!'
        }else{
            el.nextElementSibling.style.display = 'none'
            checkEmail(inputEmail)
        }
    })

    if(error > 0){
        e.preventDefault()
    }
    error = 0
})

const checkEmail = (input) => {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(re.test(input.value)){
        input.nextElementSibling.style.display = 'none'
    }else{
        input.nextElementSibling.style.display = 'block'
        input.nextElementSibling.textContent = 'Podaj prawidłowy adres email!'
        error++
    }
};