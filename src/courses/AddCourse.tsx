import { FormEvent, useEffect, useState } from "react";
import { Course } from "../data/Course";
import "./AddCourse.style.css";
import { useFormInputValidation } from "react-form-input-validation";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Teacher } from "../data/Teacher";
import { Subject } from "../data/Subject";
import { useForm } from "react-hook-form";

type Props = {
    onBackButtonClick: () => void;
    onSubmitClick: (data: Course) => void;
}

type CourseSubmitForm = {
    subject: Subject;
    teacher: Teacher;
    type: string;
    duration: number;
    hoursReq: number;
};

const AddEmployee = (props: Props) => {
    const { onBackButtonClick, onSubmitClick } = props;

    const validationSchema = Yup.object().shape({
        subject: Yup.object().required("Subject is required"),
        teacher: Yup.object().required("Teacher is required"),
        type: Yup.string()
        .required("Duration is required!")
        .max(10, "Type must not exceed 10 characters")
        .matches(/^[a-zA-Z]+$/),
        duration: Yup.number()
        .required("Duration is required")
        .max(10,"Duration must not exceed 10 characters"),
        hoursReq: Yup.number()
        .required("Hours required is required")
        .positive("Number must be positive")
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CourseSubmitForm>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: CourseSubmitForm) => {
        onSubmitClick(data);
        onBackButtonClick();
    }
    
    return (
        <div className="form-container">
            <div>
                <h1>Add new course!</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className = "addCourseForm">
                <div className = "form-group">
                    <label>Subject: </label>
                    <select ></select>
                    <input type="text" {...register('subject')} className={`form-control ${errors.subject ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.subject?.message}</div>
                </div>
                <div className = "form-group">
                    <label>Teacher: </label>
                    <input type="text" {...register('teacher')} className={`form-control ${errors.teacher ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.teacher?.message}</div>
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
    )
}
export default AddEmployee;