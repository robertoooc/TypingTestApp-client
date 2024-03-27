import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
interface Test {
  _id: string;
  wpm: number;
  mistakes: any[];
  accuracy: number;
  user: {
    _id: string;
    name: string;
    email: string;
  } | null;
  time: string;
}

interface Accumulator {
  [userId: string]: Test;
}

export const getAllTests = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/tests/all`
    );
    const testsByUser = response.data;
    return testsByUser;
  } catch (err) {
    return [];
  }
};

export const getAllTestsSorted = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/tests/all`
    );
    // grouping up the tests by user's id, undefined users count as new users anonymously
    const testsByUser = response.data.reduce((acc: Accumulator, test: Test) => {
      const userId = test.user?._id || uuidv4();
      if (!acc[userId] || test.wpm > acc[userId].wpm) {
        acc[userId] = test;
      }
      return acc;
    }, {});
    // converts back to array and sorts descending by wpm
    const filteredTests = Object.values(testsByUser);
    const sortedTests = filteredTests.sort((a: any, b: any) => b.wpm - a.wpm);
    return sortedTests;
  } catch (err) {
    return [];
  }
};
