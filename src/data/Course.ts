import { Subject } from "./Subject"
import { Teacher } from "./Teacher"

export type Course = {
    subject: Subject,
    teacher: Teacher,
    type: string,
    duration: number,
    hoursReq: number
}

export const tmpList: Course[] = [
    {
        subject: {name: "Mathematics",abbre: "Math","isMandatory":true},
        teacher: {name:"Jan",surrname: "Kowalski"},
        type: "science",
        duration: 45,
        hoursReq: 4
    }
]

export enum PageEnum {
    list,
    add,
    edit
}