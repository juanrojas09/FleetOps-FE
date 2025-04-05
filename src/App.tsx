import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Sidebar } from './common/components/Sidebar';
import { ThemeProvider } from './providers/theme-provider';
import DashboardGeneral from './modules/dashboard/components/DashboardGeneral';
import OperativeCosts from './modules/dashboard/components/OperativeCosts';

function App() {
  return (
    
    <div className="App">
    
   
    
        <ThemeProvider>
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/" element={<DashboardGeneral />} />
            <Route path="/vehiculos/indicadores" element={<DashboardGeneral />} />
            <Route path="/vehiculos/costos-operativos" element={<OperativeCosts />} />
     
          
          </Routes>
        </Sidebar>
      </Router>
    </ThemeProvider>
 

    </div>
    
  );
}

export default App;
