import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export default function AzureTable({  data, months, ResourceType, fromDate, toDate }) {
  let rows = [];

  if (
    Array.isArray(data) &&
    months !== 0 &&
    ResourceType !== 0 &&
    fromDate !== 0 &&
    toDate !== 0
  ) {
    rows = data.map((detail) => ({
     
      id: detail.id,
      UsageDate: detail.usageDate,
      ResourceType: detail.resourceType,
      CostUSD: detail.costUSD,
      Cost: detail.cost,
      Currency: detail.currency,
      
    }))
  };
  const columns = [
    
    {
      field: "id",
      headerName: "Id",
      width: 300,
    },
    {
      field: "UsageDate",
      headerName: "Date",
      width: 170,
      valueGetter: (params) => {
        const usageDate = new Date(params.row.UsageDate);
        return usageDate.toISOString().split('T')[0];
      },
    },
    {
      field: "ResourceType",
      headerName: "Resource Type",
      width: 320,
    },
    {
      field: "CostUSD",
      headerName: "Cost in USD",
      width: 160,
      valueGetter: (params) => {
        const costUSD = Number(params.row.CostUSD);
        return costUSD.toFixed(4); // This will format the cost to four decimal places
      },
    },
    {
      field: "Cost",
      headerName: "Cost",
      width: 160,
      valueGetter: (params) => {
        const cost = Number(params.row.Cost);
        return cost.toFixed(4); // This will format the cost to four decimal places
      },
    },
    {
      field: "Currency",
      headerName: "Currency",
      width: 130,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ marginBottom: "20px" }}></div>
      <div style={{ flex: 1, height: "100%", width: "100% !important" }}>
        {rows.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            pagination
            disableSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            experimentalFeatures={{ ariaV7: true }}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            No data available
          </div>
        )}
      </div>
    </Box>
  );
}
