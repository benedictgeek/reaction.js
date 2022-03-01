import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Reaction } from "../index";

//test that reaction items clear after set settimeout

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

test("A reactionElement should change postion (animate)", async () => {
  let child = <span>OK!</span>;

  render(<Reaction>{child}</Reaction>);
  fireEvent.click(screen.getByRole("reaction"));
  let reactionElement = null;
  await waitFor(() => {
    reactionElement = screen.getByRole("reactionItem");
  });

  await waitFor(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
  });

  let newTop = reactionElement.style.top;
  let newOpcaity = reactionElement.style.opacity;

  newTop = newTop.slice(0, newTop.length - 2);
  newOpcaity = newOpcaity.slice(0, newOpcaity.length - 2);

  expect(Number(newTop)).toBeLessThan(0);
  expect(Number(newOpcaity)).toBeLessThan(1);
});

test("A reaction elements should have a break point of 30", async () => {
  let child = <span>OK!</span>;

  render(<Reaction>{child}</Reaction>);

  for (let i = 0; i < 35; i++) {
    fireEvent.click(screen.getByRole("reaction"));
  }

  let reactionElements = [];

  await waitFor(() => {
    reactionElements = screen.getAllByRole("reactionItem");
  });

  expect(reactionElements.length).toBe(30);
});
