export const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const userName = document.querySelector(".profile__name");
export const userAbout = document.querySelector(".profile__about-me");
export const userAvatar = document.querySelector(".profile__image");

export const profileEditImgBtn = document.querySelector(".profile__edit-img");
export const imagePopup = document.querySelector("#image-popup");

export const editProfileButton = document.querySelector(".profile__edit");
export const editProfilePopup = document.querySelector("#edit-profile-popup");
export const editProfileForm =
  editProfilePopup.querySelector("#edit-profile-form");
export const nameInput = editProfileForm.querySelector("#name");
export const aboutInput = editProfileForm.querySelector("#about-me");

export const editProfilePicPopup = document.querySelector("#edit-profile-pic-popup");
export const editProfilePicForm =
editProfilePicPopup.querySelector("#edit-profile-pic-form");

export const addPlaceButton = document.querySelector(".profile__add-card");
export const addPlacePopup = document.querySelector("#add-place-popup");
export const addPlaceForm = document.querySelector("#add-place-form");

export const deleteCardPopup = document.querySelector("#delete-card-popup");

//API
export const apiUrl = 'https://around.nomoreparties.co/v1/cohort-3-en';
export const apiAuth = '55231eda-cfe8-472e-9c18-93282af161bd';