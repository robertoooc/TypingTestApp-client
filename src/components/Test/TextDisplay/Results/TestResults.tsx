// import { FC } from 'react';
// import { test } from '../../../../types/types';
// interface TestResultsProps {
//   test: test;
// }

// const TestResults: FC<TestResultsProps> = ({ test }) => {
//   console.log(test)
//   return (
//     <div>
//       <div></div>
//     </div>
//   );
// };

// export default TestResults;
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { test } from '../../../../types/types';

interface TestResultsProps {
  testData: test;
}

const TestResults: React.FC<TestResultsProps> = ({ testData }) => {
  const [selectedMetric, setSelectedMetric] = useState<string>('Top WPM Interval');

  const metricsOptions = ['Words Per Interval', 'Accuracy Per Interval', 'Characters Typed Per Interval', 'Mistakes Per Interval'];

  const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(event.target.value);
  };

  const getSeriesData = () => {
    switch (selectedMetric) {
      case 'Words Per Interval':
        return testData.intervalData.map((interval) => interval.wordsTyped);
      case 'Accuracy Per Interval':
        return testData.intervalData.map((interval) => interval.accuracy);
      case 'Characters Typed Per Interval':
        return testData.intervalData.map((interval) => interval.charactersTyped);
      case 'Mistakes Per Interval':
        return testData.intervalData.map((interval) => interval.mistakes);
      default:
        return testData.intervalData.map((interval) => interval.wordsTyped);
    }
  };

  const getYAxisTitle = () => {
    switch (selectedMetric) {
      case 'Words Per Interval':
        return 'Words Per Interval';
      case 'Accuracy Per Interval':
        return 'Accuracy (%)';
      case 'Characters Typed Per Interval':
        return 'Characters Typed';
      case 'Mistakes Per Interval':
        return 'Mistakes';
      default:
        return 'Words Per Interval';
    }
  };

  const options: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
    },
    xaxis: {
      categories: testData.intervalData.map((interval) => interval.timeFrame.toString()),
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
      {/* Test Summary */}
      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <h4 className='text-title-md font-bold'>{testData.wpm}</h4>
          <span className='text-sm font-medium'>WPM</span>
        </div>
        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <h4 className='text-title-md font-bold'>{testData.accuracy}%</h4>
          <span className='text-sm font-medium'>Accuracy</span>
        </div>
        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <h4 className='text-title-md font-bold'>{testData.totalChars}</h4>
          <span className='text-sm font-medium'>Total Characters Typed</span>
        </div>
        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <h4 className='text-title-md font-bold'>{testData.mistakes.length}</h4>
          <span className='text-sm font-medium'>Total Mistakes</span>
        </div>
      </div>

      {/* Interval Data Chart */}
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
    </div>
  );
};

export default TestResults;
