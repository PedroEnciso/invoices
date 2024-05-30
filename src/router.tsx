import { Navigate, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import InvoicesPage from "./pages/InvoicesPage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";

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
      {
        path: ":id",
        element: <InvoiceDetailPage />,
      },
    ],
  },
]);
