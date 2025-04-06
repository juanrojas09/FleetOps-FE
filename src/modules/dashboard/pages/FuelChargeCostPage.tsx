

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
  Droplets,
  BarChart3,
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
  ReferenceLine,
} from "recharts"

// Datos simulados para los últimos 12 meses
const monthlyFuelChargeData = [
  { name: "Ene", totalCost: 850000, liters: 850, avgPrice: 1000, kmTraveled: 6800, efficiency: 8.0 },
  { name: "Feb", totalCost: 920000, liters: 920, avgPrice: 1000, kmTraveled: 7360, efficiency: 8.0 },
  { name: "Mar", totalCost: 780000, liters: 780, avgPrice: 1000, kmTraveled: 6240, efficiency: 8.0 },
  { name: "Abr", totalCost: 850000, liters: 850, avgPrice: 1000, kmTraveled: 6800, efficiency: 8.0 },
  { name: "May", totalCost: 920000, liters: 920, avgPrice: 1000, kmTraveled: 6440, efficiency: 7.0 },
  { name: "Jun", totalCost: 980000, liters: 980, avgPrice: 1000, kmTraveled: 6860, efficiency: 7.0 },
  { name: "Jul", totalCost: 950000, liters: 950, avgPrice: 1000, kmTraveled: 7600, efficiency: 8.0 },
  { name: "Ago", totalCost: 880000, liters: 880, avgPrice: 1000, kmTraveled: 7040, efficiency: 8.0 },
  { name: "Sep", totalCost: 900000, liters: 900, avgPrice: 1000, kmTraveled: 7200, efficiency: 8.0 },
  { name: "Oct", totalCost: 1050000, liters: 1050, avgPrice: 1000, kmTraveled: 8400, efficiency: 8.0 },
  { name: "Nov", totalCost: 980000, liters: 980, avgPrice: 1000, kmTraveled: 7840, efficiency: 8.0 },
  { name: "Dic", totalCost: 990000, liters: 990, avgPrice: 1000, kmTraveled: 7920, efficiency: 8.0 },
]

// Vehículos con mayor carga
const vehiclesWithHighestCharge = [
  { id: 1, patent: "AF445FI", totalCost: 1603040, liters: 1603, operator: "Fernando Perez" },
  { id: 2, patent: "AD814AF", totalCost: 1245780, liters: 1246, operator: "Carlos Gutierrez" },
  { id: 3, patent: "AC875CG", totalCost: 987650, liters: 988, operator: "Martín Rodriguez" },
]

// Historial de cargas para el vehículo seleccionado
const vehicleChargeHistory = [
  {
    id: 1,
    date: "15/06/2025",
    liters: 85,
    cost: 85000,
    station: "YPF Av. Libertador",
    odometer: 45600,
    operator: "Fernando Perez",
  },
  {
    id: 2,
    date: "08/06/2025",
    liters: 90,
    cost: 90000,
    station: "Shell Panamericana",
    odometer: 45100,
    operator: "Fernando Perez",
  },
  {
    id: 3,
    date: "01/06/2025",
    liters: 88,
    cost: 88000,
    station: "YPF Av. Libertador",
    odometer: 44600,
    operator: "Fernando Perez",
  },
  {
    id: 4,
    date: "25/05/2025",
    liters: 92,
    cost: 92000,
    station: "Axion Energy",
    odometer: 44100,
    operator: "Fernando Perez",
  },
  {
    id: 5,
    date: "18/05/2025",
    liters: 87,
    cost: 87000,
    station: "YPF Av. Libertador",
    odometer: 43600,
    operator: "Fernando Perez",
  },
]

