import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path={'/'} element={<Login />} /> */}
        <Route path={'/'} element={<PrivateRoutes component={Dashboard} />} />

        {/* <Route element={<PrivateRoutes component={undefined} />}>
          <Route path={'/dashboard'} element={<Dashboard />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router 