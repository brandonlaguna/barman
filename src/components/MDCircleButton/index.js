import { IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { APP_COLORS } from "config/contants";

export default function CircleButton({ iconPath, sx, sxIcon, onClick, badgeAlert }) {
  return (
    <div style={{ alignItems: "center" }}>
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
};

CircleButton.propTypes = {
  iconPath: PropTypes.string.isRequired,
  sx: PropTypes.instanceOf(Array),
  sxIcon: PropTypes.instanceOf(Array),
  onClick: PropTypes.func.isRequired,
  badgeAlert: PropTypes.bool,
};
