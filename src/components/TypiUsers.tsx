/**
 * [✓] Create a ReactJS component that displays a list of users retrieved from the following API endpoint: https://jsonplaceholder.typicode.com/users.
 * [✓] The component should display the user's name, email, and phone number.
 * [✓] Use the fetch() method to retrieve the data from the API.
 */

import React from "react";
import { useUserContext } from "../context/UserContext";

export const TypiUsers: React.FC = () => {
  const { users, loading } = useUserContext()

  return (
    <div className="users-list">
      {(users && users.length > 0) ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, name, email, phone }, i) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <p>There is not users to show</p>
      )}
    </div>
  );
};
