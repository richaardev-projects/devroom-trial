/**
 * Controlled Form
 */

import React, { useState } from "react";
import { User, useUserContext } from "../context/UserContext";

async function updateUsers(data: Omit<User, "id">): Promise<User> {
  return fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Error on updating users: ${response.status} ${response.statusText}`);
    }

    const data: User = await response.json();
    return data;
  });
}

type UserFormProps = {
  // addUser: (user: User) => void;
};

export const UserForm: React.FC<UserFormProps> = ({}) => {
  const { addUser } = useUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // lets check if all fields are not empty
    if (name === "" && email === "" && phone === "") {
      alert("All fields need to be filled");
      return;
    }

    clearForm();
    updateUsers({ name, email, phone })
      .then(addUser)
      .catch((err) => {
        console.log(err);
        alert("Failed to add new user, see error in console");
      });
  };
  return (
    <form method="POST" onSubmit={handleFormSubmit}>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        placeholder="Name"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        type="text"
        placeholder="Phone"
      />
      <button type="submit">Add User</button>
    </form>
  );
};
