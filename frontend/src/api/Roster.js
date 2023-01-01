import Request from "./Request.js";

export default class RosterApi {
  static createRoster(data) {
    return new Request(`/roster/`, {"data": data, "method": "POST"});
  }

  static getRoster(pk) {
    return new Request(`/roster/${pk}/`, {"method": "GET"});
  }

  static getStudents(pk) {
    return new Request(`/roster/students/${pk}/`, {"method": "GET"});
  }

  static updateRoster(pk, data) {
    return new Request(`/roster/${pk}/`, {"data": data, "method": "PATCH"});
  }

  static deleteRoster(pk) {
    return new Request(`/roster/${pk}/`, {"method": "DELETE"});
  }
}