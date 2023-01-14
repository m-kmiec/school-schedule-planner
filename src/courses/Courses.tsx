import React, { Component } from 'react'
import { useEffect, useState } from "react";
import { Course, PageEnum, tmpList } from '../data/Course';
import CourseList from './CourseList';
import AddCourse from './AddCourse';
import Service from '../service/Service';
import EditCourse from './EditCourse';

function Courses() {
  const [courses, setCourses] = useState([] as Course[]);

  const[editCourseId, setEditCourseId] = useState<number>(0);

  const [shownPage, setShownPage] = useState(PageEnum.list)

  const [idToChange, setIdToChange] = useState<number | null>(null);

  useEffect(() => {
    getAllCourses();
  },[]);

  useEffect(() => {
    if(idToChange === null) return;
    console.log("useEffect after delete");
    getAllCourses();
    setIdToChange(null);
  },[idToChange]);

  const getAllCourses = () => {
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
  };

  const showListPage = () => {
    setShownPage(PageEnum.list);
  };

  const addCourse = (data: Course) => {
    setCourses([...courses,data]);
  }

  const getCourseIdToEdit = (id:number) => {
    setEditCourseId(id);
    setShownPage(PageEnum.edit);
  }

  const editCourse = (data: Course) => {
    setIdToChange(editCourseId);
    Service.editCourse(data,editCourseId);
    getAllCourses();
  }

  const deleteCourse = (id: number) => {
    setIdToChange(id);
    Service.deleteCourse(id);
    getAllCourses();
  }

  return (
    <div className="Courses">
      <h1>Courses</h1>
      {shownPage === PageEnum.list &&
        <><CourseList list={courses} editCourse={getCourseIdToEdit} deleteCourse={deleteCourse}></CourseList>
          <input type="button" value="Add" onClick={onAddCourseClick} /></>
      }
      {shownPage === PageEnum.add && <AddCourse onBackButtonClick={showListPage} onSubmitClick={addCourse}/>}
      {shownPage === PageEnum.edit && <EditCourse onBackButtonClick={showListPage} onSubmitClick={editCourse}></EditCourse>}
    </div>
  );
}

export default Courses;
