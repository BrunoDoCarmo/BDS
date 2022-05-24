const env = {
  BASE_URL: 'https://vivi.infobds.com.br',
  AUTH_USER: 'infobds',
  AUTH_PASS: 'infobds',
  STANDARD_RECEIVER: 'suporte@infobds.com.br',
  SITE_URL: 'infobds.com.br'
}
function renderHtml(
  name,
  message,
  phoneNumber,
  email,
  expertise,
  workExperience,
  renderWork
) {
  return `
              <p>
                  OlÃ¡, ${name} lhe enviou uma mensagem:
                  <br>
                  ${message}.
                  <br>
                  <br>
                  Formas de contato:
                  <br>
                  Fone: <a href="tel:${phoneNumber}" target="_blank" class="email-link">${phoneNumber}.</a>
                  <br>
                  WhatsApp: <a href="https://api.whatsapp.com/send/?phone=${phoneNumber}" target="_blank" class="email-link">${phoneNumber}.</a>
                  <br>
                  E-mail: <a href="mailto:${email}" target="_blank" class="email-link">${email}.</a>
                  <span style="display: ${renderWork ? 'flex' : 'none'}">
                      <br>
                      SolicitaÃ§Ã£o de trabalho:
                      <br>
                      Cargo desejado: ${expertise}.
                      <br>
                      Tempo de experiÃªncia: ${workExperience}.
                      <br>
                      Verificar anexos!
                  </span>
                  <br>
                  <br>
                  <!-- <a href="https://www.infobds.com.br" target="_blank" class="email-link">
                      <div id="logo-bds"></div>
                  </a> -->
                  Atenciosamente, BDS InformÃ¡tica LTDA.
                  <br>
                  SoluÃ§Ãµes em desenvolvimento de sistemas.
                  <br>
                  Fone: <a href="tel:+55443232-6083" target="_blank" class="email-link">(44) 3232-6083.</a>
                  <br>
                  WhatsApp: <a href="https://api.whatsapp.com/send/?phone=5544999728673" target="_blank" class="email-link">(44) 99972-8673.</a>
                  <br>
                  E-mail: <a href="mailto:suporte@infobds.com.br" target="_blank" class="email-link">suporte@infobds.com.br.</a>
                  <br>
                  Website: <a href="https://www.infobds.com.br" target="_blank" class="email-link">www.infobds.com.br.</a>
                  <br>
                  Obrigado por utilizar nossos serviÃ§os.
                  <br>
                  Favor nÃ£o responder este e-mail.
              </p>
          `
}

class Email {
  constructor(
    subject,
    name,
    message,
    phoneNumber,
    email,
    expertise,
    workExperience,
    files
  ) {
    try {
      if (!name) {
        throw new Error('Name not provided!')
      }
      if (!phoneNumber) {
        throw new Error('PhoneNumber not provided!')
      }
      if (!email) {
        throw new Error('Email not provided!')
      }
      this.to = env.STANDARD_RECEIVER
      this.subject = `Entrada de formulÃ¡rio de ${env.SITE_URL}. ${subject}`
      this.cc = ''
      this.html = renderHtml(
        name,
        message,
        phoneNumber,
        email,
        expertise,
        workExperience,
        expertise || workExperience ? true : false
      )
      this.files = files
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  generateFormData() {
    const body = new FormData()
    body.append('to', this.to)
    body.append('subject', this.subject)
    body.append('cc', this.cc)
    body.append('html', this.html)
    body.append('files', this.files)
    if (this.files) {
      if (this.files.length) {
        for (let i = 0; i < this.files.length; i++) {
          body.append('files', this.files[i])
        }
      }
    }
    return body
  }
}
async function authApp() {
  try {
    const requestParams = {
      url: `${env.BASE_URL}/auth`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: env.AUTH_USER,
        password: env.AUTH_PASS
      })
    }
    const response = await fetch(requestParams.url, requestParams)
    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }
    if (!data.token) {
      throw new Error('No token received!')
    }
    return { type: data.type, token: data.token }
  } catch (error) {
    console.log(error)
    return { type: null, token: null }
  }
}
async function sendEmail(email) {
  try {
    const message = document.querySelector('.envio')
    message.childNodes.forEach(el => {
      message.removeChild(el)
    })
    if (!email) {
      throw new Error('E-mail not provided!')
    }
    const { type, token } = await authApp()
    if (!type || !token) {
      throw new Error(
        'NÃ£o foi possÃ­vel autenticar com o serviÃ§o de envio de e-mail, tente novamente mais tarde!'
      )
    }
    const requestParams = {
      url: `${env.BASE_URL}/email/send`,
      method: 'post',
      headers: {
        Authorization: `${type} ${token}`
      },
      body: email.generateFormData()
    }
    const response = await fetch(requestParams.url, requestParams)
    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }
    const messageValid = document.createElement('p')
    messageValid.innerHTML = `
                Seu e-mail foi enviado com sucesso!
                <br>
                Por favor aguarde que entraremos em contato o mais breve possÃ­vel!
                `
    document.body.appendChild(messageValid)
    document.querySelector('.envio').append(messageValid)
    function delay(n) {
      return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000)
      })
    }
    async function myAsyncFunction() {
      document.querySelector('.form').classList.add('active')
      document.querySelector('.envio').classList.add('active')
      await delay(5)
      document.querySelector('.envio').classList.remove('active')
      document.querySelector('.form').classList.remove('active')
    }
    myAsyncFunction()
  } catch (error) {
    console.log(error)
    var message = document.createElement('span')
    message.classList.add()
    message.innerHTML = error.message
    document.querySelector('.envio').append(message)
    function delay(n) {
      return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000)
      })
    }
    async function myAsyncFunction() {
      document.querySelector('.form').classList.add('active')
      document.querySelector('.envio').classList.add('active')
      await delay(5)
      document.querySelector('.envio').classList.remove('active')
      document.querySelector('.form').classList.remove('active')
    }
    myAsyncFunction()
  }
}
function requestEmailSender(event) {
  try {
    event.preventDefault()

    const message = document.querySelector('.preencher')
    if (message.childNodes.length) {
      message.removeChild(message.childNodes[0])
    }
    const form = document.getElementById('email-form')
    if (!form.name.value) {
      throw new Error('Favor informar o seu nome!')
    }
    if (!form.subject.value) {
      throw new Error('Favor informar o assunto!')
    }
    if (!form.phoneNumber.value) {
      throw new Error('Favor informar o seu nÃºmero de telefone!')
    }
    if (!form.email.value) {
      throw new Error('Favor informar o seu e-mail!')
    }
    if (!form.message.value) {
      throw new Error('Favor informar uma mensagem!')
    }

    const emailToSend = new Email(
      form.subject.value,
      form.name.value,
      form.message.value,
      form.phoneNumber.value,
      form.email.value,
      form.expertise.value,
      form.workExperience.value,
      form.files.files
    )
    return sendEmail(emailToSend)
  } catch (error) {
    console.log(error)
    var message = document.createElement('span')
    message.innerHTML = error.message
    document.querySelector('.preencher').append(message)
  }
}
document
  .getElementById('email-form')
  .addEventListener('submit', requestEmailSender)
