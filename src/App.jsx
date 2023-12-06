// App.js
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import PhotoList from './components/PhotoList';
import PhotoDetails from './components/PhotoDetails';
import './css/custom.css';
import CreatePhoto from './components/CreatePhoto';
import DeletePhoto from './components/DeletePhoto';
import EditPhoto from './components/EditPhoto';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 3000,
    },
  },
});


const App = () => {
  return (<> 
    <QueryClientProvider client={queryClient}>
      <Routes>
      <Route path="/photos/delete/:id" element={<DeletePhoto/>} />
      <Route path="/update/:id" element={<EditPhoto/>} />
           
          <Route path="/photos" element={<PhotoList/>} />
          <Route path="/photos/create" exact element={<CreatePhoto/>} />
      </Routes>
    </QueryClientProvider>
  </>);
};

export default App;
 