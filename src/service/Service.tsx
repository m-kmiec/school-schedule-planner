import { Course } from "../data/Course";
import { StudentGroup } from "../data/StudentGroups";
import { Subject } from "../data/Subject";
import { Teacher } from "../data/Teacher";
import http from "../http-common";

const getCourses = () => {
    return http.get<Array<Course>>("/courses");
}

const getSubjects = () => {
    return http.get<Array<Subject>>("/subjects");
}

const getTeachers = () => {
    return http.get<Array<Teacher>>("/teachers");
}

const getStudentGroups = () => {
    return http.get<Array<StudentGroup>>("/studentGroups");
}

const getTimestamps = () => {
    return http.get<Array<String>>("/timestamps");
}

const getDays = () => {
    return http.get<Array<String>>("/days");
}

const getAdditionalCourses = (studentGroup: string) => {
     return http.get<any>("/studentGroups?name="+studentGroup);
}

const addCourse = (data: Course) => {
    return http.post<any>("/courses",data);
}

const addGroup = (data: StudentGroup) => {
    return http.post<any>("/studentGroups, data");
}

const editCourse = (data: Course, id: number) => {
    return http.put<any>("/courses/"+id,data)
}

const editGroup = (data: StudentGroup, id:number) => {
    return http.put<any>("/studentGroups/"+id, data);
}

const deleteGroup = (id: number) => {
    return http.delete<any>("/studentGroups/"+id);
}

const deleteCourse = (id:number) => {
    return http.delete<any>("/courses/"+id);
}

const postPlan = (data: any) => {
    return http.post<any>("/plan",data);
}

const getPlan = () => {
    return http.get<any>("/plan");
}

const deletePlan = (id: number) => {
    return http.delete<any>("/plan/"+id);
}

const getPlanForGroup = (studentGroup: string) => {
    return http.get<any>("/plan?studentGroup="+ studentGroup);
}

const Service = {
    getCourses,
    getSubjects,
    getAdditionalCourses,
    getDays,
    getPlan,
    getPlanForGroup,
    getStudentGroups,
    getTeachers,
    getTimestamps,
    postPlan,
    addCourse,
    addGroup,
    editCourse,
    editGroup,
    deleteCourse,
    deleteGroup,
    deletePlan
}

export default Service;