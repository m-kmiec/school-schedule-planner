import { Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import Courses from "../courses/Courses";
import Groups from "../groups/Groups";
import Home from "../Home";
import Schedule from "../schedule/Schedule";
import logo from "./logo192.png";

function Navigation() {
  return (
    <Router>
    <Navbar bg="dark" variant="dark">    
          <Navbar.Brand>
          <img
              alt="logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            School Schedule Planner
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
            <Nav.Link as={Link} to={"/courses"}>Courses</Nav.Link>
            <Nav.Link as={Link} to={"/groups"}>Groups</Nav.Link>
          </Nav>
      </Navbar>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/courses" element={<Courses/>} />
         <Route path="/groups" element={<Groups/>} />
         <Route path="/schedule" element={<Schedule/>}>
            <Route path=":className" element={<Schedule/>} />
         </Route>
      </Routes>
    </Router>
  );
}

export default Navigation;