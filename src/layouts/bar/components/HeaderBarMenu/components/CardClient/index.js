import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { SwipeableListItem } from "@sandstreamdev/react-swipeable-list";
import PropTypes from "prop-types";
import { APP_COLORS } from "config/contants";

export default function CardClient({ data, onClickClient }) {
  const handleClickClient = (client) => onClickClient(client);

  const handleSwipeLeft = {
    content: <div style={{ background: APP_COLORS.success, width: "100%", height: "100%" }} />,
    action: () => console.info("swipe action triggered left"),
  };

  const handleSwipeRight = {
    content: <div style={{ background: APP_COLORS.warning, width: "100%", height: "100%" }} />,
    action: () => console.info("swipe action triggered right"),
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper", paddingLeft: 1 }}>
      {data.map((client) => (
        <SwipeableListItem
          rol="button"
          swipeLeft={handleSwipeLeft}
          swipeRight={handleSwipeRight}
          onSwipeProgress={(progress) => console.info(`Swipe progress: ${progress}%`)}
        >
          <>
            <ListItem
              key={client.id}
              alignItems="flex-start"
              style={{ width: "100%" }}
              onClick={() => handleClickClient(client)}
            >
              <ListItemAvatar>
                <Avatar
                  alt={`${client.nombres} ${client.apellidos}`}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${client.nombres} ${client.apellidos}`}
                style={{ color: "black" }}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      CC: {client.documento} - Dir:{client.direccion}
                    </Typography>
                    <br />
                    {`${client.observaciones}`}
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        </SwipeableListItem>
      ))}
    </List>
  );
}

CardClient.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  onClickClient: PropTypes.func.isRequired,
};
