import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogForm from "./BlogForm";
import UserEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = UserEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText("write title");
  const inputAuthor = screen.getByPlaceholderText("write author");
  const inputUrl = screen.getByPlaceholderText("write url");

  const createButton = screen.getByText("create");

  await user.type(inputTitle, "testing a form...");
  await user.type(inputAuthor, "testing a form...");
  await user.type(inputUrl, "testing a form...");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].content).toBe("testing a form...");
  expect(createBlog.mock.calls[0][1].content).toBe("testing a form...");
  expect(createBlog.mock.calls[0][2].content).toBe("testing a form...");
});
