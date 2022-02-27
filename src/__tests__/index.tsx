import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Reaction } from "../index";

//test that an item animates (changed position)
//test the break point for item clear

test("A reaction click produces a reaction element", async () => {
  let child = <span>OK!</span>;

  render(<Reaction>{child}</Reaction>);
  fireEvent.click(screen.getByRole("reaction"));
  let reactionElement = null;
  await waitFor(() => {
    reactionElement = screen.getByRole("reactionItem");
  });

  expect(reactionElement).not.toBeNull();
});

test("Multiple reaction clicks produces same number of reaction elements", async () => {
  let numberofClicks = 5;
  let child = <span>🥳</span>;

  render(<Reaction>{child}</Reaction>);
  for (let i = 0; i < numberofClicks; i++) {
    fireEvent.click(screen.getByRole("reaction"));
  }
  let reactionElements = [];
  await waitFor(() => {
    reactionElements = screen.getAllByRole("reactionItem");
  });

  expect(reactionElements.length).toBe(numberofClicks);
});
