import React from 'react'
import { DataGrid, showToolbar } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'

const paginationModel = { page: 0, pageSize: 10 }

export default function CustomTable({ rows, columns, title = '' }) {
  return (
    <div className="h-full w-full p-4">
      <Paper sx={{ height: '100%', width: '100%' }}>
        <Typography
          sx={{
            flex: '1 1 100%',
            fontWeight: 'bold',
            backgroundColor: '#ededed',
            padding: '1rem',
          }}
          variant="h6"
          id="tableTitle"
          component="div">
          {title}
        </Typography>
        <DataGrid
          rowSelection={false}
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          showToolbar
          sx={{
            border: 0,
            backgroundColor: '#f6f6f6',
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#f6f6f6',
            },
          }}
        />
      </Paper>
    </div>
  )
}
