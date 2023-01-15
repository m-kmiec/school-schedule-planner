import { FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../data/Course";
import { ScheduleForDay } from "../data/ScheduleForDay";
import Service from "../service/Service";
import "./ScheduleForm.style.css";

export type Day = {
  label: string;
};

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
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    Service.getDays()
      .then((res) => {
        setDays(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    const [{ data: fetchedCourses }, { data: fetchedAdditionalCourses }] =
      await Promise.all([
        Service.getCourses(),
        Service.getAdditionalCourses(props.className),
      ]);

    setCourses([
      {
        subject: { name: "", abbre: "", isMandatory: true },
        teacher: { name: "", surrname: "" },
        type: "",
        duration: 45,
        hoursReq: 4,
      },
      ...fetchedCourses.filter(
        (c: { subject: { isMandatory: boolean } }) =>
          c.subject.isMandatory === true
      ),
      ...fetchedAdditionalCourses[0].additionalCourses,
    ]);
  };

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

    Service.postScheduleForDay(scheduleForDay)
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
    <div className="form">
      <div className="schedule">
        <h1> Create schedule for {props.className}: </h1>
      </div>
      <Form className="mt-3 mb-3" onSubmit={handleSubmit}>
        <Form.Group className="day-select">
          <Form.Label> Day you want to add: </Form.Label>
          <Form.Select
            className="form-select"
            value={selectedDay}
            onChange={(e) => setDay(e.target.value)}
          >
            {days.map((day) => (
              <option key={day.label} value={day.label}>
                {day.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {renderFormGroup("8:00-8:45", first, setFirst)}
        {renderFormGroup("8:55-9:40", second, setSecond)}
        {renderFormGroup("9:50-10:35", third, setThird)}
        {renderFormGroup("10:55-11:40", fourth, setFourth)}
        {renderFormGroup("11:50-12:35", fifth, setFifth)}
        {renderFormGroup("12:45-13:30", sixth, setSixth)}
        <div className="submit-button">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ScheduleForm;
