export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
  }

  getUserInfo = () => {
    return {
      name: this._userNameSelector.textContent,
      job: this._userJobSelector.textContent
    };
  };

  setUserInfo = (inputsData) => {
    this._userNameSelector.textContent = inputsData.formInput1;
    this._userJobSelector.textContent = inputsData.formInput2;
  };
}
