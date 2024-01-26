import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { IconDatabaseImport, IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import LoadingData from './LoadingData';

const StudentList = ({
  fetchDataFunction,
  totalItems,
  totalPages,
  currentPage,
  onPageChange,
  exportData,
  clearFilters,
  departments,
  yearLevels,
  getDocumentUploadCountFunction,
  sortOptions,
  renderTableBodyFunction,
  tableColumns,
  loadingData,
  query,
}) => {
  // State and other logic here
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterLevel, setFilterLevel] = useState('');

  useEffect(() => {
    fetchDataFunction();
    // Additional initialization logic
  }, [fetchDataFunction]);

  // Other useEffect hooks

  return (
    <Stack spacing={2}>
      <Stack
        direction={'row'}
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        mb={2}
      >
        {/* Input fields and filters */}

        <Stack direction={'row'} alignItems="center" spacing={1} maxWidth={500}>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch />
                </InputAdornment>
              ),
            }}
            onChange={(e) =>
              dispatch(handleChange({ name: 'query', value: e.target.value }))
            }
            placeholder="Search"
          />

          <FormControl fullWidth>
            <InputLabel id="select-department">Department</InputLabel>
            <Select
              id="select-department"
              label="Department"
              name="department"
              onChange={(e) => {
                setFilterDepartment(e.target.value);
                setFilterLevel('');
              }}
              value={filterDepartment || ''}
            >
              {departments
                .filter((department) => department.remarks === 'Active')
                .map((department) => (
                  <MenuItem
                    key={department._id}
                    value={department?.department_name}
                  >
                    {department?.department_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {filterDepartment && (
            <Stack minWidth={100}>
              <FormControl fullWidth>
                <InputLabel id="select-level">Level</InputLabel>
                <Select
                  id="select-level"
                  label="Level"
                  name="level"
                  onChange={(e) => setFilterLevel(e.target.value)}
                  value={filterLevel || ''}
                >
                  {yearLevels
                    .filter((level) => level.remarks === 'Active')
                    .map((level) => (
                      <MenuItem key={level._id} value={level.year_level_name}>
                        {level.year_level_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>
          )}
        </Stack>

        <Stack direction={'row'} alignItems="center" spacing={1}>
          <Button variant="contained" color="secondary" onClick={clearFilters}>
            Clear Filter
          </Button>

          <CSVLink data={exportData} filename={'registered-students.csv'}>
            <Button
              variant="outlined"
              endIcon={<IconDatabaseImport size={'17px'} />}
            >
              Export
            </Button>
          </CSVLink>
        </Stack>
      </Stack>

      {loadingData ? (
        <LoadingData />
      ) : (
        <Paper>
          {/* Table */}

          {/* Pagination and results count */}
          <Stack
            justifyContent={'space-between'}
            direction={'row'}
            alignItems={'center'}
            pl={'20px'}
          ></Stack>
        </Paper>
      )}
    </Stack>
  );
};

export default StudentList;
