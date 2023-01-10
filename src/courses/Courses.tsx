import React, { Component } from 'react'
import { useEffect, useState } from "react";
import { Course, PageEnum, tmpList } from '../data/Course';
import MaterialTable from 'material-table';
import CourseList from './CourseList';
import AddCourse from './AddCourse';

function Courses() {
  const [courses, setCourses] = useState(tmpList as Course[]);

  const [shownPage, setShownPage] = useState(PageEnum.list)

  const onAddCourseClick = () => {
    setShownPage(PageEnum.add);
  }

  const showListPage = () => {
    setShownPage(PageEnum.list);
  }

  const addCourse = (data: Course) => {
    setCourses([...courses,data]);
  }


  return (
    <div className="Courses">
      <h1>Courses</h1>
      {shownPage === PageEnum.list &&
        <><CourseList list={courses}></CourseList>
          <input type="button" value="Add" onClick={onAddCourseClick} /></>
      }
      {shownPage === PageEnum.add && <AddCourse onBackButtonClick={showListPage} onSubmitClick={addCourse}/>}

    </div>
  )
}

export default Courses;
