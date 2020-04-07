import React from 'react'
import MaterialTable from 'material-table'

//
// TODO:
// Filter by range https://github.com/mbrn/material-table/pull/1351
//

const Table = ({ data, columns }) => {
  let dataArray;
  if (Array.isArray(data)) dataArray = data;
  else if (typeof data === 'object' && data !== null) dataArray = Object.values(data);
  else dataArray = [];
  
  return (
    <MaterialTable
      title="I found these papers for you:"
      columns={columns}
      data={dataArray}
      detailPanel={[
        {
          tooltip: 'Show Abstract',
          render: rowData => {
            return (
              <div style={{ padding: '8px 16px' }}>
                {rowData.abstract}
              </div>
            )
          },
        },
      ]}
      actions={[
        {
          icon: 'favorite_border',
          tooltip: 'Add to collection',
          onClick: (event, rowData) => {
            // Do save operation
          }
        },
        rowData => ({
          icon: 'open_in_new',
          tooltip: 'Open',
          hidden: rowData.url === undefined,
          onClick: (event, rowData) => {
            window.open(rowData.url);
          }
        }),
      ]}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
      options={{
        filtering: true,
        grouping: true,
        exportButton: true
      }}
    />
  )
}

export default Table;
