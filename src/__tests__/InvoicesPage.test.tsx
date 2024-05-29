import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, afterEach, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import InvoicesPage from "../pages/InvoicesPage";

const queryClient = new QueryClient();

describe("testing filter functionality", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <InvoicesPage />
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("filters appear when clicking filter button", async () => {
    await userEvent.click(screen.getByText(/filter/i));
    const paidFilter = screen.getByLabelText(/paid/i);
    expect(paidFilter).toBeDefined();
  });
  test("filters disappear when clicking filter button twice", async () => {
    const filterToggle = screen.getByText(/filter/i);
    await userEvent.click(filterToggle);
    await userEvent.click(filterToggle);
    expect(screen.queryByLabelText(/paid/i)).toBeNull();
  });
  test("all filters are checked by default", async () => {
    await userEvent.click(screen.getByText(/filter/i));
    const filters = screen.getAllByRole("checkbox", { checked: true });
    expect(filters.length).toBe(3);
  });
  test("when filter is unchecked, the status is no longer visible on the screen", async () => {
    await userEvent.click(screen.getByText(/filter/i));
    const filters = screen.getAllByRole("checkbox", { checked: true });
    filters.forEach(async (node) => {
      await userEvent.click(node);
    });
    await userEvent.click(screen.getByText(/filter/i));
    expect(screen.queryAllByText(/paid/i).length).toBe(0);
    expect(screen.queryAllByText(/pending/i).length).toBe(0);
    expect(screen.queryAllByText(/draft/i).length).toBe(0);
  });
  test("when the filter is checked twice, the status is on the screen", async () => {
    await userEvent.click(screen.getByText(/filter/i));
    const filters = screen.getAllByRole("checkbox", { checked: true });
    filters.forEach(async (node) => {
      await userEvent.click(node);
    });
    filters.forEach(async (node) => {
      await userEvent.click(node);
    });
    await userEvent.click(screen.getByText(/filter/i));
    const paidElements = await waitFor(() => screen.getAllByText(/paid/i));
    expect(paidElements.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/pending/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/draft/i).length).toBeGreaterThan(0);
  });
});
