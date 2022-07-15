export default class Api {
  constructor(url, auth, type, { rendererData }, data) {
    this._url = url;
    this._auth = auth;
    this._type = type;
    this._data = data;
    this._rendererData = rendererData;
  }

  fetchApi = () => {
    /* GET */
    if (this._type === "GET") {
      return fetch(this._url, {
        method: this._type,
        headers: {
          authorization: this._auth,
          "Content-type": "application/json"
        },
      })
      .then((res) => {
        if (res.ok) {
          console.log("HTTP request successful");
        } else {
          console.log("HTTP request unsuccessful");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => this._rendererData(data))
      .catch((error) => console.log(error));
    }

    /* DELETE */
    else if (this._type === "DELETE") {
      return fetch(this._url, {
        method: this._type,
        headers: {
          authorization: this._auth,
          "Content-type": "application/json"
        },
      })
      .then((res) => {
        if (res.ok) {
          console.log("HTTP request successful");
        } else {
          console.log("HTTP request unsuccessful");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => this._rendererData(data))
      .catch((error) => console.log(error));
    }

    /* POST or PUT or PATCH*/
    else if ((this._type === "POST") || (this._type === "PUT") || (this._type === "PATCH")) {
      return fetch(this._url, {
        method: this._type,
        headers: {
          authorization: this._auth,
          "Content-type": "application/json",
        },
        body: JSON.stringify(this._data),
      })
      .then((res) => {
        if (res.ok) {
          console.log("HTTP request successful");
        } else {
          console.log("HTTP request unsuccessful");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => this._rendererData(data))
      .catch((error) => console.log(error));
    }
  };
}
