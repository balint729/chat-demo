import React from 'react';
import './App.css';
import ChatBox from './ChatBox';

const App: React.FC = () => {
    const evtSource = new EventSource('/eventstream');
    evtSource.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    console.log(`New message received ${data}`, data);
        
    })

    
  return (
    <ChatBox/>

  );
}

export default App;
