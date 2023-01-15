import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Service from "../service/Service";

type DeleteScheduleProps = {
  className: string;
  schedules: any[];
};

function DeleteSchedule(props: DeleteScheduleProps) {
  const [day, setDay] = useState("");

  const deleteScheduleForDay = () => {
    Service.deleteScheduleForDay(day)
      .then(() => {
        console.log(day);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="form">
      <Form className="mt-3 mb-3" onSubmit={deleteScheduleForDay}>
        <Form.Group>
          <Form.Label> Choose day to delete </Form.Label>
          <Form.Select value={day} onChange={(e) => setDay(e.target.value)}>
            {props.schedules.map((schedule) => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.day}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <div className="submit-button-delete">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default DeleteSchedule;
