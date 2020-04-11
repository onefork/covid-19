import React from 'react';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

//
// TODO:
// Filter by range https://github.com/mbrn/material-table/pull/1351
//

const DataTable = ({ data, columns, langs }) => {
  let dataArray;
  if (Array.isArray(data)) dataArray = data;
  else if (typeof data === 'object' && data !== null) dataArray = Object.values(data);
  else dataArray = [];
  return (
    <MaterialTable
      title="I found these for you:"
      columns={columns ||
        [
          {
            title: 'Title',
            field: 'title',
            // customFilterAndSearch: (term, rowData) => term == rowData.name.length,
            cellStyle: {
              fontWeight: 'bold',
              maxWidth: '30em',
              whiteSpace: 'normal', // multiple lines
              // overflow: 'auto', // scrolling
              // textOverflow: 'ellipsis', // ellip...
            },
            headerStyle: {
              maxWidth: '30em',
              whiteSpace: 'normal',
            }
          },
          { title: 'Score', field: 'score', type: 'numeric' },
          { title: 'Date', field: 'date', type: 'date' },
          {
            title: 'Language',
            field: 'lang',
            lookup: langs || {
              en: 'English',
              de: 'Deutsch',
              fr: 'Français',
              it: 'Italiano',
              es: 'Español',
              pt: 'Português',
              zh: 'Chinese',
            },
          },
          // { title: 'Year', field: 'year', type: 'numeric' },
          // {
          //   title: 'Country',
          //   field: 'country',
          //   lookup: { 1: 'Switzerland', 2: 'China', 3: 'Italy', 4: 'USA' },
          // },
        ]}
      data={dataArray}
      detailPanel={[
        {
          tooltip: 'Show Abstract',
          render: rowData => {
            return (
              <div
                style={{
                  padding: '4px 4px 4px 42px',
                  background: 'rgba(0, 0, 0, 0.04)',
                }}
              >
                <Paper variant="outlined"
                  style={{
                    padding: '8px 12px',
                    whiteSpace: 'normal',
                  }}
                >
                  {/* <Typography> */}
                  {rowData.abstract}
                  {/* </Typography> */}
                </Paper>
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

export default DataTable;
