import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Container, CircularProgress } from '@mui/material';

const GET_CITIES = gql`
  query GetCities($search: String, $limit: Int) {
    getCities(search: $search, limit: $limit) {
      id
      name
      country
      timezone
    }
  }
`;

function Cities() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { loading, error, data } = useQuery(GET_CITIES, {
    variables: { search: debouncedSearch, limit: 50 },
    fetchPolicy: 'network-only',
  });

  if (error) {
    console.error('Error loading cities:', error);
    return <p className="text-red-500">Error loading cities. Please try again later.</p>;
  }

  const columns = [
    { field: 'name', headerName: 'City', width: 200, sortable: true },
    { field: 'country', headerName: 'Country', width: 200, sortable: true },
    { field: 'timezone', headerName: 'Timezone', width: 200, sortable: true },
  ];

  const rows =
    data?.getCities.map((city) => ({
      id: city.id,
      name: city.name,
      country: city.country,
      timezone: city.timezone,
    })) || [];

  const handleRowClick = (params) => {
    const url = `/weather/${encodeURIComponent(params.row.name)}`;
    window.open(url, '_blank');
  };

  const handleRightClick = (e, cityName) => {
    e.preventDefault();
    const url = `/weather/${encodeURIComponent(cityName)}`;
    window.open(url, '_blank');
  };

  const totalColumnWidth = columns.reduce((acc, col) => acc + col.width, 0);
  const tableWidth = totalColumnWidth;

  const renderCell = (params) => {
    return (
      <div
        onContextMenu={(e) => handleRightClick(e, params.row.name)}
        style={{ cursor: 'context-menu', color: 'black' }} // Text color set to black
      >
        {params.value}
      </div>
    );
  };

  const modifiedColumns = columns.map((col) => ({
    ...col,
    renderCell,
  }));

  return (
    <Container
      maxWidth="lg"
      className="bg-base-300 flex flex-col items-center pt-20 h-screen"
    >
      <Box className="absolute top-5 right-5 w-1/3 z-10">
        <TextField
          variant="outlined"
          label="Search for a city..."
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered input-primary w-full max-w-xs text-white"
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{
            style: {
              color: '#fff', // Changed input text color to dark gray
              borderRadius: '8px',
              borderColor: '#fff', // Changed border color to dark gray
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#fff',
              },
              '&:hover fieldset': {
                borderColor: '#fff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fff',
              },
            },
          }}
        />
      </Box>
      <Box
        className="mt-20 w-full"
        style={{
          maxWidth: tableWidth,
          height: 'calc(100vh - 80px)',
          overflowX: 'auto',
        }}
      >
        <h1
          variant="h6"
          component="div"
          className="text-white mb-4"
          style={{ textAlign: 'center' }}
        >
          Hover over the headers (City, Country, Timezone) to sort and filter the data.
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <div
            className="h-full w-full rounded-lg shadow-lg overflow-hidden animate-fade-in"
            style={{
              position: 'relative',
              overflow: 'auto',
              paddingRight: '10px', // Adjusted for a smaller scrollbar
              backgroundColor: '#f5f5f5', // Light gray background
            }}
          >
            <DataGrid
              rows={rows}
              columns={modifiedColumns}
              pageSize={10}
              rowsPerPageOptions={[10, 50, 100]}
              disableSelectionOnClick
              onRowClick={handleRowClick}
              sx={{
                '& .MuiDataGrid-columnHeaderTitle': {
                  color: '#333', // Dark gray for header text
                },
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#ccc', // Slightly darker gray for header background
                  color: '#333', // Dark gray for header text
                  '&:hover': {
                    color: '#333',
                  },
                },
                '& .MuiDataGrid-columnSeparator': {
                  display: 'none',
                },
                '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                  width: '6px',
                  backgroundColor: 'transparent',
                },
                '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888',
                  borderRadius: '8px',
                },
                '& .MuiTablePagination-root': {
                  color: '#333', // Dark gray for pagination text
                },
                '& .MuiDataGrid-cell': {
                  color: 'black', // Black color for the data cells
                },
              }}
            />
          </div>
        )}
      </Box>
    </Container>
  );
}

export default Cities;
