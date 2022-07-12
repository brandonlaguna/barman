export const cardImageStyle = ({ background, shadow }) => [
  {
    height: "100px",
    boxShadow: !shadow && "none",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
];

export const textCardStyle = () => [
  {
    color: "green",
  },
];

export const cardContainerStyle = () => {
  const style = {
    background: "white",
    color: "black",
    borderRadius: "12px",
    paddingTop: "3px",
    textAlign: "center",
  };
  return style;
};

export function CategoryContainerStyle(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, transparentSidenav, whiteSidenav, darkMode, sidenavColor, height } = ownerState;

  const { white, transparent, dark, grey, gradients } = palette;
  const { md } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem, rgba, linearGradient } = functions;

  return {
    background: active
      ? linearGradient(gradients[sidenavColor].main, gradients[sidenavColor].state)
      : transparent.main,
    color: (!darkMode && !active) || (whiteSidenav && !active) ? dark.main : white.main,
    alignItems: "center",
    width: "100%",
    height: height - 145,
    padding: `${pxToRem(8)} ${pxToRem(10)}`,
    margin: `${pxToRem(1.5)} ${pxToRem(16)}`,
    borderRadius: borderRadius.md,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxShadow: active && !whiteSidenav && !darkMode && !transparentSidenav ? md : "none",
    [breakpoints.up("xl")]: {
      transition: transitions.create(["box-shadow", "background-color"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      }),
    },

    "&:hover, &:focus": {
      backgroundColor: () => {
        let backgroundValue;

        if (!active) {
          backgroundValue =
            transparentSidenav && !darkMode
              ? grey[300]
              : rgba(whiteSidenav ? grey[400] : white.main, 0.2);
        }

        return backgroundValue;
      },
    },
  };
}

export function ModalItemDescriptionStyle(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, transparentSidenav, whiteSidenav, darkMode } = ownerState;
  const { white, transparent, dark } = palette;
  const { md } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    background: active ? "white" : transparent.main,
    color: (!darkMode && !active) || (whiteSidenav && !active) ? dark.main : white.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "400px",
    minHeight: "50%",
    maxHeight: "80%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    padding: `${pxToRem(10)} ${pxToRem(10)}`,
    borderRadius: borderRadius.md,
    whiteSpace: "nowrap",
    boxShadow: active && !whiteSidenav && !darkMode && !transparentSidenav ? md : "none",
    [breakpoints.up("xl")]: {
      transition: transitions.create(["box-shadow", "background-color"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      }),
    },
  };
}
