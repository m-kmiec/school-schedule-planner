import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { StudentGroup } from "./data/StudentGroups";
import Service from "./service/Service";
import "./Home.style.css";

function Home() {
  const [studentGroups, setStudentGroups] = useState<StudentGroup[]>([]);

  useEffect(() => {
    Service.getStudentGroups()
      .then((res) => {
        setStudentGroups(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="title">
        <h1>Select students group:</h1>
      </div>
      <div className="list">
        <ListGroup>
          {studentGroups
            ? studentGroups.map((studentGroup) => {
                return (
                  <Link
                    className="link"
                    to={`schedule/${studentGroup.name}`}
                    key={studentGroup.id}
                  >
                    <ListGroup.Item action variant="light">
                      {studentGroup.name}
                    </ListGroup.Item>
                  </Link>
                );
              })
            : " "}
        </ListGroup>
      </div>
    </div>
  );
}

export default Home;
