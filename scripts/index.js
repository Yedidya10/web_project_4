const closePopupButton = document.querySelectorAll(".popup__close-icon")

const editProfileButton = document.querySelector(".profile__edit");
const editProfilePopup = document.getElementById("edit-profile-popup");
const editProfileForm = document.getElementById("edit-profile-form");
const profileName = document.querySelector(".profile__name");
const aboutMe = document.querySelector(".profile__about-me");
const nameInput = document.getElementById("name");
const jobInput = document.getElementById("about-me");

const addPlaceButton = document.querySelector(".profile__add-card");
const addPlacePopup = document.getElementById("add-place-popup");
const addPlaceForm = document.getElementById("add-place-form");

const imagePopup = document.getElementById("image-popup");

const cards = document.querySelector(".cards");


function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup() {
  const popupOpened = document.querySelector(".popup_opened");
  popupOpened.classList.remove("popup_opened");
}

closePopupButton.forEach(element => {
  element.addEventListener("click", closePopup);
});

editProfileButton.addEventListener("click", function() {
  openPopup(editProfilePopup);
  getExistingInfo();
});

function getExistingInfo() {
  nameInput.value = profileName.textContent;
  jobInput.value = aboutMe.textContent;
}

function handleSubmiteditProfil(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = jobInput.value;
  closePopup();
}

editProfileForm.addEventListener("submit", handleSubmiteditProfil);


function runInitialCards() {
  initialCards.forEach(o => {
    let card = createCard(o);
    renderCard(card);
  });
}
runInitialCards();

addPlaceButton.addEventListener("click", function() {
  openPopup(addPlacePopup);
});

function handleSubmitAddPlace(e) {
  e.preventDefault();
  const image = document.getElementById("img-url").value;
  const title = document.getElementById("title").value;
  const addPlaceDeta = {
    name: title,
    link: image
  };
  renderCard(createCard(addPlaceDeta));
  addPlaceForm.reset();
  closePopup();
}

addPlaceForm.addEventListener("submit", handleSubmitAddPlace);

function createCard(cardDeta) {
  const cardTemplate = document.getElementById("card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").setAttribute("src", cardDeta.link);
  cardElement.querySelector(".card__image").setAttribute("alt", cardDeta.name);
  cardElement.querySelector(".card__name").textContent = cardDeta.name;
  return cardElement;
}

function renderCard(newCard) {
  cards.prepend(newCard);
  likeActive(newCard);
  removeCard(newCard);
  newCard.querySelector(".card__image").addEventListener("click", openImagePopup);
}

function openImagePopup(e) {
  const imageUrl = e.target.getAttribute("src");
  const imageAlt = e.target.getAttribute("alt");
  const titleCard = e.target.parentElement.querySelector(".card__name");
  const name = titleCard.textContent;
  const imageCls = document.querySelector(".popup__image");
  const nameCls = document.querySelector(".popup__name");
  openPopup(imagePopup);
  imageCls.setAttribute("src", imageUrl);
  imageCls.setAttribute("alt", imageAlt);
  nameCls.textContent = name;
}


function likeActive(newCard) {
  const cardLike = newCard.querySelector(".card__like");
  cardLike.addEventListener("click", function(e) {
    e.target.classList.toggle("card__like_active");
  });
}


function removeCard(newCard) {
  const cardTrash = newCard.querySelector(".card__trash");
  cardTrash.addEventListener("click", function(e) {
    e.target.parentElement.remove();
  });
}
