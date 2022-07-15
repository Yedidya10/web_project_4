import Api from "../components/Api.js";
import {
  apiAuth,
  apiUrl
} from "../utils/domConst.js";

export default class UserInfo {
  constructor(userName, userAbout, userAvatar) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
  }

  getUserInfo = () => {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    };
  };

  fetchUserInfo = (userInfoInputs) => {
    const userData = new Api(`${apiUrl}/users/me`, apiAuth, "PATCH", {}, userInfoInputs);
    userData.fetchApi();
  }

  setUserInfo = () => {
    const newUserData = new Api(`${apiUrl}/users/me`, apiAuth, "GET", {
      rendererData: (data) => {
        this._userName.textContent = data.name;
        this._userAbout.textContent = data.about;
      }
    });
    newUserData.fetchApi();
  };

  fetchUserPic = (userPicInput) => {
    const userPic = new Api(`${apiUrl}/users/me/avatar`, apiAuth, "PATCH", {}, userPicInput);
    userPic.fetchApi();
  }

  setUserPic = () => {
    const newUserPic = new Api(`${apiUrl}/users/me`, apiAuth, "GET", {
      rendererData: (data) => {
        this._userAvatar.src = data.avatar;
      }
    });
    newUserPic.fetchApi();
  };
}


