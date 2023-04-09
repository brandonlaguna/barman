export function ModalConfigPrinterStyle(theme, ownerState) {
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
    width: "50%",
    height: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    padding: `${pxToRem(11)} ${pxToRem(11)}`,
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

export function ModalDeletePrinterStyle(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, transparentSidenav, whiteSidenav, darkMode, overflowY } = ownerState;
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
    height: "40%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    padding: `${pxToRem(10)} ${pxToRem(10)}`,
    borderRadius: borderRadius.md,
    whiteSpace: "nowrap",
    overflowY,
    boxShadow: active && !whiteSidenav && !darkMode && !transparentSidenav ? md : "none",
    [breakpoints.up("xl")]: {
      transition: transitions.create(["box-shadow", "background-color"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      }),
    },
  };
}
