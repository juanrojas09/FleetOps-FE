"use client"

import { useState } from "react"
import { Calendar, AlertTriangle, CheckCircle, Clock, FileSpreadsheet, Download } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts"

// Datos simulados para vehículos fuera de servicio
const outOfServiceVehicles = [
  { id: 1, patent: "AF445FI", reason: "Rotura", status: "critical" },
  { id: 2, patent: "AF445CI", reason: "Service", status: "normal" },
  { id: 3, patent: "AF443CI", reason: "Service", status: "normal" },
]

// Datos simulados para mantenimientos vencidos
const expiredMaintenance = [
  { id: 1, patent: "AF335FI", type: "ITV", expirationDate: "22/01/2025", status: "expired" },
  { id: 2, patent: "AF335FI", type: "SERVICE", expirationDate: "03/03/2025", status: "expired" },
]

// Datos simulados para mantenimientos próximos
const upcomingMaintenance = [
  { id: 1, patent: "AF445FI", type: "Service", remaining: "400km", status: "warning" },
  { id: 2, patent: "AF335FI", type: "Cambio Cubiertas", remaining: "300km", status: "warning" },
  { id: 3, patent: "AF335FI", type: "ITV", remaining: "10 días", status: "warning" },
]

// Datos simulados para intervenciones
const interventions = {
  completed: 12,
  pending: 2,
  completedPercentage: 72,
  pendingPercentage: 28,
}

// Datos simulados para el gráfico de mantenimientos por tipo de vehículo
const maintenanceByVehicleType = [
  {
    name: "Mercedes",
    vencidos: 3,
    proximos: 2,
    pendientes: 1,
  },
  {
    name: "Ford",
    vencidos: 1,
    proximos: 1,
    pendientes: 2,
  },
  {
    name: "Iveco",
    vencidos: 0,
    proximos: 1,
    pendientes: 1,
  },
  {
    name: "Renault",
    vencidos: 2,
    proximos: 1,
    pendientes: 2,
  },
]

// Datos simulados para el gráfico de intervenciones vs costo
const interventionsByCost = [
  {
    name: "Repuestos",
    intervenciones: 5,
    costo: 2500,
  },
  {
    name: "Roturas",
    intervenciones: 3,
    costo: 4000,
  },
  {
    name: "Otros",
    intervenciones: 4,
    costo: 1500,
  },
]

