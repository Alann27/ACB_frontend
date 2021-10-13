import { Drawer, makeStyles } from "@material-ui/core";
import ListMenu from "./ListMenu.jsx";

const useStyles = makeStyles((theme) => ({
  drawerWidth: {
    width: 185,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 185,
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Menu(props) {
  const classes = useStyles();

  return (
      <>
      <Drawer style={props.isVisible === false ? { display: 'none'} : null}
        className={classes.drawerWidth}
        variant={props.variant}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        open={props.open}
        onClose={props.onClose ? props.onClose : null}
      >
        <div className={classes.toolbar} />
        <ListMenu/>
      </Drawer>
      </>
  );
}
