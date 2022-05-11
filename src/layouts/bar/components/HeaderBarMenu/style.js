export function HeaderStyle(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = ownerState;

  const { white, transparent, dark, grey, gradients } = palette;
  const { md } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem, rgba, linearGradient } = functions;

  return {
    background: active
      ? linearGradient(gradients[sidenavColor].main, gradients[sidenavColor].state)
      : transparent.main,
    color: (!darkMode && !active) || (whiteSidenav && !active) ? dark.main : white.main,
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${pxToRem(8)} ${pxToRem(10)}`,
    margin: `${pxToRem(1.5)} ${pxToRem(16)}`,
    borderRadius: borderRadius.md,
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

export function ModalStyle(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, transparentSidenav, whiteSidenav, darkMode } = ownerState;
  const { white, transparent, dark, grey } = palette;
  const { md } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem, rgba } = functions;

  return {
    background: active ? "white" : transparent.main,
    color: (!darkMode && !active) || (whiteSidenav && !active) ? dark.main : white.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "80%",
    height: "90%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    display: "flex",
    alignItems: "center",
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

export function ModalClientStyle(theme, ownerState) {
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
    width: "40%",
    height: "90%",
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

export function ModalPaymentMethodsStyle(theme, ownerState) {
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
    width: "40%",
    height: "90%",
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

export function ModalTypeTransactionStyle(theme, ownerState) {
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
    width: "40%",
    height: "90%",
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

export function ModalPrintStyle(theme, ownerState) {
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
    width: "80%",
    height: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    padding: `${pxToRem(20)} ${pxToRem(20)}`,
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

export const buttonIconStyle = {
  width: "20px",
  height: "20px",
  color: "white",
  filter: "invert(88%) sepia(21%) saturate(935%) hue-rotate(123deg) brightness(85%) contrast(97%)",
};
