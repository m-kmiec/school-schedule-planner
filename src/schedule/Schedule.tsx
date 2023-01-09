import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ScheduleForm from "./ScheduleForm";

function Schedule() {
  const { className } = useParams();

  return (
    <div>
      <h1> {className} schedule </h1>
      <Table striped="columns">
        <thead>
          <tr>
            <th></th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>8:00-8:45</td>
            <td>Mathematics</td>
            <td>Physics</td>
            <td>English</td>
          </tr>
          <tr>
            <td>8:55-9:40</td>
            <td>Physical Education</td>
            <td>Biology</td>
            <td>Chemistry</td>
          </tr>
          <tr>
            <td>9:50-10:35</td>
            <td colSpan={2}>Mathematics</td>
            <td>English</td>
          </tr>
          <tr>
            <td>10:55-11:40</td>
            <td>Mathematics</td>
            <td></td>
            <td>Chemistry</td>
          </tr>
          <tr>
            <td>11:50-12:35</td>
            <td>History</td>
            <td></td>
            <td>English</td>
          </tr>
          <tr>
            <td>12:45-13:30</td>
            <td>Physics</td>
            <td></td>
            <td>Biology</td>
          </tr>
          <tr>
            <td>13:40-14:25</td>
            <td>Mathematics</td>
            <td></td>
            <td>History</td>
          </tr>
        </tbody>
      </Table>
      <ScheduleForm/>
    </div>
  );
}

export default Schedule;
