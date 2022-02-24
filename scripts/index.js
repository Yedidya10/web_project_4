const popupList = Array.from(document.querySelectorAll(".popup"));
const closePopupButtonList = document.querySelectorAll(".popup__close");

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
const cardPreviewImage = imagePopup.querySelector(".popup__image");
const cardPreviewTitle = imagePopup.querySelector(".popup__name");

const cardTemplate = document.querySelector("#card-template").content;
const cards = document.querySelector(".cards");


function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapePopupBtn);
}

popupList.forEach((popupElement) => {
  popupElement.addEventListener("mousedown", handleMouseClosePopup);
});

function handleMouseClosePopup(evt) {
  if (evt.target == evt.currentTarget) {
    closeOpenedPopup();
  }
}

function handleEscapePopupBtn(evt) {
  if (evt.key == "Escape") {
    closeOpenedPopup();
  }
}

function closeOpenedPopup() {
  const openedPopup = document.querySelector(".popup_opened");
  closePopup(openedPopup);
  document.removeEventListener("keydown", handleEscapePopupBtn);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closePopupButtonList.forEach((closePopupButton) => {
  closePopupButton.addEventListener("click", function () {
    const popup = closePopupButton.closest(".popup");
    closePopup(popup);
  });
});

editProfileButton.addEventListener("click", function () {
  openPopup(editProfilePopup);
  fillProfileForm();
});

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = aboutMe.textContent;
}

editProfileForm.addEventListener("submit", handleSubmittedProfile);

function handleSubmittedProfile() {
  profileName.textContent = nameInput.value;
  aboutMe.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

function renderInitialCards() {
  initialCards.forEach((cardInfo) => {
    const card = createCard(cardInfo);
    renderCard(card);
  });
}
renderInitialCards();

addPlaceButton.addEventListener("click", function () {
  openPopup(addPlacePopup);
});

addPlaceForm.addEventListener("submit", handleSubmittedAddPlace);

function handleSubmittedAddPlace() {
  const addPlaceFormSubmit = addPlaceForm.submit;
  const addPlaceData = {
    name: titleInput.value,
    link: urlInput.value
  };
  renderCard(createCard(addPlaceData));
  addPlaceForm.reset(addPlaceFormSubmit.setAttribute("disabled", ""), addPlaceFormSubmit.classList.add("form__submit_inactive"));
  closePopup(addPlacePopup);
}

function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", cardData.link);
  cardImage.setAttribute("alt", cardData.name);
  cardElement.querySelector(".card__name").textContent = cardData.name;
  cardImage.addEventListener("click", openImagePopup);
  setLikeButtonHandler(cardElement);
  setTrashButtonHandler(cardElement);
  return cardElement;
}

function renderCard(cardElement) {
  cards.prepend(cardElement);
}

function openImagePopup(evt) {
  const imageUrl = evt.target.getAttribute("src");
  const imageAlt = evt.target.getAttribute("alt");
  const titleCard = evt.target.parentElement.querySelector(".card__name");
  const name = titleCard.textContent;
  cardPreviewImage.setAttribute("src", imageUrl);
  cardPreviewImage.setAttribute("alt", imageAlt);
  openPopup(imagePopup);
  cardPreviewTitle.textContent = name;
}

function setLikeButtonHandler(newCard) {
  const handleLike = function (evt) {
    evt.target.classList.toggle("card__like_active");
  }
  const cardLike = newCard.querySelector(".card__like");
  cardLike.addEventListener("click", handleLike);
}

function setTrashButtonHandler(newCard) {
  const cardTrash = newCard.querySelector(".card__trash");
  cardTrash.addEventListener("click", function (evt) {
    newCard.remove();
  });
}
