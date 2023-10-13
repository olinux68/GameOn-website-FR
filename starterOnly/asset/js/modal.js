//@ts-nocheck

// Fonction pour gérer la navigation responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Récupération des éléments du DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locationTournament = document.getElementsByName("location");
const condition = document.getElementById("checkbox1");
const btnSubmit = document.getElementById("btnSubmit");
const btnValid = document.getElementById("btnValid");
const validForm = document.querySelector(".validationForm");
const validMessage = document.getElementById("validMessage");

// Éléments de validation
const firstText = document.getElementById("firstText");
const lastText = document.getElementById("lastText");
const emailText = document.getElementById("emailText");
const birthdateText = document.getElementById("birthdateText");
const quantityText = document.getElementById("quantityText");
const locationText = document.getElementById("locationText");
const conditionText = document.getElementById("conditionText");

// Expressions régulières pour la validation
let regExTypeText = new RegExp('^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$');
let regExTypeEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

// Fonction générique pour valider les champs texte et email
function generiqueValidate(input, regEx, msg, label, border) {
  let testValid = regEx.test(input.value);
  if (testValid) {
    label.innerHTML = "Champs Valide";
    label.classList.remove('text-danger');
    label.classList.add('text-succes');
    border.classList.remove('border-danger');
    border.classList.add('border-succes');
    return true;
  } else {
    label.innerHTML = msg;
    label.classList.remove('text-succes');
    label.classList.add('text-danger');
    border.classList.remove('border-succes');
    border.classList.add('border-danger');
    return false;
  }
}

// Validation pour le prénom
first.addEventListener('change', function () {
  generiqueValidate(this, regExTypeText, "Veuillez rentrer deux caractères minimum", firstText, this);
});

// Validation pour le nom
last.addEventListener('change', function () {
  generiqueValidate(this, regExTypeText, "Veuillez rentrer deux caractères minimum", lastText, this);
});

// Validation pour l'email
email.addEventListener('change', function () {
  generiqueValidate(this, regExTypeEmail, "Veuillez rentrer un adresse email valide", emailText, this);
});

// Validation pour la date de naissance
birthdate.addEventListener('change', function () {
  validBirthdate(this);
});

// Validation pour le nombre de tournois
quantity.addEventListener('change', function () {
  validQuantity(this);
});

// Validation pour la localisation
locationTournament.forEach((checkedBoxInput) => checkedBoxInput.addEventListener('change', function () {
  validLocationTournament();
}));

// Validation pour les conditions
condition.addEventListener('change', function () {
  validCondition(this);
});

// Fonction de validation pour la date de naissance
function validBirthdate(input) {
  if (!input.value) {
    birthdateText.innerHTML = "Veuillez entrer une date de naissance valide";
    birthdateText.classList.add('text-danger');
    return false;
  } else {
    birthdateText.innerHTML = "Champs Valide";
    birthdateText.classList.remove('text-danger');
    birthdateText.classList.add('text-succes');
    return true;
  }
}

// Fonction de validation pour le nombre de tournois
function validQuantity(input) {
  if (input.value === "0" || input.value < 0 || input.value > 50) {
    quantityText.innerHTML = "Merci d'indiquer le nombre de tournois valide";
    quantityText.classList.add('text-danger');
    return false;
  } else {
    quantityText.innerHTML = "Champs Valide";
    quantityText.classList.remove('text-danger');
    quantityText.classList.add('text-succes');
    return true;
  }
}

// Fonction de validation pour la localisation
function validLocationTournament() {
  for (let i = 0; i < locationTournament.length; i++) {
    if (locationTournament[i].checked) {
      locationText.innerHTML = "Champs Valide";
      locationText.classList.remove('text-danger');
      locationText.classList.add('text-succes');
      return true;
    }
  }
  locationText.innerHTML = "Merci de cocher une ville";
  locationText.classList.add('text-danger');
  return false;
}

// Fonction de validation pour les conditions
function validCondition(input) {
  if (!input.checked) {
    conditionText.innerHTML = "Merci d'accepter les conditions d'utilisations";
    conditionText.classList.add('text-danger');
    return false;
  } else {
    conditionText.innerHTML = "Champs Valide";
    conditionText.classList.remove('text-danger');
    conditionText.classList.add('text-succes');
    return true;
  }
}

// Événement pour ouvrir le formulaire modal
modalBtn.forEach((btn) => btn.addEventListener("click", function () {
  modalbg.style.display = "block";
}));

// Événement pour fermer le formulaire modal
document.querySelector(".close").addEventListener("click", function () {
  modalbg.style.display = "none";
});

// Événement pour la validation finale du formulaire
function openRemerciments() {
  console.log("La fonction openRemerciments() est appelée."); // Vérifiez si cette ligne est affichée dans la console
  document.getElementById("form").style.display = "none"; // Masque le formulaire
  validForm.style.display = "block";
  validMessage.innerHTML = "Merci pour votre inscription";
}

document.getElementById("btnSubmit").addEventListener("click", function (e) {
  e.preventDefault();

  if (
    generiqueValidate(first, regExTypeText, "Prénom invalide", firstText, first) &&
    generiqueValidate(last, regExTypeText, "Nom invalide", lastText, last) &&
    generiqueValidate(email, regExTypeEmail, "Email invalide", emailText, email) &&
    validBirthdate(birthdate) &&
    validQuantity(quantity) &&
    validLocationTournament() &&
    validCondition(condition)
  ) {
    openRemerciments(); // Si toutes les validations sont correctes, ouvre le message de remerciement
  } else {
    alert("Merci de remplir correctement votre inscription."); // Sinon, alerte l'utilisateur
  }
});


if (btnValid) {
  btnValid.addEventListener("click", function () {
    window.location.reload(); // Recharge la page
  });
}



