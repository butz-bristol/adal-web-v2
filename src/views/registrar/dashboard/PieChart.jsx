import { CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';
import MainCard from 'src/ui-component/cards/MainCard';

const PieChart = ({
  countK12Students,
  countTESDAStudents,
  countCollegeStudents,
}) => {
  const theme = useTheme();

  const chartData = {
    height: 300,
    type: 'pie',
    options: {
      chart: {
        id: 'department-chart',
      },
      labels: ['College', 'TESDA', 'K-12'],
      legend: {
        show: true,
        position: 'bottom',
        fontFamily: 'inherit',
        labels: {
          colors: 'inherit',
        },
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false,
        },
      },
      theme: {
        monochrome: {
          enabled: false,
        },
      },
    },
    series: [
      countCollegeStudents.length,
      countTESDAStudents.length,
      countK12Students.length,
    ],
  };

  return (
    <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
      <CardContent spacing={2}>
        <Typography variant="h3">Departments</Typography>

        <Chart {...chartData} />
      </CardContent>
    </MainCard>
  );
};
export default PieChart;
