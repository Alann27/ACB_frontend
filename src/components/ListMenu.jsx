import {
  List,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function ListMenu() {
  return (
    <>
      <Divider />
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Incomes" />
        </ListItem>
      </List>
      <Divider />
    </>
  );
}
