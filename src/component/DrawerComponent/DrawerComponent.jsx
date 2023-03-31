import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import MenuBookIcon from "@mui/icons-material/MenuBook";
const DrawerComponent = () => {
  const [Open, setOpen] = useState(false);
  const isAuth = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("id");
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("user");
    Cookies.remove("admin");
    dispatch(authActions.logout());
    {
      isAuth ? navigate("user/") : navigate("/admin");
    }
  };
  return (
    <>
      <Drawer open={Open} onClose={() => setOpen(false)}>
        <List>
          <ListItem>
            <ListItemButton>
              {/* <ListItemText>Home</ListItemText> */}
              <ListItemButton>
                <HomeIcon onClick={() => navigate("/user")} />
              </ListItemButton>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              {/* <ListItemText>WishList</ListItemText> */}
              <ListItemButton>
                <MenuBookIcon onClick={() => navigate("/all_books")} />
              </ListItemButton>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemButton>
                <LogoutIcon onClick={logout} />
              </ListItemButton>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <IconButton sx={{ marginLeft: "auto", color: "white" }}>
        <MenuIcon onClick={() => setOpen(!Open)} />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
