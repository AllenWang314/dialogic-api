import Request from "./Request.js";

export default class TeacherApi {
  static createTeacher(data) {
    return new Request(`/teacher/`, {"data": data, "method": "POST"});
  }

  static getTeacher(pk) {
    return new Request(`/teacher/${pk}/`, {"method": "GET"});
  }

  static updateTeacher(pk, data) {
    return new Request(`/teacher/${pk}/`, {"data": data, "method": "PATCH"});
  }

  static deleteTeacher(pk) {
    return new Request(`/teacher/${pk}/`, {"method": "DELETE"});
  }
}