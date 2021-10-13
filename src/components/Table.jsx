import { LinearProgress, Pagination } from "@mui/material";
import {
  DataGrid,
  GridOverlay,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useState } from "react";

let globalPages = 0;
let globalExternalOnPageChange;
let globalInternalOnPageChange;
let globalCurrentPage;

export default function Table(props) {
  const {
    rows,
    columns,
    externalOnPageChange,
    externalOnSelectionChange,
    pages,
    loading,
    currentPage,
  } = props;

  globalExternalOnPageChange = externalOnPageChange;
  globalPages = pages;
  globalCurrentPage = currentPage;

  function internalOnPageChange(event, page) {
    console.log(currentPage, page);
    if (page !== currentPage){
      externalOnPageChange(page);
    }
  }

  const [previosSelection, setPreviosSelection] = useState(null);

  function internalOnSelectionChange(params) {
    if (previosSelection === params.id) {
      return;
    }

    setPreviosSelection(params.id);

    externalOnSelectionChange(params.row);
  }

  globalInternalOnPageChange = internalOnPageChange;

  return (
    <DataGrid
      columns={columns ? columns : null}
      rows={rows ? rows : null}
      onRowClick={externalOnSelectionChange ? internalOnSelectionChange : null}
      loading={loading}
      autoHeight
      density="compact"
      components={{
        Toolbar: CustomToolbar,
        Pagination: CustomPagintation,
        LoadingOverlay: CustomLoadingOverlay,
      }}
    />
  );
}

function CustomPagintation() {
  return (
    <Pagination
      count={globalPages ? globalPages : 0}
      page={globalCurrentPage}
      shape="rounded"
      onChange={globalExternalOnPageChange ? globalInternalOnPageChange : null}
    />
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton/>
      <GridToolbarDensitySelector/>
    </GridToolbarContainer>
  );
}

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}
