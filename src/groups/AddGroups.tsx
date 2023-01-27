import React, { FormEvent, useEffect, useState } from "react";
import { StudentGroup } from "../data/StudentGroups";
import "./AddGroups.style.css";
import { useFormInputValidation } from "react-form-input-validation";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import Service from "../service/Service";
import { Course } from "../data/Course";
import PropTypes from 'prop-types';


type Props = {
  onBackButtonClick: () => void;
  onSubmitClick: (data: StudentGroup) => void;
};




const AddGroups = (props: Props) => {
    const { onBackButtonClick, onSubmitClick } = props;

    const [courses, setCourses] = useState([] as Course[]);

    useEffect(() => {
        Service.getCourses()
        .then((response: any) => {
            setCourses(
                response.data.filter(
                    (c: { subject: { isMandatory: boolean } }) =>
                      c.subject.isMandatory === false
                  )
            );
        })
        .catch((e: Error) => {
        console.log(e);
        });
    },[])

    const validationSchema = Yup.object().shape({
        name: Yup.string()
        .required("Student group's name is required!")
        .max(2, "Type must not exceed 2 characters")
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<StudentGroup>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: StudentGroup) => {
        // console.log("Data: " + JSON.stringify(data))
        Service.addGroup(data);
        onSubmitClick(data);
        onBackButtonClick();
    }

    const handleChangeOfCourses = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        const options = event.target.options;
        const selectedItems = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => JSON.parse(option.value))
        setValue("additionalCourses", selectedItems);
    }

    return (
        <div className="form-container">
            <div>
                <h1>Add new group!</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className = "addGroupForm">
            <div className = "form-group">
                    <label>Name: </label>
                    <input type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className = "form-group">
                    <label>Additional courses: </label>
                    <select onChange={handleChangeOfCourses} name='additionalCourses' multiple>
                        {courses.map(c => (
                            <option key = {c.subject.name} value = {JSON.stringify(c)} >
                                {c.subject.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className = "form-group">
                    <input type="button" value="Back" onClick={onBackButtonClick} />
                    <input type="submit" value="Add"/>
                </div>
            </form>
        </div>
  );
};

AddGroups.propTypes = {
    onBackButtonClick: PropTypes.func,
    onSubmitClick: PropTypes.func
}

export default AddGroups;
