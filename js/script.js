
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
selectContact.addEventListener('click', function () {
  var loop
  let work = document.querySelectorAll('.work')
  for (loop = 0; loop < work.length; loop++) {
    if (!work[loop].classList.contains('active')) {
      work[loop].classList.add('active')
    } else {
      work[loop].classList.remove('active')
    }
  }
})
let preloader = document.querySelector('.preloader')

// function fileSelected(event) {
//   console.log(event.target.files)
//   let fileName = event.target.files[0]?.length
//   fileName = fileName + ""
//   //Verificar se existe comprimento no vetor files -> event.target.files
//   //Percorrer o vetor e capturar o nome e concatenar em uma string
//   if(fileName > 1){
//     document.querySelector('label[for="fileUpload"').innerText = fileName
//   }
// }
//document.getElementById('fileUpload').addEventListener('change', fileSelected)
