import { Course } from "../data/Course";

export function RenderOptions(courses: Course[]) {
    return courses.map((course) => (
      <option key={course.subject.name} value={course.subject.name}>
        {course.subject.name}
      </option>
    ));
  }