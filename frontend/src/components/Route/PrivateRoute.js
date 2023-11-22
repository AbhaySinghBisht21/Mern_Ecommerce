import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

// const PrivateRoute = ({ Element }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//   return isAuthenticated ? <Element /> : <Navigate to="/login" />;
// };

const PrivateRoute = ({ Element, isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  // Loading state while user data is being fetched
  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  if (isAdmin === true && user.role !== "admin") {
    // throw new Error("Not Authenticated");
    return <Navigate to="/login" />;
  }
  return <Element />;
};

// ---->Error
// return (
// isAuthenticated ? <Element /> : <Navigate to="/login" />);

// const PrivateRoute = ({ Element }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//   return (
//     <Fragment>
//       {isAuthenticated === false ? <Element /> : <Navigate to="/login" />}
//     </Fragment>
//   );
// };

export default PrivateRoute;
