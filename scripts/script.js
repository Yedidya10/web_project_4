let popup = document.querySelector('.popup');
let editProfile = popup.querySelector('.edit-profile-form');
let editProfileButton = document.querySelector('.profile__edit');
let closePopupButton = popup.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let aboutMe = document.querySelector('.profile__about-me');

let nameInput = popup.querySelector('#name');
let jobInput = popup.querySelector('#about-me');

function getExistingInfo() {
  nameInput.value;
  jobInput.value;
}

function openPopup() {
  popup.classList.add('popup_opened');
  getExistingInfo();
}

editProfileButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}

closePopupButton.addEventListener('click', closePopup);

function handleSubmitButton(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = jobInput.value;
  closePopup();
}

editProfile.addEventListener('submit', handleSubmitButton);
