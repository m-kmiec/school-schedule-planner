import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { studentGroup } from "./data/StudentGroups";

export default function Home() {
  const [studentGroups, setStudentGroups] = useState<studentGroup[] | null>();

  useEffect(() => {
    fetch("http://localhost:3004/studentGroups")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setStudentGroups(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div>
        <h1>Select students group:</h1>
      </div>
      <ListGroup>
        {studentGroups
          ? studentGroups.map((studentGroup) => {
              return (
                <Link to={`schedule/${studentGroup.name}`} key={studentGroup.id}>
                  <ListGroup.Item>
                    {studentGroup.name}
                  </ListGroup.Item>
                </Link>
              );
            })
          : " "}
      </ListGroup>
    </div>
  );
}
