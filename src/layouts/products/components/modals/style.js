export function ModalItems(theme, ownerState) {
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
    width: "80%",
    height: "80%",
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

export function ModalDeleteItems(theme, ownerState) {
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