export const FuelChargeCostPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Jun 2025")
  const [totalFuelCost, setTotalFuelCost] = useState(11852572)
  const [previousPeriodCost, setPreviousPeriodCost] = useState(16017800)
  const [averageCostPerVehicle, setAverageCostPerVehicle] = useState(1681.84)
  const [previousAverageCost, setPreviousAverageCost] = useState(1274.12)
  const [averagePricePerLiter, setAveragePricePerLiter] = useState(1000)
  const [previousPricePerLiter, setPreviousPricePerLiter] = useState(1064)
  const [activeVehicles, setActiveVehicles] = useState(24)
  const [showVehicleDetail, setShowVehicleDetail] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)

  // Calcular variaciones porcentuales
  const costVariation = (((totalFuelCost - previousPeriodCost) / previousPeriodCost) * 100).toFixed(0)
  const averageCostVariation = (((averageCostPerVehicle - previousAverageCost) / previousAverageCost) * 100).toFixed(0)
  const pricePerLiterVariation = (
    ((averagePricePerLiter - previousPricePerLiter) / previousPricePerLiter) *
    100
  ).toFixed(0)

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
  const handlePeriodChange = (e:any) => {
    const newPeriod = e.target.value
    setSelectedPeriod(newPeriod)

    // Simulamos cambios en los datos según el período seleccionado
    // En una aplicación real, aquí se cargarían los datos desde una API
    switch (newPeriod) {
      case "Jun 2025":
        setTotalFuelCost(11852572)
        setPreviousPeriodCost(16017800)
        setAverageCostPerVehicle(1681.84)
        setPreviousAverageCost(1274.12)
        setAveragePricePerLiter(1000)
        setPreviousPricePerLiter(1064)
        break
      case "May 2025":
        setTotalFuelCost(16017800)
        setPreviousPeriodCost(15254000)
        setAverageCostPerVehicle(1274.12)
        setPreviousAverageCost(1215.0)
        setAveragePricePerLiter(1064)
        setPreviousPricePerLiter(1050)
        break
      case "Abr 2025":
        setTotalFuelCost(15254000)
        setPreviousPeriodCost(14500000)
        setAverageCostPerVehicle(1215.0)
        setPreviousAverageCost(1180.0)
        setAveragePricePerLiter(1050)
        setPreviousPricePerLiter(1030)
        break
      default:
        setTotalFuelCost(11852572)
        setPreviousPeriodCost(16017800)
        setAverageCostPerVehicle(1681.84)
        setPreviousAverageCost(1274.12)
        setAveragePricePerLiter(1000)
        setPreviousPricePerLiter(1064)
    }
  }

  // Función para mostrar el detalle de un vehículo
  const handleViewVehicleDetail = (vehicle:any) => {
    setSelectedVehicle(vehicle)
    setShowVehicleDetail(true)
  }

  // Función para volver a la vista principal
  const handleBackToMain = () => {
    setShowVehicleDetail(false)
    setSelectedVehicle(null)
  }

  // Calcular el promedio de eficiencia para la línea de referencia
  const avgEfficiency =
    monthlyFuelChargeData.reduce((sum, item) => sum + item.efficiency, 0) / monthlyFuelChargeData.length

  return (
    <div className="space-y-6">
      {!showVehicleDetail ? (
        <>
          {/* Encabezado y selector de período */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Costos de Cargas de combustible</h1>
              <p className="text-gray-500">Análisis de gastos en carga de combustible de la flota</p>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* RF 3.1: Costo total de carga de combustible */}
            <div className="p-5 border rounded-lg bg-card">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Costos total de carga</p>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(totalFuelCost)}</p>
                  <div className="flex items-center mt-1">
                    {/* RF 3.1.1: Variación porcentual */}
                    <div
                      className={`flex items-center px-2 py-1 rounded-full text-xs ${parseFloat(costVariation) < 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {parseFloat(costVariation) < 0 ? (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      )}
                      <span>{parseFloat(costVariation) > 0 ? `+${costVariation}%` : `${costVariation}%`}</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
                  </div>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>

            {/* RF 3.2: Costo promedio mensual en combustible por vehículo */}
            <div className="p-5 border rounded-lg bg-card">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Costo total promedio por vehículo</p>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(averageCostPerVehicle)}</p>
                  <div className="flex items-center mt-1">
                    {/* RF 3.2.1: Variación porcentual */}
                    <div
                      className={`flex items-center px-2 py-1 rounded-full text-xs ${parseFloat(averageCostVariation) < 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {parseFloat(averageCostVariation) < 0 ? (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      )}
                      <span>{parseFloat(averageCostVariation) > 0 ? `+${averageCostVariation}%` : `${averageCostVariation}%`}</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-gray-500">Vehículos activos: {activeVehicles}</span>
                  </div>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Car className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>

            {/* RF 3.3: Vehículo con mayor carga de combustible */}
            <div className="p-5 border rounded-lg bg-card">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Vehículo con mayor carga</p>
                  <p className="text-2xl font-bold mt-1">AF445FI</p>
                  <p className="text-sm font-medium text-gray-700">{formatCurrency(1603040)}</p>
                  <div className="flex items-center mt-1">
                    {/* RF 3.3.1: Acceso al detalle de uso */}
                    <button
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => handleViewVehicleDetail(vehiclesWithHighestCharge[0])}
                    >
                      Ver Detalle de uso
                    </button>
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <span>Fernando Perez</span>
                  </div>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Droplets className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>

            {/* RF 3.4: Precio promedio por litro de combustible */}
            <div className="p-5 border rounded-lg bg-card">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Costo promedio por litro</p>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(averagePricePerLiter)}</p>
                  <div className="flex items-center mt-1">
                    {/* RF 3.4.1: Variación porcentual */}
                    <div
                      className={`flex items-center px-2 py-1 rounded-full text-xs ${parseFloat(pricePerLiterVariation) < 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {parseFloat(pricePerLiterVariation) < 0 ? (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      )}
                      <span>
                        {parseFloat(pricePerLiterVariation) > 0 ? `+${pricePerLiterVariation}%` : `${pricePerLiterVariation}%`}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
                  </div>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* RF 3.5: Gráfica de barras verticales con gastos mensuales */}
            <div className="p-5 border rounded-lg bg-card">
              <h2 className="text-lg font-semibold mb-4">Costos totales incurridos en cargas de combustible</h2>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyFuelChargeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value / 1000}K`} />
                    <Tooltip
                      formatter={(value) => [formatCurrency(value), "Costo"]}
                      labelFormatter={(label) => `Mes: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="totalCost" name="Costo Total" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* RF 3.6: Gráfica de líneas que compare rendimiento vs distancia */}
            <div className="p-5 border rounded-lg bg-card">
              <h2 className="text-lg font-semibold mb-4">
                Control de litros totales cargados vs registro distancia real registrada
              </h2>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyFuelChargeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      yAxisId="left"
                      domain={[6, 9]}
                      label={{ value: "Rendimiento (km/l)", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "efficiency") return [`${value} km/l`, "Rendimiento"]
                        return [value, name]
                      }}
                    />
                    <Legend />
                    <ReferenceLine
                      y={avgEfficiency}
                      yAxisId="left"
                      stroke="#8884d8"
                      strokeDasharray="3 3"
                      label={{ value: "Promedio esperado", position: "insideBottomRight" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      name="Rendimiento (km/l)"
                      stroke="#f59e0b"
                      yAxisId="left"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Tabla de vehículos con mayor carga */}
          <div className="p-5 border rounded-lg bg-card">
            <h2 className="text-lg font-semibold mb-4">Vehículos con mayor carga de combustible</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-3 px-4 font-medium">Patente</th>
                    <th className="text-right py-3 px-4 font-medium">Litros Cargados</th>
                    <th className="text-right py-3 px-4 font-medium">Costo Total</th>
                    <th className="text-left py-3 px-4 font-medium">Operario Responsable</th>
                    <th className="text-center py-3 px-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiclesWithHighestCharge.map((vehicle) => (
                    <tr key={vehicle.id} className="border-b">
                      <td className="py-3 px-4 font-medium">{vehicle.patent}</td>
                      <td className="py-3 px-4 text-right">{vehicle.liters} L</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(vehicle.totalCost)}</td>
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
              <p className="font-medium text-amber-800">Nota sobre los costos de carga de combustible</p>
              <p className="text-sm text-amber-700 mt-1">
                Los costos de carga de combustible representan uno de los mayores gastos operativos de la flota. Un
                rendimiento por debajo del promedio esperado puede indicar problemas mecánicos, conducción ineficiente o
                posibles desvíos en el uso del combustible. Revise los casos donde la eficiencia cae significativamente
                por debajo de la línea de referencia.
              </p>
            </div>
          </div>
        </>
      ) : (
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
              <h1 className="text-2xl font-bold">Detalle de Cargas - {selectedVehicle?.patent}</h1>
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
                  <span className="text-sm text-gray-500">Total Cargado (Mes):</span>
                  <span className="text-sm font-medium">{selectedVehicle?.liters} litros</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Costo Total (Mes):</span>
                  <span className="text-sm font-medium">{formatCurrency(selectedVehicle?.totalCost)}</span>
                </div>
              </div>
            </div>

            <div className="p-5 border rounded-lg bg-card md:col-span-2">
              <h3 className="text-lg font-semibold mb-2">Resumen de Rendimiento</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-500">Rendimiento Promedio</p>
                  <p className="text-xl font-bold">7.8 km/l</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-500">Distancia Recorrida</p>
                  <p className="text-xl font-bold">1,250 km</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-gray-500">Costo por Km</p>
                  <p className="text-xl font-bold">{formatCurrency(128)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Historial de cargas */}
          <div className="p-5 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-4">Historial de Cargas</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-3 px-4 font-medium">Fecha</th>
                    <th className="text-right py-3 px-4 font-medium">Litros</th>
                    <th className="text-right py-3 px-4 font-medium">Costo</th>
                    <th className="text-left py-3 px-4 font-medium">Estación</th>
                    <th className="text-right py-3 px-4 font-medium">Odómetro</th>
                    <th className="text-left py-3 px-4 font-medium">Operario</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleChargeHistory.map((charge) => (
                    <tr key={charge.id} className="border-b">
                      <td className="py-3 px-4">{charge.date}</td>
                      <td className="py-3 px-4 text-right">{charge.liters} L</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(charge.cost)}</td>
                      <td className="py-3 px-4">{charge.station}</td>
                      <td className="py-3 px-4 text-right">{charge.odometer} km</td>
                      <td className="py-3 px-4">{charge.operator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gráfico de rendimiento */}
          <div className="p-5 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-4">Análisis de Rendimiento</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { date: "01/06", km: 500, efficiency: 8.1 },
                    { date: "08/06", km: 510, efficiency: 7.9 },
                    { date: "15/06", km: 490, efficiency: 7.6 },
                    { date: "22/06", km: 520, efficiency: 8.0 },
                    { date: "29/06", km: 480, efficiency: 7.8 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[7, 9]} />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine y={8.0} stroke="#8884d8" strokeDasharray="3 3" label="Promedio esperado" />
                  <Line
                    type="monotone"
                    dataKey="efficiency"
                    name="Rendimiento (km/l)"
                    stroke="#f59e0b"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

