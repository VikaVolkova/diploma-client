import * as React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import useAuth from "../../useAuth";
import roles from "../../constants/roles";

function AccountMenu() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userNameFirstLetter = user.name.substr(0, 1).toUpperCase();
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {userNameFirstLetter}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {[roles.admin, roles.manager].includes(user.role) && (
          <MenuItem>
            <ListItemIcon>
              <NoteAddOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Link href="/create-article" underline="none">
              {"Create new article"}
            </Link>
          </MenuItem>
        )}
        {[roles.admin, roles.manager].includes(user.role) && (
          <MenuItem>
            <ListItemIcon>
              <NewspaperOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Link href="/unpublished" underline="none">
              {"Unpublished articles"}
            </Link>
          </MenuItem>
        )}
        {[roles.admin, roles.manager].includes(user.role) && (
          <MenuItem>
            <ListItemIcon>
              <NewspaperOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Link href="/unpublished-comments" underline="none">
              {"Unpublished comments"}
            </Link>
          </MenuItem>
        )}
        {[roles.admin].includes(user.role) && (
          <MenuItem>
            <ListItemIcon>
              <AddBoxOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Link href="/create-category" underline="none">
              {"Create new category"}
            </Link>
          </MenuItem>
        )}
        {[roles.admin].includes(user.role) && (
          <MenuItem>
            <ListItemIcon>
              <NewspaperOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Link href="/credentials" underline="none">
              {"Credentials"}
            </Link>
          </MenuItem>
        )}
        {[roles.user].includes(user.role) && (
          <MenuItem>
            <ListItemIcon>
              <AssignmentOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Link href="/" underline="none">
              {"Read all news"}
            </Link>
          </MenuItem>
        )}

        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Link
            underline="none"
            component="button"
            variant="body1"
            onClick={logout}
          >
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu;
