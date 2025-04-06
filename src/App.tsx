import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Sidebar } from './common/components/Sidebar';
import { ThemeProvider } from './providers/theme-provider';

import OperativeCosts from './modules/dashboard/pages/OperativeCosts';
import DashboardGeneralPage from './modules/dashboard/pages/DashboardGeneralPage';
import { FuelChargeCostPage } from './modules/dashboard/pages/FuelChargeCostPage';
import { RoutingCostsPage } from './modules/dashboard/pages/RoutingCostsPage';
import { AlertsAndNewsPage } from './modules/dashboard/pages/AlertsAndNewsPage';
import VehicleFleetPage from './modules/fleet-management/pages/VehicleFleetPage';


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
            <Route path="/gestion-activos/flota" element={<VehicleFleetPage />} />
     
          
          </Routes>
        </Sidebar>
      </Router>
    </ThemeProvider>
 

    </div>
    
  );
}

export default App;
