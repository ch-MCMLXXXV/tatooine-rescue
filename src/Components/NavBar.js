import * as React from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Search from "./Search";
// import Userpage from './Userpage';

const NavBar = ({ token }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tatooine Puppy Rescue!
            </Typography>
            {!token ? (
              <>
                <Button href="/Register" color="inherit">
                  Register
                </Button>
                <Button href="/Login" color="inherit">
                  Login
                </Button>
              </>
            ) : (
              <>
                <Search />
                <Button href="/Home" color="inherit">
                  Home
                </Button>
                <Button href="/Register" color="inherit">
                  Register
                </Button>
                <Button href="/Login" color="inherit">
                  Login
                </Button>
                <Button href="/Logout" color="inherit">
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Typography variant="h2" component="div">
        Tatooine Dogs For Adoption
      </Typography>
    </>
  );
};

export default NavBar;
