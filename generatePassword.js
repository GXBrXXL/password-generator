//! Constantes de opçoes de caracteres da senha e barra de segurança
const inputPassword = document.querySelector("#password")
const upperCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")
let passwordLength = 16

function generatePassword() {
  let chars = "abcdefghijkmnpqrstuvwxyz"
  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
  const numberChars = "123456789"
  const symbolsChars = "?!@7*()[]"

  if (upperCheckEl.checked) {
    chars += upperCaseChars
  }
  if (numberCheckEl.checked) {
    chars += numberChars
  }
  if (symbolCheckEl.checked) {
    chars += symbolsChars
  }

  let password = ""

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)

    password += chars.substring(randomNumber, randomNumber + 1)
  }
  inputPassword.value = password
  calculateQuality()
  calculateFontSize()
}
function calculateQuality() {
  const percent = Math.round(
    (passwordLength / 64) * 25 + (upperCheckEl.checked ? 15 : 0) +
    (numberCheckEl.checked ? 25 : 0) +
    (symbolCheckEl.checked ? 35 : 0)
  )
  securityIndicatorBarEl.style.width = `${percent}%`

  if (percent > 69) {
    securityIndicatorBarEl.classList.remove('critical')
    securityIndicatorBarEl.classList.remove('warning')
    securityIndicatorBarEl.classList.add('safe')
  } else if (percent > 50) {
    securityIndicatorBarEl.classList.remove('critical')
    securityIndicatorBarEl.classList.add('warning')
    securityIndicatorBarEl.classList.remove('safe')
  } else {
    securityIndicatorBarEl.classList.add('critical')
    securityIndicatorBarEl.classList.remove('warning')
    securityIndicatorBarEl.classList.remove('safe')
  }

  if (percent >= 100) {
    securityIndicatorBarEl.classList.add("completed")
  } else {
    securityIndicatorBarEl.classList.remove("completed")
  }
}

function calculateFontSize() {
  if (passwordLength > 45) {
    inputPassword.classList.remove("font-sm")
    inputPassword.classList.remove("font-xs")
    inputPassword.classList.add("font-xxs")
  } else if (passwordLength > 32) {
    inputPassword.classList.remove("font-sm")
    inputPassword.classList.add("font-xs")
    inputPassword.classList.remove("font-xxs")
  } else if (passwordLength > 22) {
    inputPassword.classList.add("font-sm")
    inputPassword.classList.remove("font-xs")
    inputPassword.classList.remove("font-xxs")
  } else {
    inputPassword.classList.remove("font-sm")
    inputPassword.classList.remove("font-xs")
    inputPassword.classList.remove("font-xxs")
  }
}

function copy() {
  navigator.clipboard.writeText(inputPassword.value)
}

const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", function () {
  passwordLength = passwordLengthEl.value
  document.querySelector("#password-length-text").innerText = passwordLength

  generatePassword()
})
upperCheckEl.addEventListener("click", generatePassword)
numberCheckEl.addEventListener("click", generatePassword)
symbolCheckEl.addEventListener("click", generatePassword)

document.querySelector("#copy1").addEventListener("click", copy)
document.querySelector("#copy2").addEventListener("click", copy)
document.querySelector("#renew").addEventListener("click", generatePassword)
generatePassword()
