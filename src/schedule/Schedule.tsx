import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ScheduleForDay } from "../data/ScheduleForDay";
import ScheduleForm from "./ScheduleForm";

function Schedule() {
  const { className } = useParams();
  const [clicked, setClicked] = useState(false);
  const [scheduleForDay, setScheduleForDay] = useState<ScheduleForDay[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3004/scheduleForDay?className=" + className)
      .then((res) => {
        setScheduleForDay(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [className]);

  const handleClick = () => {
    setClicked(clicked ? false : true);
  };

  const renderRows = () => {
    return scheduleForDay.map(function (val, i) {
      return (
        <tr key={i}>
          <td>{val["day"]}</td>
          <td>{val["firstTimestamp"]}</td>
          <td>{val["secondTimestamp"]}</td>
          <td>{val["thirdTimestamp"]}</td>
          <td>{val["fourthTimestamp"]}</td>
          <td>{val["fifthTimestamp"]}</td>
          <td>{val["sixthTimestamp"]}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h1> {className}'s schedule </h1>
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
        <tbody>{renderRows()}</tbody>
      </Table>
      <div>
        <Button onClick={handleClick}> Create Schedule </Button>
        <Button variant="danger"> Delete Schedule </Button>{" "}
      </div>
      {clicked && <ScheduleForm className={className!} />}
    </div>
  );
}

export default Schedule;
