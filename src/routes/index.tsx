import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Users from "../Pages/Users/Users";
import CreateUser from "../Pages/Users/CreateUser";
import EditUser from "../Pages/Users/EditUser";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={'/dashboard'} element={<PrivateRoutes component={Dashboard} />} />
        <Route path={'/users'} element={<PrivateRoutes component={Users} />} />
        <Route path={'/users/create'} element={<PrivateRoutes component={CreateUser} />} />
        <Route path={'/users/edit/:id'} element={<PrivateRoutes component={EditUser} />} />

        {/* <Route element={<PrivateRoutes component={undefined} />}>
          <Route path={'/dashboard'} element={<Dashboard />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router 