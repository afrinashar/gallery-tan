// App.js
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import PhotoList from './components/PhotoList';
import PhotoDetails from './components/PhotoDetails';
 
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        
          <Route path="/photos/create"> {/* Add CreatePhoto component here */}</Route>
          <Route path="/photos/:photoId" component={PhotoDetails} />
          <Route path="/photos" component={PhotoList} />
          <Route path="/" exact component={PhotoList} />
    
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
