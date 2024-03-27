export interface currentUser {
  name?: string;
  email?: string;
  _id?: string;
  iat?: number;
}
export interface mistakes {
  char: string;
  amount: number;
}

export interface userData {
  wpm: number;
  mistakes: mistakes[];
  _id: string;
  time: string;
  accuracy: number;
}
export interface test {
  _id: string;
  wpm: number;
  time: string;
  mistakes: mistakes[];
  accuracy: number;
}

export interface accountInfo {
  name: string;
  wpm: number;
  email: string;
}
export interface results {
  wpm: number;
  mistakes: mistakes[];
  accuracy: number;
  _id : string | undefined;
  totalChars: number;
}
