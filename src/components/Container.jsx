import { Hidden, makeStyles } from "@material-ui/core";
import { useState } from "react";
import AppRouter from "../routers/AppRouter.js";
import Menu from "./Menu.jsx";
import { NavBar } from "./NavBar.jsx";

const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Container() {
  const classes = styles();

  const [menuAndAppBarVisible, setMenuAndAppBarVisible] = useState(false);

  function changeMenuAndAppBarVisibility(visible){
    if (typeof visible === undefined){
      visible = !menuAndAppBarVisible;
    }

    setMenuAndAppBarVisible(visible);
  }

  const [open, setOpen] = useState(false);

  function changeOpenState(){
      setOpen(!open);
  }
  return (
    <div className={classes.root}>
      <NavBar onClickMenu={changeOpenState} isVisible={menuAndAppBarVisible}/>
      <Hidden smDown>
        <Menu variant="permanent" open isVisible={menuAndAppBarVisible}/>
      </Hidden>
            <Hidden mdUp>
        <Menu variant="temporary" open={open} onClose={changeOpenState} isVisible={menuAndAppBarVisible}/>
      </Hidden>
      <div className={classes.content}>
        <div className={classes.toolbar} style={menuAndAppBarVisible === false ? { display: 'none'} : null}/>
        <AppRouter changeMenuAndAppBarVisibility={changeMenuAndAppBarVisibility}/>
      </div>
    </div>
  );
}
