import React from 'react';
import FlightSearchPage from './components/FlightSearchPage';
import { MotionConfig } from "framer-motion";

function App() {
  return (

    <div>
    {/* <MotionConfig reducedMotion="user"> */}
      <FlightSearchPage />
    {/* </MotionConfig> */}
    
    </div>
  );
}

export default App;