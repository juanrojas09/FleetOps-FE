"use client"

import { useState } from "react"
import { Calendar, Car, DollarSign, PenToolIcon as Tool, TrendingDown, TrendingUp, User } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Datos simulados para el gráfico de línea (costos mensuales)
const monthlyData = [
  { name: "Ene", combustible: 2100, mantenimiento: 980, total: 3080 },
  { name: "Feb", combustible: 1600, mantenimiento: 650, total: 2250 },
  { name: "Mar", combustible: 1900, mantenimiento: 850, total: 2750 },
  { name: "Abr", combustible: 1500, mantenimiento: 720, total: 2220 },
  { name: "May", combustible: 1800, mantenimiento: 950, total: 2750 },
  { name: "Jun", combustible: 2500, mantenimiento: 1200, total: 3700 },
  { name: "Jul", combustible: 2800, mantenimiento: 1500, total: 4300 },
  { name: "Ago", combustible: 2400, mantenimiento: 1300, total: 3700 },
  { name: "Sep", combustible: 2900, mantenimiento: 1600, total: 4500 },
  { name: "Oct", combustible: 3500, mantenimiento: 2100, total: 5600 },
  { name: "Nov", combustible: 3000, mantenimiento: 1800, total: 4800 },
  { name: "Dic", combustible: 3200, mantenimiento: 1900, total: 5100 },
]

// Datos simulados para el gráfico de torta (tipos de intervenciones)
const interventionData = [
  { name: "Repuestos", value: 4, color: "#4ade80" },
  { name: "Roturas", value: 3, color: "#fb7185" },
  { name: "Otros", value: 9, color: "#fb923c" },
]

// Vehículos con mayor gasto
const topVehicles = [
  { patent: "AF445FI", cost: 1603040, driver: "Fernando Perez" },
  { patent: "AD814AF", cost: 1245780, driver: "Carlos Gutierrez" },
  { patent: "AC875CG", cost: 987650, driver: "Martín Rodriguez" },
]

function DashboardGeneral() {
  const [periodType, setPeriodType] = useState("mes")

  // Función para formatear números grandes con separadores de miles
  const formatNumber = (num: string | number | bigint) => {
    return new Intl.NumberFormat("es-AR").format(Number(num))
  }

  // Función para formatear moneda
  const formatCurrency = (value: string | number | bigint) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(Number(value))
      .replace("ARS", "$")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Resumen General</h1>
          <p className="text-gray-500">Indicadores generales de nuestros recursos</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-card border rounded-md flex overflow-hidden">
            <button
              className={`px-4 py-2 text-sm ${periodType === "mes" ? "bg-primary text-white" : ""}`}
              onClick={() => setPeriodType("mes")}
            >
              Mes
            </button>
            <button
              className={`px-4 py-2 text-sm ${periodType === "año" ? "bg-primary text-white" : ""}`}
              onClick={() => setPeriodType("año")}
            >
              Año
            </button>
          </div>
          <div className="flex items-center gap-2 bg-card border rounded-md px-3 py-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Fecha: 20 Mar 2025</span>
          </div>
        </div>
      </div>

      {/* Indicadores principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Costos totales de carga */}
        <div className="p-5 border rounded-lg bg-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Costos totales de carga</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(11852572)}</p>
              <div className="flex items-center mt-1">
                <div className="flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  <span>-26%</span>
                </div>
                <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
              </div>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        {/* Costo total promedio por vehículo */}
        <div className="p-5 border rounded-lg bg-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Costo total promedio por vehículo</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(603040)}</p>
              <div className="flex items-center mt-1">
                <div className="flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+32%</span>
                </div>
                <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
              </div>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Car className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        {/* Vehículo con mayor costo */}
        <div className="p-5 border rounded-lg bg-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Vehículo con mayor costo</p>
              <p className="text-2xl font-bold mt-1">AF445FI</p>
              <p className="text-sm font-medium text-gray-700">{formatCurrency(1603040)}</p>
              <div className="flex items-center mt-1">
                <button className="text-xs text-blue-600 hover:underline">Ver Detalle de uso</button>
              </div>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <User className="h-3 w-3 mr-1" />
                <span>Fernando Perez</span>
              </div>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Car className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        {/* Número de intervenciones */}
        <div className="p-5 border rounded-lg bg-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">N° intervenciones</p>
              <p className="text-2xl font-bold mt-1">12</p>
              <div className="flex items-center mt-1">
                <div className="flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  <span>-6%</span>
                </div>
                <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
              </div>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Tool className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gráfico de línea - Evolución de costos */}
        <div className="md:col-span-2 p-5 border rounded-lg bg-card">
          <h2 className="text-lg font-semibold mb-4">Costos total incurridos por mes</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`${formatCurrency(value * 1000)}`, "Costo"]}
                  labelFormatter={(label: any) => `Mes: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Costo Total"
                />
                <Line
                  type="monotone"
                  dataKey="mantenimiento"
                  stroke="#9ca3af"
                  strokeDasharray="5 5"
                  name="Mantenimiento"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de torta - Tipos de intervenciones */}
        <div className="p-5 border rounded-lg bg-card">
          <h2 className="text-lg font-semibold mb-4">Proporción de Tipos de Intervención</h2>
          <div className="h-[200px] flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={interventionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {interventionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value:number) => [`${value}`, "Cantidad"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Tabla de intervenciones */}
          <div className="mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Intervenciones realizadas</th>
                  <th className="text-center py-2">Total</th>
                  <th className="text-right py-2">Resultado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Repuestos</td>
                  <td className="text-center py-2">4</td>
                  <td className="text-right py-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      -6%
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Roturas</td>
                  <td className="text-center py-2">3</td>
                  <td className="text-right py-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                      +22%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Otros</td>
                  <td className="text-center py-2">9</td>
                  <td className="text-right py-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                      +10%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tabla de vehículos con mayor gasto */}
      <div className="p-5 border rounded-lg bg-card">
        <h2 className="text-lg font-semibold mb-4">Vehículos con mayor gasto</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left py-3 px-4 font-medium">Patente</th>
                <th className="text-left py-3 px-4 font-medium">Operario Responsable</th>
                <th className="text-right py-3 px-4 font-medium">Costo Total</th>
                <th className="text-center py-3 px-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {topVehicles.map((vehicle, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 font-medium">{vehicle.patent}</td>
                  <td className="py-3 px-4">{vehicle.driver}</td>
                  <td className="py-3 px-4 text-right">{formatCurrency(vehicle.cost)}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-xs text-blue-600 hover:underline">Ver Detalle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardGeneral

