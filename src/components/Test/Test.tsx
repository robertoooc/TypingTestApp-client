import { useState, useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { useNavigate, NavigateFunction, useParams } from 'react-router-dom';
import { results, mistakeIdxs, intervalWordData, timeDuration, Lesson } from '../../types/types';
import Header from '../Header';
import TextDisplay from './TextDisplay/TextDisplay';
import Keyboard from './TextDisplay/KeyboardDisplay';
import Results from './TextDisplay/Results';
import { submitTest, resetTestState } from '../../redux/actions/testActions';
import { fetchLessons } from '../../redux/actions/lessonActions';
import GuestModal from '../Auth/GuestModal';
import { RootState } from '../../redux/reducers';

interface TestProps {
  submitTest: (payload: any) => void;
  fetchLessons: (char: string) => Lesson;
  resetTestState: () => void;
  lesson: Lesson;
  test: any;
}

const Test: FC<TestProps> = ({ submitTest, fetchLessons, lesson, test, resetTestState }) => {
  const [words, setWords] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [mistakes, setMistakes] = useState<mistakeIdxs[]>([]);
  const [userKey, setUserKey] = useState<string | null>('');
  const [load, setLoad] = useState<Boolean>(false);
  const [time, setTime] = useState<number>(60);
  const [started, setStarted] = useState<boolean>(false);
  const [newTest, setNewTest] = useState<boolean>(false);
  const [seeResults, setSeeResults] = useState<boolean>(false);
  const [suggestionUrl, setSuggestionUrl] = useState<string>('');
  const [wpm, setWpm] = useState<number>(0);
  const [timeDuration, setTimeDuration] = useState<timeDuration>(60);
  let [results, setResults] = useState<results | undefined>();

  const [intervalWordData, setIntervalWordData] = useState<intervalWordData[]>([]);
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [prevMistakes, setPrevMistakes] = useState<number>(0);

  const timeDurations: timeDuration[] = [15, 30, 60];
  let { id } = useParams();
  let navigate: NavigateFunction = useNavigate();

  const handleNewTest = () => {
    // resetting the url based on suggested from test results then refreshes
    resetTestState();
    navigate(suggestionUrl);
    navigate(0);
  };

  const handleSubmit = async (mistakes: mistakeIdxs[]) => {
    try {
      // frequency counter mistakes
      let count: any = {};
      mistakes?.forEach((idx) => {
        count[idx.expectedChar] = (count[idx.expectedChar] || 0) + 1;
      });

      // formatting into array
      let container: { char: string; amount: number }[] = [];
      for (const [key, value] of Object.entries<number>(count)) {
        let newEntry = {
          char: key === ' ' ? 'space' : key,
          amount: value,
        };
        container.push(newEntry);
      }

      // calculate total mistakes
      let mistakeAmount = container.length > 0 ? container?.map((mistake) => mistake.amount)?.reduce((prev, next) => prev + next) : 0;

      let calculatedAccuracy = parseFloat(((index / (index + mistakeAmount)) * 100).toFixed(2)) || 100;

      let intervalData = intervalWordData;
      if (intervalWordData.length < timeDuration / 5) {
        const { timeFrame, wordsTyped, intervalAccuracy, intervalMistakes, charactersTyped } = intervalHelper();

        intervalData = [
          ...intervalWordData,
          {
            timeFrame,
            wordsTyped,
            charactersTyped,
            mistakes: intervalMistakes,
            accuracy: intervalAccuracy,
          },
        ];
      }
      const payload: results = {
        wpm,
        accuracy: calculatedAccuracy,
        text: words,
        mistakes,
        duration: timeDuration,
        totalChars: index,
        intervalData,
        lessonIds: [lesson.id],
      };

      await submitTest(payload);

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

  const intervalHelper = () => {
    const intervalChars = index - prevIndex;
    const intervalMistakes = mistakes.length - prevMistakes;
    const intervalWordsTyped = words
      .substring(prevIndex, index)
      .split(' ')
      .filter((word) => word !== '').length;
    const intervalAccuracy = parseFloat(((intervalChars / (intervalChars + intervalMistakes)) * 100).toFixed(2));
    return {
      timeFrame: timeDuration - time,
      wordsTyped: intervalWordsTyped,
      charactersTyped: intervalChars,
      intervalMistakes,
      intervalAccuracy: intervalAccuracy || 100,
    };
  };

  useEffect(() => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomSuggestion = alphabet[Math.floor(Math.random() * 26)];
    !id || id.length === 0 ? fetchLessons(randomSuggestion) : fetchLessons(id);

    const joinWords = lesson?.words?.reduce((acc, wordObj) => {
      return acc + ' ' + wordObj.word.text;
    }, '');

    setWords(joinWords.slice(1, joinWords.length));
    setLoad(true);
  }, [id]); // eslint-disable-line

  useEffect(() => {
    // Function to handle keydown event
    const handleKeyDown = (e: any) => {
      e.preventDefault();
      if (e.key === ' ') {
        setUserKey('space');
        document.getElementById('space')?.classList.add('bg-zinc-800');
      } else {
        setUserKey(e.key);
        document.getElementById(e.key)?.classList.add('bg-zinc-800');
      }
    };

    // Function to handle keyup event
    const handleKeyUp = (e: any) => {
      if (e.key === ' ') {
        document.getElementById('space')?.classList.remove('bg-zinc-800');
      } else {
        document.getElementById(e.key)?.classList.remove('bg-zinc-800');
      }
      setUserKey(null);
    };

    // Check if we should add event listeners
    if (load && started) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
    }

    // Cleanup function to help avoid memory leaks
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [load, started]); // Dependencies

  useEffect(() => {
    if (userKey != null && started && !newTest) {
      // checking if user typed in correct char
      if (words[index] === userKey || (words[index] === ' ' && userKey === 'space')) {
        // if the next index is the same as the current (ex: 'cc' ) the userKey isn't updated so changing the load calls the useEffect because of it's dependency and allows the reset to happen
        if (userKey === 'space') {
          let newWpm = index === 0 ? 0 : words.substring(0, index).split(' ').length * (60 / timeDuration);
          setWpm(newWpm);
          //
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
            if (lastMistake.idx !== index) setMistakes([...mistakes, { expectedChar: words[index], typedChar: userKey, idx: index }]);
          } else {
            setMistakes([...mistakes, { expectedChar: words[index], typedChar: userKey, idx: index }]);
          }
        }
      }
    }
  }, [userKey, started]); // eslint-disable-line

  useEffect(() => {
    if (started) {
      // game timer that starts ticking as soon as the start button is clicked and ends test
      const seconds = setInterval(() => {
        if (time % 5 === 0 && time !== timeDuration && intervalWordData.length < timeDuration / 5) {
          const { timeFrame, wordsTyped, intervalAccuracy, intervalMistakes, charactersTyped } = intervalHelper();
          setIntervalWordData((prevData) => [
            ...prevData,
            {
              timeFrame,
              wordsTyped,
              charactersTyped,
              mistakes: intervalMistakes,
              accuracy: intervalAccuracy,
            },
          ]);
          setPrevIndex(index);
          setPrevMistakes(mistakes.length);
        }

        if (time === 0) {
          clearInterval(seconds);
          handleSubmit(mistakes);
          return;
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
      <Header time={time} wpm={wpm} testedChar={words[0]} test={true} />
      <br></br>
      <div className='relative'>
        <GuestModal />
        <div className='flex items-center relative mx-auto'>
          <p className='ml-10'>Set Test Duration:</p>
          {timeDurations.map((val) => (
            <div key={val} className='m-4'>
              <p
                className={`cursor-pointer ${timeDuration === val ? 'underline' : ''}`}
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
          setStarted={() => {
            resetTestState();
            setStarted(true);
          }}
          newTest={newTest}
          setNewTest={handleNewTest}
        />
      </div>
      {/* {!newTest && <Keyboard />} */}
      {newTest && <Results />}
      {/* <Results/> */}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    test: state.test.data,
    lesson: state.lessons.lesson,
    loading: state.lessons.loading,
    error: state.lessons.error,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  submitTest: (payload: any) => dispatch(submitTest(payload)),
  fetchLessons: (char: string) => dispatch(fetchLessons(char)),
  resetTestState: () => dispatch(resetTestState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
