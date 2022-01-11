let navbar = document.querySelector('.header .navbar')

document.querySelector('#nav-open').onclick = () => {
  navbar.classList.add('active')
}
document.querySelector('#nav-close').onclick = () => {
  navbar.classList.remove('active')
}
window.onscroll = () => {
  navbar.classList.remove('active')
  if (window.scrollY > 0) {
    document.querySelector('.header').classList.add('active')
  } else {
    document.querySelector('.header').classList.remove('active')
  }
}
window.onload = () => {
  navbar.classList.remove('active')
  if (window.scrollY > 0) {
    document.querySelector('.header').classList.add('active')
  } else {
    document.querySelector('.header').classList.remove('active')
  }
}
var swiper = new Swiper('.clients-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  autoplay: {
    delay: 2000
  },
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 0,
    modifier: 1,
    slideShadows: true
  },
  loop: true
})

var swiper = new Swiper('.swiper-container', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  autoplay: {
    delay: 2000
  },
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 0,
    modifier: 1,
    slideShadows: true
  },
  loop: true
})
let selectContact = document.querySelector('#selectContact')
selectContact.addEventListener("click", function () {
	let contact = document.querySelector('.contact .form .work')
	contact.classList.toggle('active')
})