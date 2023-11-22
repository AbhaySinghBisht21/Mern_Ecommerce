import React, { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
// import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import { logout } from "../../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import "./Header.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const UserOption = ({ user }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);

  const actions = [
    { icon: <ListAltRoundedIcon />, name: "Orders", func: orders },
    { icon: <PersonOutlineTwoToneIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartOutlinedIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppTwoToneIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    actions.unshift({
      icon: <GridViewRoundedIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      {/* <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}> */}
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/logo192.png"}
            alt="Profile"
          />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={action.func}
            tooltipTitle={action.name}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
      {/* </Box> */}
      {/* </Backdrop> */}
    </Fragment>
  );
};

export default UserOption;