export const AlertsAndNewsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Jun 2025")
  const [periodType, setPeriodType] = useState("mensual")

  // Función para formatear moneda
  const formatCurrency = (value:any) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(value)
      .replace("ARS", "$")
  }

  // Función para cambiar el período
  const handlePeriodChange = (event:any) => {
    setSelectedPeriod(event.target.value)
  }

  // Función para cambiar el tipo de período (mensual/anual)
  const handlePeriodTypeChange = (type:any) => {
    setPeriodType(type)
  }

  // Función para obtener el color de la etiqueta según el estado
  const getStatusColor = (status:any) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "normal":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-amber-100 text-amber-800"
      case "expired":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Encabezado y selector de período */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Alertas y Novedades</h1>
          <p className="text-gray-500">Seguimiento proactivo del estado de los vehículos</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-card border rounded-md">
            <button
              className={`px-3 py-2 text-sm ${periodType === "mensual" ? "bg-primary text-white" : ""}`}
              onClick={() => handlePeriodTypeChange("mensual")}
            >
              Mensual
            </button>
            <button
              className={`px-3 py-2 text-sm ${periodType === "anual" ? "bg-primary text-white" : ""}`}
              onClick={() => handlePeriodTypeChange("anual")}
            >
              Anual
            </button>
          </div>
          <div className="flex items-center gap-2 bg-card border rounded-md px-3 py-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <select
              value={selectedPeriod}
              onChange={handlePeriodChange}
              className="text-sm bg-transparent border-none focus:outline-none"
            >
              <option value="Jun 2025">Junio 2025</option>
              <option value="May 2025">Mayo 2025</option>
              <option value="Abr 2025">Abril 2025</option>
              <option value="Mar 2025">Marzo 2025</option>
              <option value="Feb 2025">Febrero 2025</option>
              <option value="Ene 2025">Enero 2025</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-card border rounded-md px-3 py-2 text-sm hover:bg-accent">
            <FileSpreadsheet className="h-4 w-4" />
            Exportar
          </button>
          <button className="flex items-center gap-2 bg-card border rounded-md px-3 py-2 text-sm hover:bg-accent">
            <Download className="h-4 w-4" />
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Sección superior con 4 paneles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* RF 5.1: Vehículos fuera de servicio */}
        <div className="p-5 border rounded-lg bg-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Vehículos fuera de servicio</h2>
            <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">Mes</span>
          </div>
          <div className="space-y-3">
            {outOfServiceVehicles.map((vehicle, index) => (
              <div key={vehicle.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{index + 1}.</span>
                  <span className="text-sm font-medium">{vehicle.patent}</span>
                </div>
                {/* RF 5.1.1 y RF 5.1.2: Motivo de baja con etiqueta de color */}
                <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(vehicle.status)}`}>
                  {vehicle.reason}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RF 5.2: Mantenimientos vencidos */}
        <div className="p-5 border rounded-lg bg-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Mantenimientos Vencidos</h2>
            <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">Mes</span>
          </div>
          <div className="space-y-3">
            {expiredMaintenance.map((maintenance, index) => (
              <div key={maintenance.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{index + 1}.</span>
                  <span className="text-sm font-medium">{maintenance.patent}</span>
                </div>
                {/* RF 5.2.1 y RF 5.2.2: Tipo de mantenimiento y fecha de vencimiento con etiqueta roja */}
                <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(maintenance.status)}`}>
                  {maintenance.type} ({maintenance.expirationDate})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RF 5.3: Mantenimientos próximos */}
        <div className="p-5 border rounded-lg bg-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Mantenimientos próximos</h2>
            <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">Mes</span>
          </div>
          <div className="space-y-3">
            {upcomingMaintenance.map((maintenance, index) => (
              <div key={maintenance.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{index + 1}.</span>
                  <span className="text-sm font-medium">{maintenance.patent}</span>
                </div>
                {/* RF 5.3.1 y RF 5.3.2: Tipo de mantenimiento y km/días restantes con etiqueta amarilla */}
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(maintenance.status)}`}>
                    {maintenance.type}
                  </span>
                  <span className="text-xs text-gray-500">en {maintenance.remaining}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RF 5.4: Progreso de intervenciones */}
        <div className="p-5 border rounded-lg bg-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Progreso de intervenciones</h2>
            <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">Mes</span>
          </div>
          <div className="space-y-4">
            {/* RF 5.4.1 y RF 5.4.2: Intervenciones completadas y pendientes con porcentajes */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Completados:</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{interventions.completed}</span>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  {interventions.completedPercentage}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Pendientes:</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{interventions.pending}</span>
                <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                  {interventions.pendingPercentage}%
                </span>
              </div>
            </div>
            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${interventions.completedPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RF 5.5: Gráfica apilada de mantenimientos por tipo de vehículo */}
        <div className="p-5 border rounded-lg bg-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Mantenimientos por tipo</h2>
            <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">Mes</span>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={maintenanceByVehicleType} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Cantidad de Mantenimientos", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="vencidos" stackId="a" name="Vencidos" fill="#ef4444" />
                <Bar dataKey="proximos" stackId="a" name="Próximos" fill="#f59e0b" />
                <Bar dataKey="pendientes" stackId="a" name="Pendientes" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RF 5.6: Gráfica combinada de intervenciones vs costo */}
        <div className="p-5 border rounded-lg bg-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Intervenciones Realizadas vs. Costo Total</h2>
            <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">Mes</span>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={interventionsByCost} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" label={{ value: "Tipo de Intervención", position: "insideBottom", offset: -5 }} />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  label={{ value: "Cantidad de Intervenciones", angle: -90, position: "insideLeft" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: "Costo ($)", angle: 90, position: "insideRight" }}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "costo") return [formatCurrency(value), "Costo"]
                    if (name === "intervenciones") return [value, "Intervenciones"]
                    return [value, name]
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="intervenciones"
                  name="Cantidad de Intervenciones"
                  fill="#60a5fa"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="costo"
                  name="Costo Total"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tablas detalladas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tabla de mantenimientos vencidos */}
        <div className="p-5 border rounded-lg bg-card">
          <h2 className="text-lg font-semibold mb-4">Detalle de Mantenimientos Vencidos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium">Patente</th>
                  <th className="text-left py-3 px-4 font-medium">Tipo</th>
                  <th className="text-left py-3 px-4 font-medium">Fecha Vencimiento</th>
                  <th className="text-left py-3 px-4 font-medium">Días Vencido</th>
                  <th className="text-center py-3 px-4 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">AF335FI</td>
                  <td className="py-3 px-4">ITV</td>
                  <td className="py-3 px-4">22/01/2025</td>
                  <td className="py-3 px-4">45</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-500 text-white">Vencido</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">AF335FI</td>
                  <td className="py-3 px-4">SERVICE</td>
                  <td className="py-3 px-4">03/03/2025</td>
                  <td className="py-3 px-4">15</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-500 text-white">Vencido</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">AD814AF</td>
                  <td className="py-3 px-4">Cambio Aceite</td>
                  <td className="py-3 px-4">10/03/2025</td>
                  <td className="py-3 px-4">8</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-500 text-white">Vencido</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla de mantenimientos próximos */}
        <div className="p-5 border rounded-lg bg-card">
          <h2 className="text-lg font-semibold mb-4">Detalle de Mantenimientos Próximos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium">Patente</th>
                  <th className="text-left py-3 px-4 font-medium">Tipo</th>
                  <th className="text-left py-3 px-4 font-medium">Fecha/KM Límite</th>
                  <th className="text-left py-3 px-4 font-medium">Restante</th>
                  <th className="text-center py-3 px-4 font-medium">Prioridad</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">AF445FI</td>
                  <td className="py-3 px-4">Service</td>
                  <td className="py-3 px-4">45,400 km</td>
                  <td className="py-3 px-4">400 km</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Media</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">AF335FI</td>
                  <td className="py-3 px-4">Cambio Cubiertas</td>
                  <td className="py-3 px-4">50,300 km</td>
                  <td className="py-3 px-4">300 km</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Media</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">AF335FI</td>
                  <td className="py-3 px-4">ITV</td>
                  <td className="py-3 px-4">15/07/2025</td>
                  <td className="py-3 px-4">10 días</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Alta</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tabla de intervenciones */}
      <div className="p-5 border rounded-lg bg-card">
        <h2 className="text-lg font-semibold mb-4">Detalle de Intervenciones del Período</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left py-3 px-4 font-medium">Patente</th>
                <th className="text-left py-3 px-4 font-medium">Tipo</th>
                <th className="text-left py-3 px-4 font-medium">Fecha</th>
                <th className="text-right py-3 px-4 font-medium">Costo</th>
                <th className="text-left py-3 px-4 font-medium">Responsable</th>
                <th className="text-center py-3 px-4 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">AF445FI</td>
                <td className="py-3 px-4">Repuestos</td>
                <td className="py-3 px-4">05/06/2025</td>
                <td className="py-3 px-4 text-right">{formatCurrency(450000)}</td>
                <td className="py-3 px-4">Fernando Perez</td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completado</span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">AD814AF</td>
                <td className="py-3 px-4">Roturas</td>
                <td className="py-3 px-4">12/06/2025</td>
                <td className="py-3 px-4 text-right">{formatCurrency(780000)}</td>
                <td className="py-3 px-4">Carlos Gutierrez</td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completado</span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">AC875CG</td>
                <td className="py-3 px-4">Otros</td>
                <td className="py-3 px-4">18/06/2025</td>
                <td className="py-3 px-4 text-right">{formatCurrency(320000)}</td>
                <td className="py-3 px-4">Martín Rodriguez</td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">En progreso</span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">AF335FI</td>
                <td className="py-3 px-4">Repuestos</td>
                <td className="py-3 px-4">22/06/2025</td>
                <td className="py-3 px-4 text-right">{formatCurrency(540000)}</td>
                <td className="py-3 px-4">Fernando Perez</td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">En progreso</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Nota informativa */}
      <div className="flex items-start gap-4 p-4 border rounded-lg bg-amber-50">
        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
        <div>
          <p className="font-medium text-amber-800">Nota sobre alertas y novedades</p>
          <p className="text-sm text-amber-700 mt-1">
            Las alertas de mantenimiento son críticas para garantizar la operatividad de la flota. Los vehículos con
            mantenimientos vencidos deben ser atendidos de inmediato para evitar daños mayores y costos adicionales. Los
            mantenimientos próximos deben programarse con anticipación para minimizar el tiempo fuera de servicio.
          </p>
        </div>
      </div>
    </div>
  )
}

