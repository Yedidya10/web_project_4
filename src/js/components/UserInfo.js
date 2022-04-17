export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
  }

  getUserInfo = () => {
    this._userName = this._userNameSelector.textContent;
    this._userJob = this._userJobSelector.textContent;
    return {
      name: this._userName,
      job: this._userJob,
    };
  };

  setUserInfo = () => {
    this._userNameSelector.textContent = this._userName;
    this._userJobSelector.textContent = this._userJob;
  };
}
