const popup = document.querySelector(".popup");
const popupOpen = document.querySelector(".popup_opened");
const popupContainer = popup.querySelector(".popup__container");
const form = popupContainer.querySelectorAll(".form");
const closePopupButton = popup.querySelector(".popup__close");

const editProfileButton = document.querySelector(".profile__edit");
const editProfileForm = popup.querySelector("#edit-profile-form");
const profileName = document.querySelector(".profile__name");
const aboutMe = document.querySelector(".profile__about-me");
const nameInput = editProfileForm.querySelector("#name");
const jobInput = editProfileForm.querySelector("#about-me");

const addPlaceButton = document.querySelector(".profile__add-card");
const addPlaceForm = popup.querySelector("#add-place-form");

const cards = document.querySelector(".cards");



const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

function popupOpened() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  const imageDiv = popupContainer.querySelector(".image-popup");
  popup.classList.remove("popup_opened");
  for (let i = 0; i < form.length; i++) {
    form[i].classList.remove("form_active");
  }
  imageDiv.remove();
}

closePopupButton.addEventListener("click", closePopup);

function getExistingInfo() {
  nameInput.value = profileName.textContent;
  jobInput.value = aboutMe.textContent;
}

editProfileButton.addEventListener("click", function(e) {
  popupOpened();
  editProfileForm.classList.add("form_active");
  getExistingInfo();
});

function handleSubmiteditProfil(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = jobInput.value;
  closePopup();
}

editProfileForm.addEventListener("submit", handleSubmiteditProfil);

addPlaceButton.addEventListener("click", function(e) {
  popupOpened();
  addPlaceForm.classList.add("form_active");
});

function cardLikeActive(e) {
  e.target.classList.toggle("card__like_active");
}

function likeActive() {
  const cardLike = document.querySelectorAll(".card__like");
  for (let i = 0; i < cardLike.length; i++) {
    cardLike[i].removeEventListener;
    cardLike[i].addEventListener("click", cardLikeActive);
  }
}

function removeCard() {
  const cardTrash = document.querySelectorAll(".card__trash");
  for (let i = 0; i < cardTrash.length; i++) {
    cardTrash[i].addEventListener("click", function(e) {
      e.target.parentElement.remove();
    });
  }
}

function imagePopupEvent(e) {
  const imagePopupDiv = document.createElement("div");
  const imageClon = e.target.cloneNode(true);
  const cardTitle = e.target.parentElement.querySelector(".card__name");
  const titleClon = cardTitle.cloneNode(true);
  popupOpened();
  imagePopupDiv.classList.add("image-popup");
  imageClon.classList.add("card__image_popup");
  titleClon.classList.add("card__name_popup");
  popupContainer.append(imagePopupDiv);
  imagePopupDiv.append(imageClon);
  imagePopupDiv.append(titleClon);
}

function imagePopup() {
  const cardImage = document.querySelectorAll(".card__image");

  for (let i = 0; i < cardImage.length; i++) {
    imagePopupEvent.removeEventListener;
    cardImage[i].addEventListener("click", imagePopupEvent);
  }
}

function createCard(imageValue, titleValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").setAttribute("src", imageValue);
  cardElement.querySelector(".card__image").setAttribute("alt", "Place Image");
  cardElement.querySelector(".card__name").textContent = titleValue;
  cards.prepend(cardElement);
  likeActive();
  removeCard();
  imagePopup();
}

function runInitialCards() {
  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = initialCards[i];
    imageLink = cardElement.link;
    titleName = cardElement.name;
    createCard(imageLink, titleName);
  }
}
runInitialCards();

function handleSubmitaddPlace(e) {
  e.preventDefault();
  const image = addPlaceForm.querySelector("#img-url");
  const title = addPlaceForm.querySelector("#title");
  createCard(image.value, title.value);
  image.value = "";
  title.value = "";
  closePopup();
}

addPlaceForm.addEventListener("submit", handleSubmitaddPlace);
