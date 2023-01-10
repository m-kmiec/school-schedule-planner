import { FormEvent, useState } from "react";
import { Course } from "../data/Course";
import "./AddCourse.style.css";

type Props = {
  onBackButtonClick: () => void;
  onSubmitClick: (data: Course) => void;
};

const AddEmployee = (props: Props) => {
  const { onBackButtonClick, onSubmitClick } = props;
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [hoursReq, setHoursReq] = useState("");

  // const validationSchema = Yup.object().shape({
  //     subject: Yup.string().required("This field is required"),
  //     teacher: Yup.string().required("This field is required"),
  //     type: Yup.string().required("This field is required"),
  //     duration: Yup.string().required("This field is required"),
  //     hoursReq: Yup.string().required("This field is required"),
  // })

  const onSubjectChanged = (e: any) => {
    setSubject(e.target.value);
  };

  const onTeacherChanged = (e: any) => {
    setTeacher(e.target.value);
  };

  const onTypeChanged = (e: any) => {
    setType(e.target.value);
  };

  const onDurationChanged = (e: any) => {
    setDuration(e.target.value);
  };

  const onHoursReqChanged = (e: any) => {
    setHoursReq(e.target.value);
  };

  const onSubmitButtonClick = (e: FormEvent) => {
    e.preventDefault();
    const data: Course = {
      subject: {
        name: subject,
        abbre: subject.substring(0, 4),
        isMandatory: false,
      },
      teacher: { name: teacher, surrname: "Kowalski" },
      type: type,
      duration: parseInt(duration),
      hoursReq: parseInt(hoursReq),
    };
    onSubmitClick(data);
    onBackButtonClick();
  };

  return (
    <div className="form-container">
      <div>
        <h1>Add new course!</h1>
      </div>
      <form onSubmit={onSubmitButtonClick}>
        <div>
          <label>Subject: </label>
          <input
            type="text"
            required
            value={subject}
            onChange={onSubjectChanged}
          />
        </div>
        <div>
          <label>Teacher: </label>
          <input
            type="text"
            required
            value={teacher}
            onChange={onTeacherChanged}
          />
        </div>
        <div>
          <label>Type: </label>
          <input type="text" required value={type} onChange={onTypeChanged} />
        </div>
        <div>
          <label>Duration: </label>
          <input
            type="number"
            required
            value={duration}
            onChange={onDurationChanged}
          />
        </div>
        <div>
          <label>Hours required: </label>
          <input
            type="number"
            required
            value={hoursReq}
            onChange={onHoursReqChanged}
          />
        </div>
        <div>
          <input type="button" value="Back" onClick={onBackButtonClick} />
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
};
export default AddEmployee;
