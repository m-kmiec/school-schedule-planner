import { Row } from "react-bootstrap";
import { StudentGroup } from "../data/StudentGroups";
import PropTypes from 'prop-types';


type Props = {
    list: StudentGroup[],
    editGroup: (id:number) => void,
    deleteGroup: (id:number) => void
}


const GroupList = (props: Props) => {



    const { list, editGroup, deleteGroup } = props;

    const handleEditClick = (e: React.MouseEvent<HTMLInputElement>, id: number) => {
        e.preventDefault();
        // console.log("Edit button works, row " + id);
        editGroup(id);
    }
    
    const handleDeleteClick = (e: React.MouseEvent<HTMLInputElement>, id: number) => {
        e.preventDefault();
        // console.log("Delete button works, row " + id);
        deleteGroup(id);
    }
    
    let id: string = "0";
    return (<div>This is group list page
        <table id="tableID">
            <tbody>
            <tr>
                <th>Name</th>
                <th>Additional courses</th>
            </tr>
            {list.map((group,id) => {
                return (
                    <tr key={id}>
                        <td>{group.name}</td>
                        <td>
                            {group.additionalCourses.map((i) => (
                                <div key={i.subject.name}>
                                    {i.subject.name}
                                </div>
                            ))}
                        </td>
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

GroupList.propTypes = {
 list: PropTypes.array,
 editGroup: PropTypes.func,
 deleteGroup: PropTypes.func
}
export default GroupList;