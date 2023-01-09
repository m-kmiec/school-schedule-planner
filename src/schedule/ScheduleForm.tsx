import { FormEvent } from "react";
import { Button, Form } from "react-bootstrap";

function ScheduleForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <>
      <h1> Create schedule: </h1>
      <h4> Monday </h4>
      <Form className="mt-3 mb-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="">
          <Form.Label> 8:00-8:45 </Form.Label>
          <Form.Select>
            <option value="">none</option>
            <option value="przyroda">science</option>
            <option value="matematyka">maths</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default ScheduleForm;
