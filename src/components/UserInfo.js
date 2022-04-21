export default class UserInfo {
  constructor() {
    this._userNameSelector = document.querySelector(".profile__name");
    this._userJobSelector = document.querySelector(".profile__about-me");
  }

  getUserInfo = () => {
    return {
      name: this._userNameSelector.textContent,
      job: this._userJobSelector.textContent,
    };
  };

  setUserInfo = (inputsData) => {
    this._userNameSelector.textContent = inputsData.formInput1;
    this._userJobSelector.textContent = inputsData.formInput2;
  };
}
