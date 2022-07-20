export default class Api {
  constructor( {baseUrl, headers} ) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getCards(continuedLink) {
    return fetch(`${this._baseUrl}/${continuedLink}`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => this._getResponseData(res))
  }

  getUser(continuedLink) {
    return fetch(`${this._baseUrl}/${continuedLink}`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => this._getResponseData(res))
  }

  createCard(continuedLink, cardData) {
    return fetch(`${this._baseUrl}/${continuedLink}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardData)
    })
    .then((res) => this._getResponseData(res))
  }

  addLike(continuedLink) {
    return fetch(`${this._baseUrl}/${continuedLink}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => this._getResponseData(res))
  }

  deleteLike(continuedLink) {
    return fetch(`${this._baseUrl}/${continuedLink}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._getResponseData(res))
  }

  deleteCard(continuedLink) {
    return fetch(`${this._baseUrl}/${continuedLink}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._getResponseData(res))
  }

  updateProfile(continuedLink, userData) {
    return fetch(`${this._baseUrl}/${continuedLink}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
    .then((res) => this._getResponseData(res))
  }

}