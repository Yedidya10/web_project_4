export default class UserInfo {
  constructor(userName, userAbout) {
    this._userName = userName;
    this._userAbout = userAbout;
  }

  getUserInfo = () => {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    };
  };
}


