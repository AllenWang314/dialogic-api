import Request from "./Request.js";

export default class StudentSessionApi {
  static createStudentSession(data) {
    return new Request(`/student_session/`, {"data": data, "method": "POST"});
  }

  static getStudentSession(pk) {
    return new Request(`/student_session/${pk}/`, {"method": "GET"});
  }

  static updateStudentSession(pk, data) {
    return new Request(`/student_session/${pk}/`, {"data": data, "method": "PATCH"});
  }

  static deleteStudentSession(pk) {
    return new Request(`/student_session/${pk}/`, {"method": "DELETE"});
  }
}