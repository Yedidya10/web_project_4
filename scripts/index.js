import { Card } from "./card.js";
import { initialCards } from "./data/cards.js";
import { FormValidator } from "./formValidator.js";
import { openPopup, closePopup, handleMouseClosePopup } from "./utils.js";
import { settings,
  popupList,
  closePopupButtonList,
  imagePopup,
  cardPreviewImage,
  cardPreviewTitle,
  editProfileButton,
  editProfileForm,
  editProfilePopup,
  nameInput,
  jobInput,
  profileName,
  aboutMe,
  addPlaceButton,
  addPlacePopup,
  addPlaceForm,
  formList,
  titleInput,
  urlInput,
  cards } from "./data/domConst.js";


const profileFormValidator = new FormValidator(settings, editProfileForm);
const cardFormValidator = new FormValidator(settings, addPlaceForm);

popupList.forEach((popupElement) => {
  popupElement.addEventListener("mousedown", handleMouseClosePopup);
});

closePopupButtonList.forEach((closePopupButton) => {
  closePopupButton.addEventListener("click", function () {
    const popup = closePopupButton.closest(".popup");
    closePopup(popup);
  });
});

export function openImagePopup(evt) {
  const imageUrl = evt.target.getAttribute("src");
  const imageAlt = evt.target.getAttribute("alt");
  const titleCard = evt.target.parentElement.querySelector(".card__name");
  const name = titleCard.textContent;
  cardPreviewImage.setAttribute("src", imageUrl);
  cardPreviewImage.setAttribute("alt", imageAlt);
  openPopup(imagePopup);
  cardPreviewTitle.textContent = name;
}

editProfileButton.addEventListener("click", function () {
  openPopup(editProfilePopup);
  fillProfileForm();
  profileFormValidator.toggleButtonState;
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

addPlaceButton.addEventListener("click", function () {
  openPopup(addPlacePopup);
});

addPlaceForm.addEventListener("submit", handleSubmittedAddPlace);

function handleSubmittedAddPlace() {
  const addPlaceData = {
    name: titleInput.value,
    link: urlInput.value,
  };
  const card = new Card(addPlaceData, ".card");
  renderCard(card.createCard());
  cardFormValidator.toggleButtonState;
  addPlaceForm.reset();
  closePopup(addPlacePopup);
}

function renderCard(card) {
  cards.prepend(card);
}

function renderInitialCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, ".card");
    renderCard(card.createCard());
  });
}
renderInitialCards();

formList.forEach((form) => {
  const formValidator = new FormValidator(settings, form);
  formValidator.enableValidation();
});
