import React from 'react'
import { DataGrid, showToolbar } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'

const paginationModel = { page: 0, pageSize: 10 }

export default function CustomTable({ rows, columns, title = '' }) {
  return (
    <div className="h-full w-full p-4">
      <Paper sx={{ width: '100%', overflowX: 'auto' }}>
        <Typography
          sx={{
            flex: '1 1 100%',
            fontWeight: 'bold',
            backgroundColor: '#ededed',
            padding: '1rem',
            minWidth: '600px',
          }}
          variant="h6"
          component="div">
          {title}
        </Typography>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <div style={{ minWidth: '800px' }}>
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
          </div>
        </div>
      </Paper>
    </div>
  )
}
