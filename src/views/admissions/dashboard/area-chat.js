const chartData = {
  height: 200,
  type: 'area',
  options: {
    chart: {
      id: 'applicants-area-chart',
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      },
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 80, 100]
      }
    },
    legend: {
      show: true
    },
    xaxis: {
      // dataLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      type: 'datetime'
    }
  },
  series: [
    {
      data: [
        {
          x: new Date('2018-02-12').getTime(),
          y: 12
        },
        {
          x: new Date('2018-02-13').getTime(),
          y: 76
        }
      ]
    }
  ]
};

export default chartData;
