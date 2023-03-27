import { createContext, useContext, useEffect, useState } from "react";
import { JsonPlaceHolderUser } from "../@types/jsonplaceholder";

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export type UserContextType = {
  loading: boolean;
  users: User[];
  addUser: (user: User) => void;
};

export const useUserContext = () => useContext(UserContext);
export const UserContext = createContext({} as UserContextType);

async function getUsers(): Promise<User[]> {
  return fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Error on fetching users: ${response.status} ${response.statusText}`);
    }

    const data: JsonPlaceHolderUser[] = await response.json();
    return data.map(({ id, name, email, phone }) => ({ id: id, name, email, phone }));
  });
}

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const addUser = (user: User) => {
    setUsers((users) => [user, ...users]);
  };

  useEffect(() => {
    getUsers().then(setUsers);
    setLoading(false)
  }, []);
  return <UserContext.Provider value={{ loading, users, addUser }}>{children}</UserContext.Provider>;
}
