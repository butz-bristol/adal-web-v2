import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  deleteSalaryGradeGuide,
  setSalaryGradeGuide,
  toggleEditSalaryGradeGuide,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const SalaryGrade = ({
  salary_grade,
  basic_salary,
  basic_salary_min,
  basic_salary_max,
  overtime_salary,
  index,
  _id,
}) => {
  const dispatch = useDispatch();

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      key={_id}
    >
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell>{salary_grade}</TableCell>
      <TableCell>{basic_salary}</TableCell>
      <TableCell>{overtime_salary}</TableCell>
      <TableCell>{basic_salary_min}</TableCell>
      <TableCell>{basic_salary_max}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="warning"
          aria-label="edit"
          sx={{ minWidth: '0', m: '0.1rem', width: '20px' }}
          onClick={() => {
            dispatch(toggleEditSalaryGradeGuide());
            dispatch(
              setSalaryGradeGuide({
                salary_grade,
                basic_salary,
                basic_salary_min,
                basic_salary_max,
                overtime_salary,
                _id,
              })
            );
          }}
        >
          <EditIcon fontSize="10px" />
        </Button>

        <Button
          variant="contained"
          aria-label="delete"
          sx={{ minWidth: '0', m: '0.1rem', width: '20px' }}
          color="error"
          onClick={() => dispatch(deleteSalaryGradeGuide(_id))}
        >
          <DeleteIcon fontSize="10px" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default SalaryGrade;
