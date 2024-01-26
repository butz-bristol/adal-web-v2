import React from 'react';
import { Button, Typography, Stack } from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useEffect } from 'react';

const CustomTablePagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <Stack direction={'row'} spacing={2} sx={{ py: '20px', pr: '10px' }} justifyContent={'flex-end'} alignItems={'center'}>
      <Button
        variant="text"
        onClick={() => handlePageChange(currentPage - 1)}
        sx={{
          color: 'inherit',
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
        disabled={currentPage === 1}
      >
        <IconChevronLeft />
      </Button>

      <Typography variant="body2">
        {currentPage} of {totalPages || 1}
      </Typography>

      <Button
        variant="text"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 1}
        sx={{
          color: 'inherit',
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
      >
        <IconChevronRight />
      </Button>
    </Stack>
  );
};

export default CustomTablePagination;
