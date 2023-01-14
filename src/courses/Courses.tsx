import React, { Component } from 'react'
import { useEffect, useState } from "react";
import { Course, PageEnum, tmpList } from '../data/Course';
import MaterialTable from 'material-table';
import CourseList from './CourseList';
import AddCourse from './AddCourse';
import Service from '../service/Service';
import { get } from 'react-hook-form';

function Courses() {
  const [courses, setCourses] = useState([] as Course[]);

  const [shownPage, setShownPage] = useState(PageEnum.list)

  const [idToChange, setIdToChange] = useState<number | null>(null);

  useEffect(() => {
    getAllCourses();
  },[]);

  useEffect(() => {
    if(idToChange === null) return;
    getAllCourses();
    setIdToChange(null);
  },[idToChange]);

  const getAllCourses = () => {
    console.log("test");
    Service.getCourses()
    .then((response: any) => {
      setCourses(response.data)
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  const onAddCourseClick = () => {
    setShownPage(PageEnum.add);
  }

  const showListPage = () => {
    setShownPage(PageEnum.list);
  }

  const addCourse = (data: Course) => {
    setCourses([...courses,data]);
  }

  const editCourse = (id: number) => {

  }

  const deleteCourse = (id: number) => {
    Service.deleteCourse(id);
    setIdToChange(id);
  }

  return (
    <div className="Courses">
      <h1>Courses</h1>
      {shownPage === PageEnum.list &&
        <><CourseList list={courses} editCourse={editCourse} deleteCourse={deleteCourse}></CourseList>
          <input type="button" value="Add" onClick={onAddCourseClick} /></>
      }
      {shownPage === PageEnum.add && <AddCourse onBackButtonClick={showListPage} onSubmitClick={addCourse}/>}

    </div>
  )
}

export default Courses;
