import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import Main from './container/main';
import LoadingSpinner from './component/LoadingSpinner';
import SuspenseLoader from './component/SuspenseLoader';


function App() {
  return (
      <Main  />
      // <SuspenseLoader />
  );
}

export default App;
