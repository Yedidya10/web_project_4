export default class UserInfo {
  constructor(nameSelector, aboutMeSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutMeElement = document.querySelector(aboutMeSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo = () => {
    return {
      name: this._nameElement.textContent,
      about: this._aboutMeElement.textContent
    };
  }

  setUserInfo(data, userId) {
    this._nameElement.textContent = data.name;
    this._aboutMeElement.textContent =  data.about;
    this._nameElement.setAttribute('id', userId);
  }

  setUserPic(avatar) {
    this._userAvatar.src = avatar;
  }
}


