import { Course } from "../data/Course";
import { ScheduleForDay } from "../data/ScheduleForDay";
import { StudentGroup } from "../data/StudentGroups";
import { Subject } from "../data/Subject";
import { Teacher } from "../data/Teacher";
import http from "../http-common";
import { Day } from "../schedule/ScheduleForm";

const getCourses = () => {
  return http.get<Array<Course>>("/courses");
};

const getSubjects = () => {
  return http.get<Array<Subject>>("/subjects");
};

const getTeachers = () => {
  return http.get<Array<Teacher>>("/teachers");
};

const getStudentGroups = () => {
  return http.get<Array<StudentGroup>>("/studentGroups");
};

const getTimestamps = () => {
  return http.get<Array<String>>("/timestamps");
};

const getDays = () => {
  return http.get<Array<Day>>("/days");
};

const getAdditionalCourses = (studentGroup: string) => {
  return http.get<any>("/studentGroups?name=" + studentGroup);
};

const addCourse = (data: Course) => {
  return http.post<any>("/courses", data);
};

const addGroup = (data: StudentGroup) => {
  return http.post<any>("/studentGroups, data");
};

const editCourse = (data: Course, id: number) => {
  return http.put<any>("/courses/" + id, data);
};

const editGroup = (data: StudentGroup, id: number) => {
  return http.put<any>("/studentGroups/" + id, data);
};

const deleteGroup = (id: number) => {
  return http.delete<any>("/studentGroups/" + id);
};

const deleteCourse = (id: number) => {
  return http.delete<any>("/courses/" + id);
};

const getScheduleForGroup = (studentGroup: any) => {
  return http.get<any>("/scheduleForDay?className=" + studentGroup);
};

const deleteScheduleForDay = (day: any) => {
  return http.delete<any>("/scheduleForDay/" + day);
};

const postScheduleForDay = (scheduleForDay: ScheduleForDay) => {
  return http.post("/scheduleForDay", scheduleForDay);
};

const Service = {
  getCourses,
  getSubjects,
  getAdditionalCourses,
  getDays,
  getStudentGroups,
  getTeachers,
  getTimestamps,
  addCourse,
  addGroup,
  editCourse,
  editGroup,
  deleteCourse,
  deleteGroup,
  getScheduleForGroup,
  deleteScheduleForDay,
  postScheduleForDay
};

export default Service;
