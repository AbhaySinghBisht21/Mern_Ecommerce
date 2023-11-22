import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, useMatch, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, element: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  // const { path } = useMatch();
  return (
    <Fragment>
      {!loading && (isAuthenticated ? <Outlet /> : <Navigate to="/login" />)}
    </Fragment>
  );
};

export default ProtectedRoute;

// <Fragment>
//       {!loading && (isAuthenticated ? <Outlet /> : <Navigate to="/login" />)}
//     </Fragment>

// (
//   isAdmin && user.role !== "admin" ? (
//     <Outlet />
//   ) : (
//     <Navigate to="login" />
//   )
// )

// {
//   /* <Route

//           render={(props) => {
//             if (isAuthenticated) {
//               return <Component {...props} />;
//             } else {
//               return <Navigate to="/login" />;
//             }
//           }}
//         /> */
// }

// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Route, useNavigate } from "react-router-dom"; // Import useNavigate

// const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
//   const navigate = useNavigate(); // Get the navigate function
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return navigate("/login");
//             }

//             if (isAdmin === true && user.role !== "admin") {
//               return navigate("/login");
//             }

//             return <Element {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;
