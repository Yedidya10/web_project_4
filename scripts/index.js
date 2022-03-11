import { Card } from "./card.js";
import { initialCards } from "./data/cards.js";
import { FormValidator } from "./formValidator.js";
import { openPopup, closePopup } from "./utils.js";
import { settings,
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
  titleInput,
  urlInput,
  cards } from "./data/domConst.js";

editProfileButton.addEventListener("click", function () {
  const submitEditProfileFormBtn = editProfileForm.submit;
  const inputList = Array.from(
    editProfileForm.querySelectorAll(settings.inputSelector)
  );
  openPopup(editProfilePopup);
  fillProfileForm();
  FormValidator.toggleButtonState(inputList, submitEditProfileFormBtn);
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
  const submitaddPlaceFormBtn = addPlaceForm.submit;
  const inputList = Array.from(
    addPlaceForm.querySelectorAll(settings.inputSelector)
  );
  const addPlaceData = {
    name: titleInput.value,
    link: urlInput.value,
  };
  const card = new Card(addPlaceData, ".card");
  renderCard(card);
  addPlaceForm.reset();
  FormValidator.toggleButtonState(inputList, submitaddPlaceFormBtn);
  closePopup(addPlacePopup);
}

function renderCard(card) {
  cards.prepend(card);
}

function renderInitialCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, ".card");
    card.createCard();
    renderCard(card)
  });
}
renderInitialCards();
