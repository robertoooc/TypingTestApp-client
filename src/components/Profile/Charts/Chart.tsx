import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { test } from '../../../types/types';

interface ReusableChartProps {
  tests: test[];
}

const ReusableChart: React.FC<ReusableChartProps> = ({ tests }) => {
  const [selectedMetric, setSelectedMetric] = useState<string>('Top WPM');

  const metricsOptions = ['WPM', 'Accuracy', 'Total Characters Typed', 'Total Mistakes', 'Top WPM Interval', 'Top Accuracy interval', 'Top Characters Typed Interval'];

  const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(event.target.value);
  };

  const getSeriesData = () => {
    switch (selectedMetric) {
      case 'Top WPM Interval':
        return tests.map((t) => t.topWPMInterval);
      case 'WPM':
        return tests.map((t) => t.wpm);
      case 'Accuracy':
        return tests.map((t) => t.accuracy);
      case 'Total Characters Typed':
        return tests.map((t) => t.totalChars);
      case 'Total Mistakes':
        return tests.map((t) => t.mistakes.length);
      case 'Top Accuracy interval':
        return tests.map((t) => t.topAccuracyInterval);
      case 'Top Characters Typed Interval':
        return tests.map((t) => t.topCharactersTypedInterval);
      default:
        return tests.map((t) => t.wpm);
    }
  };

  const getYAxisTitle = () => {
    switch (selectedMetric) {
      case 'Top WPM Interval':
        return 'Words Per Interval (Top)';
      case 'WPM':
        return 'Words Per Minute';
      case 'Accuracy':
        return 'Accuracy (%)';
      case 'Total Characters Typed':
        return 'Total Characters Typed';
      case 'Total Mistakes':
        return 'Total Mistakes';
      case 'Top Accuracy interval':
        return 'Accuracy Interval (%) (Top)';
      case 'Top Characters Typed Interval':
        return 'Total Characters Typed Interval (Top)';
      default:
        return '';
    }
  };

  const options: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
    },
    xaxis: {
      categories: tests.map((t) => new Date(t.createdAt).toLocaleDateString()),
      labels: {
        style: {
          colors: '#FFFFFF',
        },
      },
    },
    yaxis: {
      title: {
        text: getYAxisTitle(),
        style: {
          color: '#FFFFFF',
        },
      },
      labels: {
        style: {
          colors: '#FFFFFF',
        },
      },
    },
    title: {
      text: selectedMetric,
      align: 'left',
      style: {
        color: '#FFFFFF',
      },
    },
    legend: {
      labels: {
        colors: '#FFFFFF',
      },
    },
  };

  const series = [
    {
      name: selectedMetric,
      data: getSeriesData(),
    },
  ];

  return (
    <div>
      <div className='mb-4'>
        <label htmlFor='metricSelect' className='mr-2 text-white'>
          Select Metric:
        </label>
        <select className='text-black text-center' id='metricSelect' value={selectedMetric} onChange={handleMetricChange}>
          {metricsOptions.map((metric) => (
            <option key={metric} value={metric}>
              {metric}
            </option>
          ))}
        </select>
      </div>

      <ReactApexChart options={options} series={series} type='line' height={350} />
    </div>
  );
};

export default ReusableChart;
