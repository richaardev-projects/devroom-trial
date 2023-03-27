import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { UserContext } from "../context/UserContext";

import { UserForm } from "./UserForm";

describe("UserForm", () => {
  test("should the form is submitting correctly when all fields are filled", async () => {
    const addUser = vi.fn();

    render(
      <UserContext.Provider value={{ addUser, users: [], loading: false }}>
        <UserForm />
      </UserContext.Provider>,
    );

    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const phoneInput = screen.getByPlaceholderText("Phone");
    const submitButton = screen.getByRole("button");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
      expect(phoneInput).toHaveValue("");

      expect(addUser).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        id: expect.anything(),
      });
    });
  });

  test("should display error alert when some field is not filled", async () => {
    window.alert = vi.fn();

    render(
      <UserContext.Provider value={{ addUser: vi.fn(), users: [], loading: false }}>
        <UserForm />
      </UserContext.Provider>,
    );

    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const phoneInput = screen.getByPlaceholderText("Phone");
    const submitButton = screen.getByRole("button");

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(phoneInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith("All fields need to be filled");
  });

  test("should show an alert when is not to able make the request", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("TEST - Failed to fetch data"));
    console.log = vi.fn();
    window.alert = vi.fn();
    const addUser = vi.fn();

    render(
      <UserContext.Provider value={{ addUser, users: [], loading: false }}>
        <UserForm />
      </UserContext.Provider>,
    );

    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const phoneInput = screen.getByPlaceholderText("Phone");
    const submitButton = screen.getByRole("button");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(addUser).toHaveBeenCalledTimes(0);
      expect(window.alert).toHaveBeenCalledTimes(1);
    });
  });
});
