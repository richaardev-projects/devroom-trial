import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { TypiUsers } from "./TypiUsers";
import { UserContext } from "../context/UserContext";

describe("TypiUsers component", () => {
  test("should render loading text when is loading", async () => {
    render(
      <UserContext.Provider value={{addUser: vi.fn(), users: [], loading: true }}>
        <TypiUsers />
      </UserContext.Provider>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should render empty text when there is not users", async () => {
    render(
      <UserContext.Provider value={{addUser: vi.fn(), users: [], loading: false }}>
        <TypiUsers />
      </UserContext.Provider>,
    );

    expect(screen.getByText("There is not users to show")).toBeInTheDocument();
  })

  test("should render user data when users list is not empty", async () => {
    const users = [
      { id: 1, name: "John Doe", email: "johndoe@example.com", phone: "1234567890" },
      { id: 2, name: "Jane Doe", email: "janedoe@example.com", phone: "0987654321" },
    ];

    render(
      <UserContext.Provider value={{addUser: vi.fn(), users, loading: false }}>
        <TypiUsers />
      </UserContext.Provider>,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("janedoe@example.com")).toBeInTheDocument();
    expect(screen.getByText("0987654321")).toBeInTheDocument();
  });
});
