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

// Silpos Barman React Helper Functions

const { borderRadius } = borders;

const cardMedia = {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.xl,
      margin: `auto`,
    },

    media: {
      width: "auto",
    },
  },
};

export default cardMedia;
