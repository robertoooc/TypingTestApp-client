import { FC, useRef, useEffect, useState, useCallback } from 'react';
import { mistakeIdxs } from '../../../types/types';

interface Props {
  words: string;
  currIdx: number;
  mistakes: mistakeIdxs[];
  started: Boolean;
  newTest: Boolean;
  setStarted: () => void;
  setNewTest: () => void;
}

const TextDisplay: FC<Props> = ({ words, currIdx, mistakes, started, setStarted, newTest, setNewTest }) => {
  const sizeLimit = 53;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentRow, setCurrentRow] = useState(0);

  const splitIntoRows = useCallback((text: string, maxLength: number) => {
    const rows: string[] = [];
    let currentLine = '';

    text.split(' ').forEach((word) => {
      if (currentLine.length + word.length + (currentLine.length > 0 ? 1 : 0) <= maxLength) {
        if (currentLine.length > 0) {
          currentLine += '⸱';
        }
        currentLine += word;
      } else {
        currentLine += '⸱';
        rows.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine.length > 0) {
      rows.push(currentLine);
    }

    return rows;
  }, []);

  const rows = splitIntoRows(words, sizeLimit);

  const calculateGlobalIndices = useCallback(() => {
    const indices: number[] = [];
    let currentIndex = 0;

    rows.forEach((row) => {
      row.split('').forEach((char) => {
        indices.push(currentIndex);
        currentIndex++;
      });
    });

    return indices;
  }, [rows]);

  const globalIndices = calculateGlobalIndices();

  const getCurrentRowIndex = useCallback(
    (index: number) => {
      let accumulatedLength = 0;

      for (let i = 0; i < rows.length; i++) {
        accumulatedLength += rows[i].length;
        if (index < accumulatedLength) {
          return i;
        }
      }

      return rows.length - 1;
    },
    [rows]
  );

  useEffect(() => {
    const rowIndex = getCurrentRowIndex(currIdx);
    setCurrentRow(rowIndex);
  }, [currIdx, getCurrentRowIndex]);

  useEffect(() => {
    if (currentRow > 2) {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          const currentRowElement = containerRef.current.children[currentRow - 2] as HTMLElement;
          if (currentRowElement) {
            currentRowElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      });
    }
  }, [currentRow]);

  return (
    <div className='relative'>
      <div className='bg-neutral-300 w-7/12 mx-auto rounded-xl p-2 relative dark:text-black overflow-hidden'>
        {!started && (
          <div className='absolute inset-0 flex justify-center items-center backdrop-filter backdrop-brightness-50 rounded-lg'>
            <button onClick={setStarted} className='text-white bg-[#24292F] font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
              Start
            </button>
          </div>
        )}
        {newTest && (
          <div className='absolute inset-0 flex justify-center items-center backdrop-filter backdrop-brightness-50 rounded-lg'>
            <button onClick={setNewTest} className='text-white bg-[#24292F] font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
              New Test
            </button>
          </div>
        )}
        <div className='flex flex-col' style={{ height: 'calc(7 * 1.5rem)', overflow: 'hidden' }} ref={containerRef}>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className='flex'>
              {row.split('').map((char, index) => {
                const globalIndex = globalIndices[rows.slice(0, rowIndex).join('').length + index];
                const isError = mistakes.some((mistake) => mistake.idx === globalIndex);
                const isTyped = globalIndex < currIdx;
                const isCurrent = globalIndex === currIdx;

                let className = 'inline-block px-1 py-1 rounded-md text-xl';

                if (isError && !isCurrent) {
                  className += ' bg-red-600'; // Background color for errors
                } else if (isTyped && !isError) {
                  className += ' bg-gray-200'; // Background color for already typed text
                } else if (isCurrent) {
                  className += ' bg-yellow-300'; // Background color for current typing position
                }

                return (
                  <span key={globalIndex} className={className}>
                    {char === '⸱' ? '⸱' : char}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextDisplay;
