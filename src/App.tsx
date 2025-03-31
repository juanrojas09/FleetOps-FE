import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Sidebar } from './common/components/Sidebar';
import { ThemeProvider } from './providers/theme-provider';
import DashboardGeneral from './modules/dashboard/components/DashboardGeneral';

function App() {
  return (
    
    <div className="App">
    
   
    
        <ThemeProvider>
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/" element={<DashboardGeneral />} />
     
          
          </Routes>
        </Sidebar>
      </Router>
    </ThemeProvider>
 

    </div>
    
  );
}

export default App;
