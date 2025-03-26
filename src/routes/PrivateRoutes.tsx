// PrivateRoutes.tsx
// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { decryptUserDataLocalStorage } from "../Utils/helpers";

import LTheme from "../Components/Layouts/LTheme";

interface PrivateRoutesProps {
  component: React.ComponentType<any>;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ component: Component }) => {
  // const udData = useSelector((state: any) => state.user);

  // const locData = decryptUserDataLocalStorage();
  return <LTheme><Component /></LTheme>
  // if (udData?.userData?.length > 0 || locData?.Token) {
  //   return <Component />; // Render the passed component
  // } else {
  //   return <Navigate to="/" />;
  // }
};

export default PrivateRoutes;