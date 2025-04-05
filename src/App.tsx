import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Sidebar } from './common/components/Sidebar';
import { ThemeProvider } from './providers/theme-provider';

import OperativeCosts from './modules/dashboard/components/OperativeCosts';
import DashboardGeneralPage from './modules/dashboard/components/DashboardGeneralPage';
import { FuelChargeCostPage } from './modules/dashboard/components/FuelChargeCostPage';
import { RoutingCostsPage } from './modules/dashboard/components/RoutingCostsPage';
import { AlertsAndNewsPage } from './modules/dashboard/components/AlertsAndNewsPage';

function App() {
  return (
    
    <div className="App">
    
   
    
        <ThemeProvider>
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/" element={<DashboardGeneralPage />} />
            <Route path="/vehiculos/indicadores" element={<DashboardGeneralPage />} />
            <Route path="/vehiculos/costos-operativos" element={<OperativeCosts />} />
            <Route path="/vehiculos/costos-carga" element={<FuelChargeCostPage />} />
            <Route path="/vehiculos/costos-distancias" element={<RoutingCostsPage />} />
            <Route path="/vehiculos/alertas" element={<AlertsAndNewsPage />} />
     
          
          </Routes>
        </Sidebar>
      </Router>
    </ThemeProvider>
 

    </div>
    
  );
}

export default App;
