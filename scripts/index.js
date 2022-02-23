const closePopupButtonList = document.querySelectorAll(".popup__close");

const popupList = Array.from(document.querySelectorAll(".popup"));

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

function handleClosePopup(evt) {
  popupList.forEach((popupElement) => {
    if (popupElement.classList.contains("popup_opened")) {
      if (evt.target == evt.currentTarget) {
        closePopup(popupElement);
      }
    }
  });
}

function handleEscapePopupBtn() {
  popupList.forEach((popupElement) => {
    if (popupElement.classList.contains("popup_opened")) {
      closePopup(popupElement);
    }
  });
}

popupList.forEach((popupElement) => {
  popupElement.addEventListener("mousedown", handleClosePopup);
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    handleEscapePopupBtn();
  }
});

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closePopupButtonList.forEach((element) => {
  element.addEventListener("click", function () {
    const popup = element.closest(".popup");
    closePopup(popup);
  });
});

editProfileButton.addEventListener("click", function () {
  openPopup(editProfilePopup);
  setExistingInfo();
});

function setExistingInfo() {
  nameInput.value = profileName.textContent;
  jobInput.value = aboutMe.textContent;
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
  errorElement.style.cssText = "position: relative; top: -25px;";
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__submit_inactive");
    editProfileForm.removeEventListener("submit", handleSubmitedProfile);
    addPlaceForm.removeEventListener("submit", handleSubmitAddPlace);
  } else {
    buttonElement.classList.remove("form__submit_inactive");
    editProfileForm.addEventListener("submit", handleSubmitedProfile);
    addPlaceForm.addEventListener("submit", handleSubmitAddPlace);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}
enableValidation();

function handleSubmitedProfile() {
  profileName.textContent = nameInput.value;
  aboutMe.textContent = jobInput.value;
  closePopup(editProfilePopup);
  enableValidation();
}

function runInitialCards() {
  initialCards.forEach((cardInfo) => {
    const card = createCard(cardInfo);
    renderCard(card);
  });
}
runInitialCards();

addPlaceButton.addEventListener("click", function () {
  openPopup(addPlacePopup);
});

function handleSubmitAddPlace() {
  const addPlaceDeta = {
    name: titleInput.value,
    link: urlInput.value,
  };
  renderCard(createCard(addPlaceDeta));
  addPlaceForm.reset();
  closePopup(addPlacePopup);
  enableValidation();
}

function createCard(cardDeta) {
  const cardTemplate = document.getElementById("card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").setAttribute("src", cardDeta.link);
  cardElement.querySelector(".card__image").setAttribute("alt", cardDeta.name);
  cardElement.querySelector(".card__name").textContent = cardDeta.name;
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openImagePopup);
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
  openPopup(imagePopup);
  imageCls.setAttribute("src", imageUrl);
  imageCls.setAttribute("alt", imageAlt);
  nameCls.textContent = name;
}

function setLikeButtonHandler(newCard) {
  const cardLike = newCard.querySelector(".card__like");
  cardLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like_active");
  });
}

function setTrashButtonHandler(newCard) {
  const cardTrash = newCard.querySelector(".card__trash");
  cardTrash.addEventListener("click", function (evt) {
    evt.target.parentElement.remove();
  });
}
