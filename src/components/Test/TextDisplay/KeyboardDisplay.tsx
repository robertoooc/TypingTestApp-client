import React from 'react';

const Keyboard: React.FC = () => {
  // Simplified rendering logic for demonstration
  return (
    <div className='w-8/12 min-h-min mx-auto grid grid-col-4 gap-1'>
      <br></br>
      <div className='grid gap-1 grid-cols-10'>
        <span className='border-2 border-black rounded-lg text-center' id='q'>
          q
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='w'>
          w
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='e'>
          e
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='r'>
          r
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='t'>
          t
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='y'>
          y
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='u'>
          u
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='i'>
          i
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='o'>
          o
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='p'>
          p
        </span>
      </div>

      <div className='grid gap-1 grid-cols-10'>
        <span className='border-2 border-black rounded-lg text-center' id='a'>
          a
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='s'>
          s
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='d'>
          d
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='f'>
          f
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='g'>
          g
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='h'>
          h
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='j'>
          j
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='k'>
          k
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='l'>
          l
        </span>
        <span className='border-2 border-black rounded-lg text-center' id=';'>
          ;
        </span>
      </div>

      <div className='grid gap-1 grid-cols-10'>
        <span></span>
        <span className='border-2 border-black rounded-lg text-center' id='z'>
          z
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='x'>
          x
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='c'>
          c
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='v'>
          v
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='b'>
          b
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='n'>
          n
        </span>
        <span className='border-2 border-black rounded-lg text-center' id='m'>
          m
        </span>
        <span className='border-2 border-black rounded-lg text-center' id=','>
          ,
        </span>
      </div>
      <div className='grid'>
        <span
          className='border-2 border-black rounded-lg text-center'
          id='space'
        >
          space
        </span>
      </div>
    </div>
  );
};

export default Keyboard;
