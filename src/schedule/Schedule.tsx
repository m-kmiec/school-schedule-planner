import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Service from "../service/Service";
import DeleteSchedule from "./DeleteSchedule";
import ScheduleForm from "./ScheduleForm";
import "./Schedule.style.css";
import { ScheduleForDay } from "../data/ScheduleForDay";
import { RenderRows } from "./RenderRows";

function Schedule() {
  const { className } = useParams();
  const [submitButtonClick, setSubmitButtonClick] = useState(false);
  const [deleteButtonClick, setDeleteButtonClick] = useState(false);
  const [scheduleForDay, setScheduleForDay] = useState<ScheduleForDay[]>([]);

  useEffect(() => {
    Service.getScheduleForGroup(className)
      .then((res) => {
        setScheduleForDay(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [className]);

  const createClick = () => {
    setSubmitButtonClick(submitButtonClick ? false : true);
  };

  const deleteClick = () => {
    setDeleteButtonClick(deleteButtonClick ? false : true);
  };

  return (
    <div>
      <h1 className="schedule"> {className}'s schedule </h1>
      <Table id="myTable" striped="columns">
        <thead>
          <tr>
            <th></th>
            <th>8:00-8:45</th>
            <th>8:55-9:40</th>
            <th>9:50-10:35</th>
            <th>10:55-11:40</th>
            <th>11:50-12:35</th>
            <th>12:45-13:30</th>
          </tr>
        </thead>
        <tbody>{RenderRows(scheduleForDay)}</tbody>
      </Table>
      <div className="buttons">
        <Button className="create-button "onClick={createClick}> Create Schedule </Button>
        <Button className="delete-button" onClick={deleteClick} variant="danger">
          Delete Schedule
        </Button>
      </div>
      <div>{submitButtonClick && <ScheduleForm className={className!} />}</div>
      <div>
        {deleteButtonClick && (
          <DeleteSchedule
            className={className!}
            schedules={scheduleForDay}
          ></DeleteSchedule>
        )}
      </div>
    </div>
  );
}

export default Schedule;
