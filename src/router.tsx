import { Navigate, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import InvoicesPage from "./pages/InvoicesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/invoices" />,
  },
  {
    path: "/invoices",
    element: <Root />,
    children: [
      {
        index: true,
        element: <InvoicesPage />,
      },
    ],
  },
]);
