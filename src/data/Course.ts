import { Subject } from "./Subject";
import { Teacher } from "./Teacher";

export type Course = {
  subject: Subject;
  teacher: Teacher;
  type: string;
  duration: number;
  hoursReq: number;
};

export enum PageEnum {
  list,
  add,
  edit,
}
