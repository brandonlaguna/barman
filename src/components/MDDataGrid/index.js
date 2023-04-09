import { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";

export default function DataTableGrid({ table }) {
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  return (
    <div>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

DataTableGrid.defaultProps = {};

DataTableGrid.propTypes = {
  table: PropTypes.objectOf(PropTypes.array).isRequired,
};
