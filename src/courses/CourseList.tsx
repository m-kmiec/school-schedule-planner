import { Course } from "../data/Course";
import "./CourseList.style.css";

type Props = {
    list: Course[],
    // editCourse: (id:number) => void,
    // deleteCourse: (id:number) => void
}


const CourseList = (props: Props) => {

    // const { list, editCourse, deleteCourse } = props;
    const { list } = props;
    return (<div>This is courses list page
        <table>
            <tr>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Hours required</th>
                <th>Action</th>
            </tr>
            {list.map(course => {
                return (
                    <tr>
                        <td>{course.subject.name}</td>
                        <td>{course.teacher.surrname}</td>
                        <td>{course.type}</td>
                        <td>{course.duration}</td>
                        <td>{course.hoursReq}</td>
                        <td>
                            <div>
                            <input type="button" value="Edit" /*onClick={editCourse}*//>
                            <input type="button" value="Delete" /*onClick={deleteCourse}*//>
                            </div>
                        </td>
                    </tr>
                )
            })}

        </table>
    </div>
    )
}
export default CourseList;