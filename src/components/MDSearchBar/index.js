import { useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import "./style.css";

export default function SearchBar({ handleSearch }) {
  const [textSearch, setTextSearch] = useState("");

  const handleFilter = (text) => {
    setTextSearch(text);
    handleSearch(text);
  };
  return (
    <div className="search">
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Buscar"
        value={textSearch}
        onChange={(event) => handleFilter(event.target.value)}
        style={{ width: "100%", marginTop: 9 }}
      />
    </div>
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
