import { IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { APP_COLORS } from "config/contants";
import ClickNHold from "react-click-n-hold";

export default function CircleButton({ iconPath, sx, sxIcon, onClick, badgeAlert, onHold }) {
  return (
    <div style={{ alignItems: "center" }}>
      <ClickNHold
        time={1}
        // onStart={() => console.log("start")}
        onClickNHold={onHold}
        // onEnd={() => console.log("end")}
      >
        <IconButton variant="outlined" style={sx} onClick={onClick}>
          <img src={iconPath} style={sxIcon} alt="category icon" />
          {badgeAlert > 0 ? (
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "10px",
                background: APP_COLORS.success,
                position: "relative",
                top: -10,
                border: "1px white solid",
              }}
            />
          ) : (
            ""
          )}
        </IconButton>
      </ClickNHold>
    </div>
  );
}

CircleButton.defaultProps = {
  sx: {
    height: "65px",
    width: "65px",
    borderRadius: "65px",
    alignItems: "center",
  },
  sxIcon: {
    width: "50px",
    height: "50px",
  },
  badgeAlert: false,
  onHold: () => true,
};

CircleButton.propTypes = {
  iconPath: PropTypes.string.isRequired,
  sx: PropTypes.instanceOf(Array),
  sxIcon: PropTypes.instanceOf(Array),
  onClick: PropTypes.func.isRequired,
  badgeAlert: PropTypes.bool,
  onHold: PropTypes.func,
};
