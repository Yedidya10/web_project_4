let editProfileButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopupButton = popup.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let aboutMe = document.querySelector('.profile__about-me');
let nameInput = popup.querySelector('#name');
let jobInput = popup.querySelector('#about-me');

function getExistingInfo() {
  nameInput.setAttribute("value", profileName.textContent);
  jobInput.setAttribute("value", aboutMe.textContent);
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

popup.addEventListener('submit', handleSubmitButton);
