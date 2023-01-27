import { ScheduleForDay } from "../data/ScheduleForDay";

export function RenderRows(scheduleForDay : ScheduleForDay[]): JSX.Element[] {
    return scheduleForDay.map(function (val, i) {
      return (
        <tr key={i}>
          <td className="day-column">{val["day"]}</td>
          <td>{val["firstTimestamp"]}</td>
          <td>{val["secondTimestamp"]}</td>
          <td>{val["thirdTimestamp"]}</td>
          <td>{val["fourthTimestamp"]}</td>
          <td>{val["fifthTimestamp"]}</td>
          <td>{val["sixthTimestamp"]}</td>
        </tr>
      );
    });
  }
