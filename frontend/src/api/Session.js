import Request from "./Request.js";

export default class SessionApi {
  static createSession(data) {
    return new Request(`/session/`, {"data": data, "method": "POST"});
  }

  static getSession(pk) {
    return new Request(`/session/${pk}/`, {"method": "GET"});
  }

  static updateSession(pk, data) {
    return new Request(`/session/${pk}/`, {"data": data, "method": "PATCH"});
  }

  static deleteSession(pk) {
    return new Request(`/session/${pk}/`, {"method": "DELETE"});
  }
}