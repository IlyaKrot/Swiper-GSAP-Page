import React from 'react';
import Timeline from './feature/timeline';
import './app/styles/main.scss';
import { timelineData } from './shared/mocks/timelineData';

const App: React.FC = () => {
  return (
    <div className="App">
      <Timeline data={timelineData} />
    </div>
  );
};

export default App;