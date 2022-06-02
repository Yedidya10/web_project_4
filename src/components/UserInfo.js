export default class UserInfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo = () => {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    };
  };

  setUserInfo = (inputsData) => {
    this._userName.textContent = inputsData.formInput1;
    this._userJob.textContent = inputsData.formInput2;
  };
}
