import React, { FormEvent, useEffect, useState } from "react";
import { Course } from "../data/Course";
import "./AddCourse.style.css";
import { useFormInputValidation } from "react-form-input-validation";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Teacher } from "../data/Teacher";
import { Subject } from "../data/Subject";
import { useForm } from "react-hook-form";
import Service from "../service/Service";


type Props = {
  onBackButtonClick: () => void;
  onSubmitClick: (data: Course) => void;
};

const AddEmployee = (props: Props) => {
    const { onBackButtonClick, onSubmitClick } = props;

    const [subjects, setSubjects] = useState([] as Subject[]);
    const [teachers, setTeachers] = useState([] as Teacher[]);

    useEffect(() => {
        Service.getSubjects()
        .then((response: any) => {
        setSubjects(response.data);
        })
        .catch((e: Error) => {
        console.log(e);
        });
        Service.getTeachers()
        .then((resp: any) => {
            setTeachers(resp.data);
        })
        .catch((e: Error) => {
            console.log(e);
        })
    },[])

    const validationSchema = Yup.object().shape({
        type: Yup.string()
        .required("Duration is required!")
        .max(10, "Type must not exceed 10 characters")
        .matches(/^[a-zA-Z]+$/),
        duration: Yup.number()
        .required("Duration is required")
        .max(10,"Duration must not exceed 10 hours"),
        hoursReq: Yup.number()
        .required("Hours required is required")
        .positive("Number must be positive")
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<Course>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: Course) => {
        Service.addCourse(data);
        onSubmitClick(data);
        onBackButtonClick();
    }

    const handleChangeOfSubject = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        setValue("subject", JSON.parse(event.target.value));
    }

    const handleChangeOfTeacher = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        setValue("teacher", JSON.parse(event.target.value));
    }

    return (
        <div className="form-container">
            <div>
                <h1>Add new course!</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className = "addCourseForm">
                <div className = "form-group">
                    <label>Subject: </label>
                    <select  onChange={handleChangeOfSubject} name='subject' >
                        {subjects.map(subject => (
                            <option key = {subject.name} value = {JSON.stringify(subject)} >
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className = "form-group">
                    <label>Teacher: </label>
                    <select onChange={handleChangeOfTeacher} name='teacher' >
                        {teachers.map(teacher => (
                            <option key = {teacher.name} value = {JSON.stringify(teacher)} >
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className = "form-group">
                    <label>Type: </label>
                    <input type="text" {...register('type')} className={`form-control ${errors.type ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.type?.message}</div>
                </div>
                <div className = "form-group">
                    <label>Duration: </label>
                    <input type="number" {...register('duration')} className={`form-control ${errors.duration ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.duration?.message}</div>
                </div>
                <div className = "form-group">
                    <label>Hours required: </label>
                    <input type="number" {...register('hoursReq')} className={`form-control ${errors.hoursReq ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.hoursReq?.message}</div>
                </div>
                <div className = "form-group">
                    <input type="button" value="Back" onClick={onBackButtonClick} />
                    <input type="submit" value="Add"/>
                </div>
            </form>

        </div>
      </form>
    </div>
  );
};
export default AddEmployee;
