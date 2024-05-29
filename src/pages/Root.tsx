import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <p>hi from invoices root</p>
      <Outlet />
    </>
  );
}

export default Root;
