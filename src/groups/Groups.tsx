import React, { Component } from 'react'
import { useEffect, useState } from "react";
import { StudentGroup} from '../data/StudentGroups';
import { PageEnum } from '../data/Course';
// import CourseList from './CourseList';
// import AddCourse from './AddCourse';
import Service from '../service/Service';
import AddGroups from './AddGroups';
import EditGroups from './EditGroups';
import GroupList from './GroupList';
// import EditCourse from './EditCourse';

function Groups() {
  const [groups, setGroups] = useState([] as StudentGroup[]);

  const[editGroupId, setEditGroupId] = useState<number>(0);

  const [shownPage, setShownPage] = useState(PageEnum.list)

  const [idToChange, setIdToChange] = useState<number | null>(null);

  useEffect(() => {
    getAllGroups();
  },[]);

  useEffect(() => {
    if(idToChange === null) return;
    console.log("useEffect after delete");
    getAllGroups();
    setIdToChange(null);
  },[idToChange]);

  const getAllGroups = () => {
    Service.getStudentGroups()
    .then((response: any) => {
      setGroups(response.data)
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  const onAddGroupClick = () => {
    setShownPage(PageEnum.add);
  };

  const showListPage = () => {
    setShownPage(PageEnum.list);
  };

  const addGroup = (data: StudentGroup) => {
    setGroups([...groups,data]);
  }

  const getGroupIdToEdit = (id:number) => {
    setEditGroupId(id);
    setShownPage(PageEnum.edit);
  }

  const editGroup = (data: StudentGroup) => {
    setIdToChange(editGroupId);
    Service.editGroup(data,editGroupId);
    getAllGroups();
  }

  const deleteGroup = (id: number) => {
    setIdToChange(id);
    Service.deleteGroup(id);
    getAllGroups();
  }

  return (
    <div className="Courses">
      <h1>Groups</h1>
      {shownPage === PageEnum.list &&
        <><GroupList list={groups} editGroup={getGroupIdToEdit} deleteGroup={deleteGroup}></GroupList>
          <input type="button" value="Add" onClick={onAddGroupClick} /></>
      }
      {shownPage === PageEnum.add && <AddGroups onBackButtonClick={showListPage} onSubmitClick={addGroup}/>}
      {shownPage === PageEnum.edit && <EditGroups onBackButtonClick={showListPage} onSubmitClick={editGroup}></EditGroups>}
    </div>
  );
}

export default Groups;
