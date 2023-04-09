import { IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { APP_COLORS } from "config/contants";
import ClickNHold from "react-click-n-hold";

export default function CircleButton({ iconPath, sx, sxIcon, onClick, badgeAlert, onHold, title }) {
  return (
    <div style={{ alignItems: "center", textAlign: "center" }}>
      <ClickNHold time={1} onClickNHold={onHold}>
        <IconButton variant="outlined" style={sx} onClick={onClick}>
          <img src={iconPath} style={sxIcon} alt="category icon" />
          {badgeAlert > 0 ? (
            <span
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "9px",
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
      <Typography
        component="p"
        variant="button"
        fontWeight="300"
        textTransform="capitalize"
        color="white"
        opacity={0.5}
        sx={{ fontSize: 8, width: "100%", marginTop: "-9px" }}
      >
        {title}
      </Typography>
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
  title: "",
};

CircleButton.propTypes = {
  iconPath: PropTypes.string.isRequired,
  sx: PropTypes.instanceOf(Array),
  sxIcon: PropTypes.instanceOf(Array),
  onClick: PropTypes.func.isRequired,
  badgeAlert: PropTypes.bool,
  onHold: PropTypes.func,
  title: PropTypes.string,
};
