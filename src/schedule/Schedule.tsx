import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

export default class Schedule extends Component {
  render() {
    return (
        <Table striped="columns">
        <thead>
          <tr>
            <th></th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Michal</td>
            <td></td>
            <td>begoing</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}
