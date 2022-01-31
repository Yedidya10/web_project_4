const closePopupButtonList = document.querySelectorAll(".popup__close")

const editProfileButton = document.querySelector(".profile__edit");
const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfileForm = editProfilePopup.querySelector("#edit-profile-form");
const profileName = document.querySelector(".profile__name");
const aboutMe = document.querySelector(".profile__about-me");
const nameInput = editProfileForm.querySelector("#name");
const jobInput = editProfileForm.querySelector("#about-me");

const addPlaceButton = document.querySelector(".profile__add-card");
const addPlacePopup = document.querySelector("#add-place-popup");
const addPlaceForm = document.querySelector("#add-place-form");
const urlInput = addPlaceForm.querySelector("#img-url");
const titleInput = addPlaceForm.querySelector("#title");

const imagePopup = document.querySelector("#image-popup");
const imageCls = imagePopup.querySelector(".popup__image");
const nameCls = imagePopup.querySelector(".popup__name");

const cards = document.querySelector(".cards");


function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closePopupButtonList.forEach(element => {
  element.addEventListener("click", function() {
    const popup = element.closest('.popup');
    closePopup(popup);
  });
});

editProfileButton.addEventListener("click", function() {
  openPopup(editProfilePopup);
  setExistingInfo();
});

function setExistingInfo() {
  nameInput.value = profileName.textContent;
  jobInput.value = aboutMe.textContent;
}

function handleSubmitedProfile(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

editProfileForm.addEventListener("submit", handleSubmitedProfile);

function runInitialCards() {
  initialCards.forEach(cardInfo => {
    const card = createCard(cardInfo);
    renderCard(card);
  });
}
runInitialCards();

addPlaceButton.addEventListener("click", function() {
  openPopup(addPlacePopup);
});

function handleSubmitAddPlace(e) {
  const addPlaceDeta = {
    name: titleInput.value,
    link: urlInput.value
  };
  e.preventDefault();
  renderCard(createCard(addPlaceDeta));
  addPlaceForm.reset();
  closePopup(addPlacePopup);
}

addPlaceForm.addEventListener("submit", handleSubmitAddPlace);

function createCard(cardDeta) {
  const cardTemplate = document.getElementById("card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").setAttribute("src", cardDeta.link);
  cardElement.querySelector(".card__image").setAttribute("alt", cardDeta.name);
  cardElement.querySelector(".card__name").textContent = cardDeta.name;
  cardElement.querySelector(".card__image").addEventListener("click", openImagePopup);
  setLikeButtonHandler(newCard);
  setTrashButtonHandler(newCard);
  return cardElement;
}

function renderCard(newCard) {
  cards.prepend(newCard);
}

function openImagePopup(e) {
  const imageUrl = e.target.getAttribute("src");
  const imageAlt = e.target.getAttribute("alt");
  const titleCard = e.target.parentElement.querySelector(".card__name");
  const name = titleCard.textContent;
  openPopup(imagePopup);
  imageCls.setAttribute("src", imageUrl);
  imageCls.setAttribute("alt", imageAlt);
  nameCls.textContent = name;
}

function setLikeButtonHandler(newCard) {
  const cardLike = newCard.querySelector(".card__like");
  cardLike.addEventListener("click", function(e) {
    e.target.classList.toggle("card__like_active");
  });
}

function setTrashButtonHandler(newCard) {
  const cardTrash = newCard.querySelector(".card__trash");
  cardTrash.addEventListener("click", function(e) {
    e.target.parentElement.remove();
  });
}
