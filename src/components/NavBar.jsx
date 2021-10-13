import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - 185px)`,
      marginLeft: 185,
    },
  },
}));

export function NavBar(props) {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.appBar} style={props.isVisible === false ? { display: 'none'} : null}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={props.onClickMenu}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Auto Cafe Bar
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
}
