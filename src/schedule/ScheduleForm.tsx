import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../data/Course";
import { ScheduleForDay } from "../data/ScheduleForDay";
import "./ScheduleForm.style.css";

export type Props = {
  className: string;
};

function ScheduleForm(props: Props) {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");
  const [fifth, setFifth] = useState("");
  const [sixth, setSixth] = useState("");
  const [selectedDay, setDay] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3004/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    const scheduleForDay: ScheduleForDay = {
      className: props.className,
      day: selectedDay,
      firstTimestamp: first,
      secondTimestamp: second,
      thirdTimestamp: third,
      fourthTimestamp: fourth,
      fifthTimestamp: fifth,
      sixthTimestamp: sixth,
    };

    axios
      .post("http://localhost:3004/scheduleForDay", scheduleForDay)
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const renderOptions = () => {
    return courses.map((course) => (
      <option key={course.subject.name} value={course.subject.name}>
        {course.subject.name}
      </option>
    ));
  };

  const renderFormGroup = (
    timestamp: string,
    stateValue: string,
    stateFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (
      <Form.Group className="mb-3">
        <Form.Label> {timestamp} </Form.Label>
        <Form.Select
          value={stateValue}
          onChange={(e) => stateFunction(e.target.value)}
        >
          {renderOptions()}
        </Form.Select>
      </Form.Group>
    );
  };

  return (
    <div>
      <div className="kebab-case">
        <h1> Create schedule for {props.className}: </h1>
      </div>
      <Form className="mt-3 mb-3" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label> Day </Form.Label>
          <Form.Control
            type="text"
            value={selectedDay}
            onChange={(e) => setDay(e.target.value)}
          />
          <Form.Text>
            Accepted days: Monday, Tuesday, Wednesday, Thursday and Friday.
          </Form.Text>
        </Form.Group>
        {renderFormGroup("8:00-8:45", first, setFirst)}
        {renderFormGroup("8:55-9:40", second, setSecond)}
        {renderFormGroup("9:50-10:35", third, setThird)}
        {renderFormGroup("10:55-11:40", fourth, setFourth)}
        {renderFormGroup("11:50-12:35", fifth, setFifth)}
        {renderFormGroup("12:45-13:30", sixth, setSixth)}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ScheduleForm;
