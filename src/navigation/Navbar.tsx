import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import Courses from "../courses/Courses";
import Groups from "../groups/Groups";

function Navigation() {
  return (
    <Router>
    <div>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
          <img
              alt="logo"
              src="logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            School Schedule Planner
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
            <Nav.Link as={Link} to={"/courses"}>Courses</Nav.Link>
            <Nav.Link as={Link} to={"/groups"}>Groups</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
    <div>
      <Routes>
         <Route path="/"/>
         <Route path="/courses" element={<Courses/>}>
         </Route>
         <Route path="/groups" element={<Groups/>}>
         </Route>
      </Routes>
    </div>
    </Router>
  );
}

export default Navigation;