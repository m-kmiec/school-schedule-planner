import React, { Component } from 'react'
import { useEffect, useState } from "react";
import { Course, PageEnum, tmpList } from '../data/Course';
import MaterialTable from 'material-table';
import CourseList from './CourseList';
import AddCourse from './AddCourse';
import Service from '../service/Service';

function Courses() {
  const [courses, setCourses] = useState([] as Course[]);

  const [shownPage, setShownPage] = useState(PageEnum.list)


  useEffect(() => {
    Service.getCourses()
    .then((response: any) => {
      setCourses(response.data)
    })
    .catch((e: Error) => {
      console.log(e);
    });
  },[]);
  

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

  }

  return (
    <div className="Courses">
      <h1>Courses</h1>
      {shownPage === PageEnum.list &&
        <><CourseList list={courses} /*editCourse={editCourse} deleteCourse={deleteCourse}*/></CourseList>
          <input type="button" value="Add" onClick={onAddCourseClick} /></>
      }
      {shownPage === PageEnum.add && <AddCourse onBackButtonClick={showListPage} onSubmitClick={addCourse}/>}

    </div>
  )
}

export default Courses;
