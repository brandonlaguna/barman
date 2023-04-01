import { useState } from "react";
import { Box } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import PauseIcon from "@mui/icons-material/Pause";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
// import { APP_COLORS } from "config/contants";
import "./style.css";

function StatusIcon({ status }) {
  const [open, setOpen] = useState(false);
  const drawerToggle = () => {
    setOpen(!open);
  };

  const Icon = () => {
    let returnIcon = null;

    switch (status) {
      case 1:
        returnIcon = <PauseIcon color="warning" />;
        break;
      case 2:
        returnIcon = <SyncIcon style={{ animation: `spin 1s linear infinite` }} color="info" />;
        break;
      case 3:
        returnIcon = <CloudDoneIcon color="success" />;
        break;
      case 4:
        returnIcon = <SyncProblemIcon color="error" />;
        break;
      default:
        returnIcon = null;
        break;
    }

    return returnIcon;
  };

  return (
    <Box>
      <IconButton aria-label="open drawer" onClick={drawerToggle} edge="start">
        <Icon />
      </IconButton>
    </Box>
  );
}

StatusIcon.propTypes = {
  status: PropTypes.number.isRequired,
};

export default StatusIcon;
