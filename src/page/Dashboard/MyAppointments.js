import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`http://localhost:5000/booking?patient=${user.email}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}` 
      }
    })
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, [user]);
  return (
    <div>
      <h1>MyAppointment: {appointments.length}</h1>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>date</th>
              <th>Time</th>
              <th>Treatment</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, ind) => (
              <tr>
                <th>{ind}</th>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
