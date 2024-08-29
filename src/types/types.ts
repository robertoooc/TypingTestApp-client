export interface currentUser {
  id: string;
  name: string;
  email?: string;
  profilePic?: string | null;
  bio?: string;
  wpm: number;
  googleOAuth: boolean;
  tests: test[];
  guest: boolean;
  progress?: userProgress;
  leaderboardEntries?: any;
}

export interface test {
  id: string;
  wpm: number;
  totalChars: number;
  mistakes: mistakeIdxs[];
  accuracy: number;
  text: string;
  duration: timeDuration;
  topWPMInterval: number;
  topAccuracyInterval: number;
  topCharactersTypedInterval: number;
  user: currentUser;
  intervalData: intervalWordData[];
  leaderboardEntries?: any;
  lessons?: Lesson[];
  createdAt: Date;
}

export interface results {
  wpm: number;
  accuracy: number;
  text: string;
  totalChars: number;
  mistakes: mistakeIdxs[];
  duration: timeDuration;
  intervalData: intervalWordData[];
  lessonIds: string[];
}

export interface HeaderTestBase {
  test: boolean;
}

export interface HeaderTestWithOptional extends HeaderTestBase {
  test: false;
  time?: number;
  wpm?: number;
  testedChar?: string;
  title: string;
}

export interface HeaderTestWithRequired extends HeaderTestBase {
  test: true;
  time: number;
  wpm: number;
  testedChar: string;
  title?: string;
}

export type HeaderTest = HeaderTestWithOptional | HeaderTestWithRequired;

export interface RootState {
  auth: AuthState;
  test: TestState;
  leaderboard: LeaderboardState;
  user: currentUser;
}

export interface TestState {
  loading: boolean;
  error: string | null;
  wpm: number;
  accuracy: number;
  user: currentUser;
  text: string;
  totalChars: number;
  mistakes: mistakeIdxs[];
  duration: timeDuration;
  intervalData: intervalWordData[];
}

export interface AuthState {
  token: string | null;
  user: currentUser | null;
  loading: boolean;
  error: string | null;
  uploading: boolean;
}

export interface LeaderboardEntry {
  id: string;
  user: currentUser;
  wpm: number;
  accuracy: number;
  totalChars: number;
  mistakesAmt: number;
  test: test;
  createdAt: Date;
}

export interface LeaderboardDataState {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
}

export interface UserListDataState {
  userList: UserList[];
  loading: boolean;
  error: string | null;
}

export interface LeaderboardState {
  leaderboard: LeaderboardDataState;
  userList: UserListDataState;
}

export interface mistakeIdxs {
  typedChar: string;
  expectedChar: string;
  idx: number;
}
export interface intervalWordData {
  timeFrame: number;
  wordsTyped: number;
  charactersTyped: number;
  mistakes: number;
  accuracy: number;
}

export type timeDuration = 15 | 30 | 60;

export interface UserList {
  id: string;
  name: string;
  email?: string;
  profilePic?: string;
  wpm: number;
  progress: userProgress;
}

export interface userProgress {
  id: string;
  userId: string;
  totalTests: number;
  averageWPM: number;
  WPM: number;
  topWPMInterval: number;
  averageAccuracy: number;
  topAccuracy: number;
  averageCharactersTyped: number;
  totalCharactersTyped: number;
  totalWordsTyped: number;
  totalMistakes: number;
  totalDuration: number;
}

export interface Word {
  id: string;
  text: string;
}

export interface LessonWord {
  id: string;
  lessonId: string;
  wordId: string;
  word: Word;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  words: LessonWord[];
}

export interface userProfile {
  id: string;
  name: string;
  profilePic: string | null;
  bio: string | null;
  wpm: number;
  tests: test[];
  progress: userProgress;
}

export interface lessonProgress {
  averageAccuracy: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  averageCharsTyped: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  averageWPM: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  highestAccuracy: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  highestCharsTyped: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  highestWPM: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  timeSpent: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  totalCharsTyped: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  totalMistakes: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  totalTests: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  totalWordsTyped: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  updatedAt: Date;
  createdAt: Date;
  userId: string;
}

export interface Mistake {
  id: string;
  testId: string;
  idx: number;
  typedChar: string;
  expectedChar: string;
}

export interface TypingTestData {
  lessonProgress: lessonProgress[];
  test: test;
  userProgress: userProgressImprovements;
}

export interface userProgressImprovements {
  id: string;
  userId: string;
  totalTests: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  averageWPM: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  WPM: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  topWPMInterval: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  averageAccuracy: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  topAccuracy: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  averageCharactersTyped: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  totalCharactersTyped: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  totalWordsTyped: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  totalMistakes: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
  totalDuration: {
    improvement: boolean;
    value: number;
    prevValue: number;
  };
}
