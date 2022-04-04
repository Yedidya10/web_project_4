export const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const editProfileButton = document.querySelector(".profile__edit");
export const editProfilePopup = document.querySelector("#edit-profile-popup");
export const editProfileForm =
  editProfilePopup.querySelector("#edit-profile-form");
export const profileName = document.querySelector(".profile__name");
export const aboutMe = document.querySelector(".profile__about-me");
export const nameInput = editProfileForm.querySelector("#name");
export const jobInput = editProfileForm.querySelector("#about-me");
export const addPlaceButton = document.querySelector(".profile__add-card");
export const addPlacePopup = document.querySelector("#add-place-popup");
export const addPlaceForm = document.querySelector("#add-place-form");
export const urlInput = addPlaceForm.querySelector("#img-url");
export const titleInput = addPlaceForm.querySelector("#title");
export const addPlaceData = {
  name: titleInput.value,
  link: urlInput.value
};
export const imagePopup = document.querySelector("#image-popup");
export const cardPreviewImage = imagePopup.querySelector(".popup__image");
export const cardPreviewTitle = imagePopup.querySelector(".popup__name");

export const cardTemplate = document.querySelector("#card-template").content;
export const cards = document.querySelector(".cards");
