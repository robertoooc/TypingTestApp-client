import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, NavigateFunction, useParams } from 'react-router-dom';
import { currentUser, results } from '../types/types';
import TypingTestHeader from './Header/TypingTestHeader';
import TextDisplay from './TextDisplay/TextDisplay';
import Keyboard from './TextDisplay/KeyboardDisplay';
import Results from './TextDisplay/Results';

interface Props {
  currentUser: currentUser | null;
  token: string | null;
}
interface mistakeIdxs {
  char: string;
  idx: number;
}
type timeDuration = 15 | 30 | 60;
const Test: FC<Props> = ({ currentUser, token }) => {
  const [words, setWords] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [mistakes, setMistakes] = useState<mistakeIdxs[]>([]);
  const [userKey, setUserKey] = useState<string | null>('');
  const [load, setLoad] = useState<Boolean>(false);
  const [time, setTime] = useState<number>(60);
  const [started, setStarted] = useState<Boolean>(false);
  const [newTest, setNewTest] = useState<boolean>(false);
  const [seeResults, setSeeResults] = useState<boolean>(false);
  const [suggestionUrl, setSuggestionUrl] = useState<string>('');
  const [wpm, setWpm] = useState<number>(0);
  const [timeDuration, setTimeDuration] = useState<timeDuration>(60);
  let [results, setResults] = useState<results | undefined>();

  const timeDurations: timeDuration[] = [15, 30, 60];
  let { id } = useParams();
  let navigate: NavigateFunction = useNavigate();

  const handleNewTest = () => {
    // resetting the url based on suggested from test results then refreshes
    navigate(suggestionUrl);
    navigate(0);
  };

  const handleSubmit = async (mistakes: mistakeIdxs[]) => {
    try {
      let findWPM: number =
        index === 0
          ? 0
          : words.substring(0, index).split(' ').length * (60 / timeDuration);

      // frequency counter mistakes
      let count: any = {};
      mistakes?.forEach((idx) => {
        count[idx.char] = (count[idx.char] || 0) + 1;
      });

      // formatting into array
      let container = [];
      for (const [key, value] of Object.entries<number>(count)) {
        let newEntry = {
          char: key === ' ' ? 'space' : key,
          amount: value,
        };
        container.push(newEntry);
      }

      // calculate total mistakes
      let mistakeAmount =
        container.length > 0
          ? container
              ?.map((mistake) => mistake.amount)
              ?.reduce((prev, next) => prev + next)
          : 0;

      let calculatedAccuracy = parseFloat(
        ((index / (index + mistakeAmount)) * 100).toFixed(2)
      );

      const payload: results = {
        wpm: findWPM,
        mistakes: container,
        accuracy: calculatedAccuracy, // Use the calculated accuracy here
        totalChars: index,
        _id: undefined,
      };

      let token = localStorage.getItem('jwt');

      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/tests`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      payload._id = res.data.newTest._id as string;
      setResults(payload);
      setSeeResults(true);

      if (container.length === 0) {
        setNewTest(true);
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const randomSuggestion = alphabet[Math.floor(Math.random() * 26)];
        setSuggestionUrl(`/test/${randomSuggestion}`);
      } else {
        const suggestion = container.reduce((prev, current) => {
          return prev.amount > current.amount ? prev : current;
        });
        setNewTest(true);
        setSuggestionUrl(`/test/${suggestion.char}`);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    const pingWords = async () => {
      try {
        if (id?.length === undefined) {
          id = 'a'; // eslint-disable-line
        } else {
          if (id.length > 1) {
            id = id[0];
          }
        }
        // pinging api to get array of words and join them to string to present text
        const response = await axios.get(
          `https://api.datamuse.com/words?sp=${id}*`
        );
        const listWords = response.data.map(
          (word: { word: string; score: number }) => {
            return `${word.word}`;
          }
        );
        const joined = listWords.join(' ');
        setWords(joined);
      } catch (err) {
        console.log(err);
      }
    };
    pingWords();
    setLoad(true);
  }, []);

  useEffect(() => {
    if (load && started) {
      document.addEventListener('keydown', (e) => {
        // taking in the key pressed
        if (e.key === ' ') {
          setUserKey('space');
          document.getElementById('space')?.classList.add('bg-zinc-800');
        } else {
          setUserKey(e.key);
          document.getElementById(e.key)?.classList.add('bg-zinc-800');
        }
      });
      document.addEventListener('keyup', (e) => {
        if (e.key === ' ') {
          document.getElementById('space')?.classList.remove('bg-zinc-800');
        } else {
          document.getElementById(e.key)?.classList.remove('bg-zinc-800');
        }
        setUserKey(null);
      });
    }
  }, [load, time, started]);

  useEffect(() => {
    if (userKey != null && started && !newTest) {
      // checking if user typed in correct char
      if (
        words[index] === userKey ||
        (words[index] === ' ' && userKey === 'space')
      ) {
        // if the next index is the same as the current (ex: 'cc' ) the userKey isn't updated so changing the load calls the useEffect because of it's dependency and allows the reset to happen
        if (userKey === 'space') {
          let newWpm = wpm + 1;
          setWpm(newWpm);
        }
        if (words[index + 1] === words[index]) {
          setLoad(false);
          setLoad(true);
        }
        let newIndex = index + 1;
        setIndex(newIndex);
      } else {
        // if wrong adding to mistakes
        if (userKey.length > 0) {
          const lastMistake = mistakes[mistakes.length - 1];
          if (lastMistake) {
            if (lastMistake.idx !== index)
              setMistakes([...mistakes, { char: words[index], idx: index }]);
          } else {
            setMistakes([...mistakes, { char: words[index], idx: index }]);
          }
        }
      }
    }
  }, [userKey, started]); // eslint-disable-line

  useEffect(() => {
    if (started) {
      // game timer that starts ticking as soon as the start button is clicked and ends test
      const seconds = setInterval(() => {
        if (time === 0) {
          handleSubmit(mistakes);
          clearInterval(seconds);
          return time;
        }
        setTime((prev) => prev - 1);
      }, 1000);
      return () => {
        clearInterval(seconds);
      };
    }
  }, [time, started]); // eslint-disable-line

  return (
    <div>
      <TypingTestHeader time={time} wpm={wpm} testedChar={words[0]} />
      {/* <Results /> */}
      <br></br>

      <div className='relative'>
        <div className='flex items-center relative mx-auto'>
          <p className='ml-10'>Set Test Duration:</p>
          {timeDurations.map((val) => (
            <div key={val} className='m-4'>
              <p
                className={`cursor-pointer ${
                  timeDuration === val ? 'underline' : ''
                }`}
                onClick={
                  !started
                    ? () => {
                        setTime(val);
                        setTimeDuration(val);
                      }
                    : undefined
                }
              >
                {val} seconds
              </p>
            </div>
          ))}
        </div>

        <TextDisplay
          words={words}
          currIdx={index}
          mistakes={mistakes}
          started={started}
          setStarted={() => setStarted(true)}
          newTest={newTest}
          setNewTest={handleNewTest}
        />
      </div>

      {!newTest && <Keyboard />}

      {seeResults && (
        <Results
          index={index}
          results={results}
          timeDuration={timeDuration}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};
export default Test;
