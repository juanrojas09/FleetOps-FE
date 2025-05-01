"use client"

import { useState } from "react"
import {
  Calendar,
  Car,
  DollarSign,
  TrendingDown,
  TrendingUp,
  FileSpreadsheet,
  Download,
  AlertCircle,
  Route,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
} from "recharts"

// Datos simulados para los últimos 12 meses
const monthlyDistanceData = [
  { name: "Ene", kmTraveled: 2500, fuelCost: 1000000, costPerKm: 400 },
  { name: "Feb", kmTraveled: 2300, fuelCost: 1050000, costPerKm: 456.52 },
  { name: "Mar", kmTraveled: 2700, fuelCost: 1200000, costPerKm: 444.44 },
  { name: "Abr", kmTraveled: 2900, fuelCost: 1350000, costPerKm: 465.52 },
  { name: "May", kmTraveled: 3100, fuelCost: 1450000, costPerKm: 467.74 },
  { name: "Jun", kmTraveled: 3300, fuelCost: 1550000, costPerKm: 469.7 },
  { name: "Jul", kmTraveled: 3000, fuelCost: 1400000, costPerKm: 466.67 },
  { name: "Ago", kmTraveled: 3200, fuelCost: 1600000, costPerKm: 500.0 },
]

// Vehículos con su eficiencia
const vehiclesEfficiency = [
  { id: 1, patent: "AF445FI", kmTraveled: 5000, fuelCost: 3315200, costPerKm: 663.04, operator: "Fernando Perez" },
  { id: 2, patent: "AD814AF", kmTraveled: 4200, fuelCost: 2940000, costPerKm: 700.0, operator: "Carlos Gutierrez" },
  { id: 3, patent: "AC875CG", kmTraveled: 3800, fuelCost: 2850000, costPerKm: 750.0, operator: "Martín Rodriguez" },
]

// Historial de viajes para el vehículo seleccionado
const vehicleTripHistory = [
  {
    id: 1,
    date: "15/06/2025",
    origin: "Buenos Aires",
    destination: "Rosario",
    distance: 300,
    fuelCost: 180000,
    costPerKm: 600,
  },
  {
    id: 2,
    date: "08/06/2025",
    origin: "Rosario",
    destination: "Córdoba",
    distance: 400,
    fuelCost: 240000,
    costPerKm: 600,
  },
  {
    id: 3,
    date: "01/06/2025",
    origin: "Córdoba",
    destination: "Buenos Aires",
    distance: 700,
    fuelCost: 420000,
    costPerKm: 600,
  },
  {
    id: 4,
    date: "25/05/2025",
    origin: "Buenos Aires",
    destination: "Mar del Plata",
    distance: 400,
    fuelCost: 240000,
    costPerKm: 600,
  },
  {
    id: 5,
    date: "18/05/2025",
    origin: "Mar del Plata",
    destination: "Buenos Aires",
    distance: 400,
    fuelCost: 240000,
    costPerKm: 600,
  },
]

