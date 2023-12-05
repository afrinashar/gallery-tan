// App.js
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import PhotoList from './components/PhotoList';
import PhotoDetails from './components/PhotoDetails';
import './css/custom.css';
import CreatePhoto from './components/CreatePhoto';

const queryClient = new QueryClient();

const App = () => {
  return (<> 
    <QueryClientProvider client={queryClient}>
      <Routes>
        
           
          <Route path="/photos" element={<PhotoList/>} />
          <Route path="/photos/create" exact element={<CreatePhoto/>} />
      </Routes>
    </QueryClientProvider>
  </>);
};

export default App;
 