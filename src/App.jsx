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
        
          <Route path="/photos/create"element={<PhotoDetails/> } />  
  
          <Route path="/photos" element={<PhotoList/>} />
          <Route path="/photos/:id" exact element={<PhotoDetails/>} />
      </Routes>
    </QueryClientProvider>
  </>);
};

export default App;
