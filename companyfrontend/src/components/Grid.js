import "./css/Grid.css";
import { DataGrid } from "@material-ui/data-grid";
import { useState } from "react";
import DetailPage from "./DetailPage";
import { Button } from "@material-ui/core";
import { ZoomOutMapSharp } from "@material-ui/icons";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 130,
  },
  {
    field: "age",
    headerName: "AGE",
    type: "number",
    width: 90,
  },
  {
    field: "salary",
    headerName: "SALARY (LPA)",
    type: "number",
    width: 120,
  },
  {
    field: "phoneNo",
    headerName: "PHONE NUMBER",
    width: 120,
  },
];

function Grid({ rows }) {
  const [selectionModel, setSelectionModel] = useState([]);
  const [deletedId, setDeletedId] = useState([]);
  
  const handleDetailPage = (rows) => {
  
    window.history.pushState(rows.row, "", "/detailPage");
    window.location.reload();
  };

  const handleModelChange = (e) => {
    // const selectedIDs = new Set(e.selectionModel.map);
    // const selectedRowData = rows.filter((r) =>
    //   selectedIDs.has(r._id.toString())
    // );
    console.log(e);
    e.length && setSelectionModel([e[e.length - 1]]);
  };

  const handleDelete = (e) => {
    setDeletedId([...deletedId, ...selectionModel]);
  };

  return (
    <>
      <div className="grid">
        <Button
          variant={"contained"}
          className={"del_btn"}
          onClick={handleDelete}
          disabled={!selectionModel.length}
        >
          Delete
        </Button>
        <DataGrid
          rows={rows.filter((row) => !deletedId.includes(row.id))}
          onRowClick={handleDetailPage}
          columns={columns}
          pageSize={4}
          autoHeight
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={handleModelChange}
        />
      </div>
    </>
  );
}

export default Grid;
