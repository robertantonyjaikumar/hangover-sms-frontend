import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { decryptData } from "../Utils/helpers";

import LTheme from "../Components/Layouts/LTheme";

interface PrivateRoutesProps {
  component: React.ComponentType<any>;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ component: Component }) => {
  const udData = useSelector((state: any) => state.user);

  const locData: any = decryptData();
  if (udData?.userData?.length > 0 || locData?.role) {
    return <LTheme><Component /></LTheme>; // Render the passed component
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoutes;