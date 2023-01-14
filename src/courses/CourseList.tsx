import { Row } from "react-bootstrap";
import { Course } from "../data/Course";
import "./CourseList.style.css";

type Props = {
    list: Course[],
    editCourse: (id:number) => void,
    deleteCourse: (id:number) => void
}


const CourseList = (props: Props) => {

    const { list, editCourse, deleteCourse } = props;

    const handleEditClick = (e: React.MouseEvent<HTMLInputElement>, id: number) => {
        e.preventDefault();
        // console.log("Edit button works, row " + id);
        editCourse(id);
    }
    
    const handleDeleteClick = (e: React.MouseEvent<HTMLInputElement>, id: number) => {
        e.preventDefault();
        // console.log("Delete button works, row " + id);
        deleteCourse(id);
    }
    
    let id: string = "0";
    return (<div>This is courses list page
        <table id="tableID">
            <tbody>
            <tr>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Hours required</th>
                <th>Action</th>
            </tr>
            {list.map((course,id) => {
                return (
                    <tr key={id}>
                        <td>{course.subject.name}</td>
                        <td>{course.teacher.surrname}</td>
                        <td>{course.type}</td>
                        <td>{course.duration}</td>
                        <td>{course.hoursReq}</td>
                        <td>
                            <div>
                            <input type="button" value="Edit"  onClick={(e) => handleEditClick(e,id+1) }/>
                            <input type="button" value="Delete" onClick={(e) => handleDeleteClick(e,id+1)}/>
                            </div>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>
    )
}
export default CourseList;