export const RoutingCostsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Jun 2025")
  const [totalKmTraveled, setTotalKmTraveled] = useState(12000)
  const [previousPeriodKm, setPreviousPeriodKm] = useState(16200)
  const [costPerKm, setCostPerKm] = useState(603.04)
  const [previousCostPerKm, setPreviousCostPerKm] = useState(580.25)
  const [showVehicleDetail, setShowVehicleDetail] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [showVehicleList, setShowVehicleList] = useState(false)

  // Calcular variaciones porcentuales
  const kmVariation = (((totalKmTraveled - previousPeriodKm) / previousPeriodKm) * 100).toFixed(0)
  const costPerKmVariation = (((costPerKm - previousCostPerKm) / previousCostPerKm) * 100).toFixed(0)

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
    const newPeriod = event.target.value
    setSelectedPeriod(newPeriod)

    // Simulamos cambios en los datos según el período seleccionado
    // En una aplicación real, aquí se cargarían los datos desde una API
    switch (newPeriod) {
      case "Jun 2025":
        setTotalKmTraveled(12000)
        setPreviousPeriodKm(16200)
        setCostPerKm(603.04)
        setPreviousCostPerKm(580.25)
        break
      case "May 2025":
        setTotalKmTraveled(16200)
        setPreviousPeriodKm(15400)
        setCostPerKm(580.25)
        setPreviousCostPerKm(570.13)
        break
      case "Abr 2025":
        setTotalKmTraveled(15400)
        setPreviousPeriodKm(14500)
        setCostPerKm(570.13)
        setPreviousCostPerKm(550.34)
        break
      default:
        setTotalKmTraveled(12000)
        setPreviousPeriodKm(16200)
        setCostPerKm(603.04)
        setPreviousCostPerKm(580.25)
    }
  }

  // Función para mostrar el detalle de un vehículo
  const handleViewVehicleDetail = (vehicle:any) => {
    setSelectedVehicle(vehicle)
    setShowVehicleDetail(true)
    setShowVehicleList(false)
  }

  // Función para mostrar la lista de vehículos
  const handleViewVehicleList = () => {
    setShowVehicleList(true)
    setShowVehicleDetail(false)
  }

  // Función para volver a la vista principal
  const handleBackToMain = () => {
    setShowVehicleDetail(false)
    setShowVehicleList(false)
    setSelectedVehicle(null)
  }

  // Encontrar el vehículo más eficiente (menor costo por km)
  const mostEfficientVehicle = vehiclesEfficiency.reduce((prev, current) =>
    prev.costPerKm < current.costPerKm ? prev : current,
  )

  return (
    <div className="space-y-6">
      {!showVehicleDetail && !showVehicleList ? (
        <>
          {/* Encabezado y selector de período */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Costo de distancias</h1>
              <p className="text-gray-500">
                Análisis de la eficiencia del uso de combustible en relación a los kilómetros recorridos
              </p>
            </div>
            <div className="flex items-center gap-2">
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

          {/* Indicadores principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* RF 4.1: Total de kilómetros recorridos */}
            <div className="p-5 border rounded-lg bg-card">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total de KM recorridos</p>
                  <p className="text-2xl font-bold mt-1">{totalKmTraveled.toLocaleString()} KM</p>
                  <div className="flex items-center mt-1">
                    {/* RF 4.1.1: Variación porcentual */}
                    <div
                      className={`flex items-center px-2 py-1 rounded-full text-xs ${parseFloat(kmVariation) < 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {parseFloat(kmVariation) < 0 ? (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      )}
                      <span>{parseFloat(kmVariation) > 0 ? `+${kmVariation}%` : `${kmVariation}%`}</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
                  </div>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Route className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>

            {/* RF 4.2: Costo promedio por kilómetro recorrido */}
            <div className="p-5 border rounded-lg bg-card">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Costo por kilómetro recorrido (Global)</p>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(costPerKm)}</p>
                  <div className="flex items-center mt-1">
                    <div
                      className={`flex items-center px-2 py-1 rounded-full text-xs ${parseFloat(costPerKmVariation) < 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {parseFloat(costPerKmVariation) < 0 ? (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      )}
                      <span>{parseFloat(costPerKmVariation) > 0 ? `+${costPerKmVariation}%` : `${costPerKmVariation}%`}</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
                  </div>
                  {/* RF 4.2.2: Ver detalle por vehículo */}
                  <button className="text-xs text-blue-600 hover:underline mt-2" onClick={handleViewVehicleList}>
                    Ver Detalle por vehículo
                  </button>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>

            {/* RF 4.3: Vehículo más eficiente */}
            <div className="p-5 border rounded-lg bg-card">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Vehículo con mayor eficiencia</p>
                  <p className="text-2xl font-bold mt-1">{mostEfficientVehicle.patent}</p>
                  <p className="text-sm font-medium text-gray-700">
                    {formatCurrency(mostEfficientVehicle.costPerKm)} /{" "}
                    {mostEfficientVehicle.kmTraveled.toLocaleString()}Km
                  </p>
                  <div className="flex items-center mt-1">
                    {/* RF 4.3.2: Acceso al detalle de uso */}
                    <button
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => handleViewVehicleDetail(mostEfficientVehicle)}
                    >
                      Ver Detalle de uso
                    </button>
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <span>{mostEfficientVehicle.operator}</span>
                  </div>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Car className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* RF 4.4: Gráfica combinada (barras + línea) */}
            <div className="p-5 border rounded-lg bg-card">
              <h2 className="text-lg font-semibold mb-4">Histórico de distancias recorridas vs Costo (KM)</h2>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyDistanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      label={{ value: "KM Recorridos", angle: -90, position: "insideLeft" }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      label={{ value: "Costo ($)", angle: 90, position: "insideRight" }}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "kmTraveled") return [`${value.toLocaleString()} km`, "Kilómetros"]
                        if (name === "fuelCost") return [formatCurrency(value), "Costo"]
                        return [value, name]
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="kmTraveled"
                      name="KM Recorridos"
                      yAxisId="left"
                      fill="#60a5fa"
                      radius={[4, 4, 0, 0]}
                    />
                    <Line
                      type="monotone"
                      dataKey="fuelCost"
                      name="Costo de Combustible"
                      yAxisId="right"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* RF 4.5: Gráfica de línea con evolución del costo por KM */}
            <div className="p-5 border rounded-lg bg-card">
              <h2 className="text-lg font-semibold mb-4">Histórico de costo por (KM)</h2>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyDistanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      domain={[300, 600]}
                      label={{ value: "Costo por KM ($)", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      formatter={(value) => [formatCurrency(value), "Costo por KM"]}
                      labelFormatter={(label) => `Mes: ${label}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="costPerKm"
                      name="Costo por KM"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Tabla de vehículos por eficiencia */}
          <div className="p-5 border rounded-lg bg-card">
            <h2 className="text-lg font-semibold mb-4">Vehículos ordenados por eficiencia (menor costo por KM)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-3 px-4 font-medium">Patente</th>
                    <th className="text-right py-3 px-4 font-medium">KM Recorridos</th>
                    <th className="text-right py-3 px-4 font-medium">Costo Total</th>
                    <th className="text-right py-3 px-4 font-medium">Costo por KM</th>
                    <th className="text-left py-3 px-4 font-medium">Operario Responsable</th>
                    <th className="text-center py-3 px-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {[...vehiclesEfficiency]
                    .sort((a, b) => a.costPerKm - b.costPerKm)
                    .map((vehicle) => (
                      <tr key={vehicle.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{vehicle.patent}</td>
                        <td className="py-3 px-4 text-right">{vehicle.kmTraveled.toLocaleString()} km</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(vehicle.fuelCost)}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(vehicle.costPerKm)}</td>
                        <td className="py-3 px-4">{vehicle.operator}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            className="text-xs text-blue-600 hover:underline"
                            onClick={() => handleViewVehicleDetail(vehicle)}
                          >
                            Ver Detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="flex items-start gap-4 p-4 border rounded-lg bg-amber-50">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Nota sobre los costos por distancia</p>
              <p className="text-sm text-amber-700 mt-1">
                El costo por kilómetro es un indicador clave de la eficiencia operativa de la flota. Un aumento
                sostenido en este indicador puede señalar problemas mecánicos, rutas ineficientes o prácticas de
                conducción que aumentan el consumo de combustible. Se recomienda investigar los vehículos con costos por
                kilómetro significativamente más altos que el promedio.
              </p>
            </div>
          </div>
        </>
      ) : showVehicleDetail ? (
        /* Vista de detalle del vehículo */
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 bg-card border rounded-md px-3 py-2 text-sm hover:bg-accent"
                onClick={handleBackToMain}
              >
                ← Volver
              </button>
              <h1 className="text-2xl font-bold">Detalle de Eficiencia - {selectedVehicle?.patent}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 bg-card border rounded-md px-3 py-2 text-sm hover:bg-accent">
                <FileSpreadsheet className="h-4 w-4" />
                Exportar
              </button>
            </div>
          </div>

          {/* Información del vehículo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-2">Información del Vehículo</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Patente:</span>
                  <span className="text-sm font-medium">{selectedVehicle?.patent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Operario Responsable:</span>
                  <span className="text-sm font-medium">{selectedVehicle?.operator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Recorrido (Mes):</span>
                  <span className="text-sm font-medium">{selectedVehicle?.kmTraveled.toLocaleString()} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Costo Total (Mes):</span>
                  <span className="text-sm font-medium">{formatCurrency(selectedVehicle?.fuelCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Costo por KM:</span>
                  <span className="text-sm font-medium">{formatCurrency(selectedVehicle?.costPerKm)}</span>
                </div>
              </div>
            </div>

            <div className="p-5 border rounded-lg bg-card md:col-span-2">
              <h3 className="text-lg font-semibold mb-2">Resumen de Eficiencia</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-500">Rendimiento Promedio</p>
                  <p className="text-xl font-bold">7.8 km/l</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-500">Consumo Total</p>
                  <p className="text-xl font-bold">641 litros</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-gray-500">Eficiencia vs Promedio</p>
                  <p className="text-xl font-bold text-green-600">+12%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Historial de viajes */}
          <div className="p-5 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-4">Historial de Viajes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-3 px-4 font-medium">Fecha</th>
                    <th className="text-left py-3 px-4 font-medium">Origen</th>
                    <th className="text-left py-3 px-4 font-medium">Destino</th>
                    <th className="text-right py-3 px-4 font-medium">Distancia</th>
                    <th className="text-right py-3 px-4 font-medium">Costo</th>
                    <th className="text-right py-3 px-4 font-medium">Costo/KM</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleTripHistory.map((trip) => (
                    <tr key={trip.id} className="border-b">
                      <td className="py-3 px-4">{trip.date}</td>
                      <td className="py-3 px-4">{trip.origin}</td>
                      <td className="py-3 px-4">{trip.destination}</td>
                      <td className="py-3 px-4 text-right">{trip.distance} km</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(trip.fuelCost)}</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(trip.costPerKm)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gráfico de eficiencia */}
          <div className="p-5 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-4">Análisis de Eficiencia Mensual</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: "Ene", costPerKm: 680 },
                    { month: "Feb", costPerKm: 670 },
                    { month: "Mar", costPerKm: 675 },
                    { month: "Abr", costPerKm: 665 },
                    { month: "May", costPerKm: 670 },
                    { month: "Jun", costPerKm: 663 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[650, 700]} />
                  <Tooltip formatter={(value) => [formatCurrency(value), "Costo por KM"]} />
                  <Legend />
                  <Line type="monotone" dataKey="costPerKm" name="Costo por KM" stroke="#10b981" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        /* Vista de lista de vehículos */
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 bg-card border rounded-md px-3 py-2 text-sm hover:bg-accent"
                onClick={handleBackToMain}
              >
                ← Volver
              </button>
              <h1 className="text-2xl font-bold">Detalle por Vehículo - Costo por KM</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 bg-card border rounded-md px-3 py-2 text-sm hover:bg-accent">
                <FileSpreadsheet className="h-4 w-4" />
                Exportar
              </button>
            </div>
          </div>

          {/* Tabla de todos los vehículos */}
          <div className="p-5 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-4">Detalle de Costo por KM de todos los vehículos</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-3 px-4 font-medium">Patente</th>
                    <th className="text-right py-3 px-4 font-medium">KM Recorridos</th>
                    <th className="text-right py-3 px-4 font-medium">Costo Total</th>
                    <th className="text-right py-3 px-4 font-medium">Costo por KM</th>
                    <th className="text-left py-3 px-4 font-medium">Operario Responsable</th>
                    <th className="text-center py-3 px-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {[...vehiclesEfficiency].map((vehicle) => (
                    <tr key={vehicle.id} className="border-b">
                      <td className="py-3 px-4 font-medium">{vehicle.patent}</td>
                      <td className="py-3 px-4 text-right">{vehicle.kmTraveled.toLocaleString()} km</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(vehicle.fuelCost)}</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(vehicle.costPerKm)}</td>
                      <td className="py-3 px-4">{vehicle.operator}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          className="text-xs text-blue-600 hover:underline"
                          onClick={() => handleViewVehicleDetail(vehicle)}
                        >
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gráfico comparativo */}
          <div className="p-5 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-4">Comparativa de Costo por KM entre vehículos</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vehiclesEfficiency} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="patent" />
                  <YAxis domain={[600, 800]} />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "costPerKm") return [formatCurrency(value), "Costo por KM"]
                      return [value, name]
                    }}
                  />
                  <Legend />
                  <Bar dataKey="costPerKm" name="Costo por KM" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

