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
  progress?: UserProgress;
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
  progress: UserProgress;
}

export interface UserProgress {
  id: string;
  userId: string;
  totalTests: number;
  averageWpm: number;
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
  progress: UserProgress;
}
