import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Container, CircularProgress } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  const isSmallScreen = useMediaQuery('(max-width: 600px)'); // Media query for small screens

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
    { field: 'name', headerName: 'City', width: isSmallScreen ? 150 : 200, sortable: true },
    { field: 'country', headerName: 'Country', width: isSmallScreen ? 150 : 200, sortable: true },
    { field: 'timezone', headerName: 'Timezone', width: isSmallScreen ? 200 : 200, sortable: true },
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
        style={{ cursor: 'context-menu', color: 'black' }}
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
      maxWidth={false} // Span full width of the screen
      disableGutters // Remove default padding of the container
      className="bg-base-700 flex flex-col items-center pt-20 h-screen" // Use Tailwind class bg-base-700
      sx={{
        minHeight: '100vh', // Ensure it covers the full viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff', // Set a text color for better contrast
      }}
    >
      <Box className="absolute top-5 right-5 w-1/3 z-10">
        <TextField
          variant="outlined"
          label="Search for a city..."
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{
            style: {
              color: '#fff',
              borderRadius: '8px',
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
              '&.MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff !important',
              },
            },
            '& .MuiInputBase-root': {
              borderRadius: '8px',
              borderColor: '#fff',
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
              paddingRight: '10px',
              backgroundColor: '#f5f5f5',
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
                  color: '#333',
                },
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#ccc',
                  color: '#333',
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
                  color: '#333',
                },
                '& .MuiDataGrid-cell': {
                  color: 'black',
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
