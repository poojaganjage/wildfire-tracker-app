import React from 'react';
import spinner from './Spinner.gif';

function Loading() {
  return (
    <div className='loader'>
      <img src={spinner} alt='Loading' />
      <h1>Fetching Data</h1>
    </div>
  );
}
export default Loading;
