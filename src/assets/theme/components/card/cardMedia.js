/**
=========================================================
* Silpos Barman React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Silpos Barman React Base Styles
import borders from "assets/theme/base/borders";
import pxToRem from "assets/theme/functions/pxToRem";
// Silpos Barman React Helper Functions

const { borderRadius } = borders;

const cardMedia = {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.xl,
      margin: `0 ${pxToRem(96)}  ${pxToRem(32)}`,
    },

    media: {
      width: "auto",
    },
  },
};

export default cardMedia;
