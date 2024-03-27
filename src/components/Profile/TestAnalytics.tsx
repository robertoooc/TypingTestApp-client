import { FC, useEffect, useState } from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryHistogram,
  VictoryLine,
} from 'victory';
import { userData } from '../types/types';
import { getAllTests } from './utils/getAllTests';

interface Props {
  userData: userData[];
}

const TestAnalytics: FC<Props> = ({ userData }) => {
  const [allWPM, setAllWPM] = useState<number[]>([]);
  const [wpmProgression, setWpmProgression] = useState<
    { x: number; y: number }[]
  >([]);
  const [averageWPM, setAverageWPM] = useState<number>(0);
  const [accuracyData, setAccuracyData] = useState<{ x: string; y: number }[]>(
    []
  );
  const [accuracyProgression, setAccuracyProgression] = useState<
    { x: number; y: number }[]
  >([]);
  const [averageAccuracy, setAverageAccuracy] = useState<number>(0);

  useEffect(() => {
    const fetchTestsData = async () => {
      try {
        // const tests = await getAllTests();
        const wpmData: number[] = [];
        const progressionData: { x: number; y: number }[] = [];
        const accuracyDistribution: { x: string; y: number }[] = [];
        const accuracyProgressionData: { x: number; y: number }[] = [];

        userData.forEach((test: any, index: number) => {
          wpmData.push(test.wpm);
          progressionData.push({ x: index, y: test.wpm });

          // Calculate accuracy distribution
          test.accuracy >= 0 && test.accuracy <= 20
            ? accuracyDistribution.push({ x: '0-20%', y: 1 })
            : test.accuracy > 20 && test.accuracy <= 40
            ? accuracyDistribution.push({ x: '21-40%', y: 1 })
            : test.accuracy > 40 && test.accuracy <= 60
            ? accuracyDistribution.push({ x: '41-60%', y: 1 })
            : test.accuracy > 60 && test.accuracy <= 80
            ? accuracyDistribution.push({ x: '61-80%', y: 1 })
            : accuracyDistribution.push({ x: '81-100%', y: 1 });

          accuracyProgressionData.push({ x: index, y: test.accuracy });
        });

        // Calculate average WPM
        const avgWPM =
          wpmData.reduce((acc, curr) => acc + curr, 0) / wpmData.length;

        // Calculate average accuracy
        const avgAccuracy =
          userData.reduce((acc: number, curr: any) => acc + curr.accuracy, 0) /
          userData.length;

        setAllWPM(wpmData);
        setWpmProgression(progressionData);
        setAverageWPM(avgWPM);
        setAccuracyData(accuracyDistribution);
        setAccuracyProgression(accuracyProgressionData);
        setAverageAccuracy(avgAccuracy);
      } catch (error) {
        console.error('Error fetching tests data:', error);
      }
    };

    if (userData.length > 0) {
      fetchTestsData();
    }
  }, [userData]);

  return (
    <div className='container mx-auto'>
      <div className='mx-auto pl-10 mb-6 flex flex-wrap'>
        {/* Histogram showing the user's WPM compared to all other users */}
        <div className='mb-8 mx-5' style={{ maxWidth: '400px' }}>
          <h3 className='text-lg font-bold mb-2'>Your WPM Distribution</h3>
          <p className='text-sm mb-2'>
            This histogram illustrates the distribution of your words per minute
            (WPM) compared to all other users.
          </p>
          <p className='text-sm mt-4'>
            The x-axis represents the Words Per Minute (WPM) values, and the
            y-axis represents the frequency of each WPM value.
          </p>
          <VictoryChart width={350} height={200} domainPadding={20}>
            <VictoryAxis label='WPM' style={{ axisLabel: { padding: 30 } }} />
            <VictoryAxis
              dependentAxis
              label='Frequency'
              style={{ axisLabel: { padding: 40 } }}
            />
            {/* Add a line indicating the user's average WPM */}
            <VictoryLine
              data={[
                { x: averageWPM, y: 0 },
                { x: averageWPM, y: Math.max(...allWPM) },
              ]}
              style={{
                data: {
                  stroke: '#ff0000',
                  strokeWidth: 3,
                  strokeDasharray: '7',
                },
              }}
            />

            <VictoryHistogram
              bins={10}
              data={allWPM.map((wpm, index) => ({ x: wpm, y: index }))}
              style={{ data: { fill: 'rgba(0, 0, 255, 0.5)' } }}
            />
          </VictoryChart>
        </div>

        {/* Line chart showing the progression of WPM over time */}
        <div className='mb-8 mr-8' style={{ maxWidth: '400px' }}>
          <h3 className='text-lg font-bold mb-2'>WPM Progression</h3>
          <p className='text-sm mb-2'>
            This line chart displays how your WPM has progressed over time.
          </p>
          <p className='text-sm mt-4'>
            The x-axis represents the index of each test, and the y-axis
            represents the Words Per Minute (WPM) achieved in each test.
          </p>
          <VictoryChart width={350} height={200}>
            <VictoryAxis label='Number of Tests' />
            <VictoryAxis dependentAxis label='WPM' />
            <VictoryLine
              data={wpmProgression}
              style={{ data: { stroke: '#00f' } }}
            />
          </VictoryChart>
        </div>

        {/* Accuracy Progression Line Chart */}
        <div className='mb-8 mr-8' style={{ maxWidth: '400px' }}>
          <h3 className='text-lg font-bold mb-2'>Accuracy Progression</h3>
          <p className='text-sm mb-2'>
            This line chart displays how your accuracy has progressed over time.
          </p>
          <p className='text-sm mt-4'>
            The x-axis represents the index of each test, and the y-axis
            represents the accuracy percentage achieved in each test.
          </p>
          <VictoryChart width={350} height={200}>
            <VictoryAxis label='Number of Tests' />
            <VictoryAxis dependentAxis label='Accuracy' />
            <VictoryLine
              data={accuracyProgression}
              style={{ data: { stroke: '#f00' } }}
            />
          </VictoryChart>
        </div>
      </div>

      {/* Display average WPM and accuracy */}
      <div className='text-center mb-6 mt-16'>
        <h3 className='text-lg font-bold mb-2'>Average Metrics Of All Users</h3>
        <p>
          Average WPM: {averageWPM.toFixed(2)}
          <br />
          Average Accuracy: {averageAccuracy.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default TestAnalytics;
