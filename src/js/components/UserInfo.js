export default class UserInfo {
  constructor(userNameSelector, userJobSelector, userAvatarSelector) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
    this._userAvatarSelector = userAvatarSelector;
  }
}