import TextField from "@mui/material/TextField";
// import List from "./Components/List"
import "./style.css";

export default function SearchBar() {
  return (
    <div className="search">
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Buscar"
        style={{ width: "100%", marginTop: 9 }}
      />
    </div>
  );
}
