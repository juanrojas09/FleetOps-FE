// src/pages/Dashboard.jsx
import React from 'react';

function DashboardGeneral() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bienvenido! En esta categoria se muestran los indicadores generales de nuestros recursos.</p>
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg bg-card">
          <h2 className="font-semibold mb-2">Costos totales de carga</h2>
          <p className="text-3xl font-bold">24</p>
        </div>
        <div className="p-4 border rounded-lg bg-card">
          <h2 className="font-semibold mb-2">Costos totales de carga</h2>
          <p className="text-3xl font-bold">7</p>
        </div>
        <div className="p-4 border rounded-lg bg-card">
          <h2 className="font-semibold mb-2">Costos totales de carga</h2>
          <p className="text-3xl font-bold">$11.110.811</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardGeneral;