import Request from "./Request.js";

export default class StudentApi {
  static createStudent(data) {
    return new Request(`/student/`, {"data": data, "method": "POST"});
  }

  static getStudent(pk) {
    return new Request(`/student/${pk}/`, {"method": "GET"});
  }

  static updateStudent(pk, data) {
    return new Request(`/student/${pk}/`, {"data": data, "method": "PATCH"});
  }

  static deleteStudent(pk) {
    return new Request(`/student/${pk}/`, {"method": "DELETE"});
  }
}
