import { TableRow, TableCell } from '@mui/material';

export default function DataTableEmptyRows() {
  return (
    <TableRow>
      <TableCell align="center" colSpan={9}>
        No result found
      </TableCell>
    </TableRow>
  );
}
