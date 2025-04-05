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
} from "lucide-react"
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
  BarChart,
  Bar,
} from "recharts"
import { ValueType } from "recharts/types/component/DefaultTooltipContent"

// Datos simulados para los últimos 6 meses
const monthlyOperativeCostsData = [
  {
    name: "Ene",
    combustible: 2100000,
    mantenimiento: 980000,
    seguros: 350000,
    repuestos: 420000,
    manoDeObra: 280000,
    total: 4130000,
  },
  {
    name: "Feb",
    combustible: 1900000,
    mantenimiento: 650000,
    seguros: 350000,
    repuestos: 380000,
    manoDeObra: 250000,
    total: 3530000,
  },
  {
    name: "Mar",
    combustible: 2200000,
    mantenimiento: 850000,
    seguros: 350000,
    repuestos: 450000,
    manoDeObra: 300000,
    total: 4150000,
  },
  {
    name: "Abr",
    combustible: 2400000,
    mantenimiento: 720000,
    seguros: 350000,
    repuestos: 520000,
    manoDeObra: 320000,
    total: 4310000,
  },
  {
    name: "May",
    combustible: 2600000,
    mantenimiento: 950000,
    seguros: 350000,
    repuestos: 580000,
    manoDeObra: 350000,
    total: 4830000,
  },
  {
    name: "Jun",
    combustible: 2800000,
    mantenimiento: 1200000,
    seguros: 350000,
    repuestos: 620000,
    manoDeObra: 380000,
    total: 5350000,
  },
]

// Datos para la distribución de costos (gráfico circular)
const costDistributionData = [
  { name: "Combustible", value: 2800000, percentage: 52.3, color: "#10b981" },
  { name: "Repuestos", value: 620000, percentage: 11.6, color: "#f59e0b" },
  { name: "Mano de Obra", value: 380000, percentage: 7.1, color: "#3b82f6" },
  { name: "Seguros", value: 350000, percentage: 6.5, color: "#ec4899" },
  { name: "Mantenimiento", value: 1200000, percentage: 22.5, color: "#8b5cf6" },
]

// Vehículos con sobrecosto
const vehiclesWithOvercost = [
  {
    id: 1,
    patent: "AF445FI",
    estimatedCost: 1200000,
    actualCost: 1603040,
    difference: 403040,
    operator: "Fernando Perez",
  },
  {
    id: 2,
    patent: "AD814AF",
    estimatedCost: 950000,
    actualCost: 1245780,
    difference: 295780,
    operator: "Carlos Gutierrez",
  },
  {
    id: 3,
    patent: "AC875CG",
    estimatedCost: 800000,
    actualCost: 987650,
    difference: 187650,
    operator: "Martín Rodriguez",
  },
]

export default function OperativeCosts() {
  const [selectedPeriod, setSelectedPeriod] = useState("Jun 2025")
  const [totalOperativeCosts, setTotalOperativeCosts] = useState(5350000)
  const [previousPeriodCosts, setPreviousPeriodCosts] = useState(4830000)
  const [averageCostPerVehicle, setAverageCostPerVehicle] = useState(603040)
  const [previousAverageCost, setPreviousAverageCost] = useState(456900)
  const [activeVehicles, setActiveVehicles] = useState(24)

  // Calcular variaciones porcentuales
  const costVariation = (((totalOperativeCosts - previousPeriodCosts) / previousPeriodCosts) * 100).toFixed(1)
  const averageCostVariation = (((averageCostPerVehicle - previousAverageCost) / previousAverageCost) * 100).toFixed(1)

 
  const formatCurrency = (value: bigint | ValueType) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(value as number)
      .replace("ARS", "$")
  }

  const handlePeriodChange = (event:any) => {
    const newPeriod = event.target.value
    setSelectedPeriod(newPeriod)


    switch (newPeriod) {
      case "Jun 2025":
        setTotalOperativeCosts(5350000)
        setPreviousPeriodCosts(4830000)
        setAverageCostPerVehicle(603040)
        setPreviousAverageCost(456900)
        break
      case "May 2025":
        setTotalOperativeCosts(4830000)
        setPreviousPeriodCosts(4310000)
        setAverageCostPerVehicle(456900)
        setPreviousAverageCost(410000)
        break
      case "Abr 2025":
        setTotalOperativeCosts(4310000)
        setPreviousPeriodCosts(4150000)
        setAverageCostPerVehicle(410000)
        setPreviousAverageCost(395000)
        break
      default:
        setTotalOperativeCosts(5350000)
        setPreviousPeriodCosts(4830000)
        setAverageCostPerVehicle(603040)
        setPreviousAverageCost(456900)
    }
  }

  return (
    <div className="space-y-6">
      {/* Encabezado y selector de período */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Costos Operativos</h1>
          <p className="text-gray-500">Medir la eficiencia operativa relacionada a los vehículos</p>
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
        {/* RF 2.1: Total acumulado de costos operativos */}
        <div className="p-5 border rounded-lg bg-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Costos operativos totales</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(totalOperativeCosts)}</p>
              <div className="flex items-center mt-1">
                {/* RF 2.1.2: Variación porcentual */}
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
                <span className="text-xs text-gray-500 ml-2">del mes anterior</span>
              </div>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        {/* RF 2.2: Costo promedio mensual de operación por vehículo */}
        <div className="p-5 border rounded-lg bg-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Costo promedio por vehículo</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(averageCostPerVehicle)}</p>
              <div className="flex items-center mt-1">
                {/* RF 2.2.2: Variación porcentual */}
                <div
                  className={`flex items-center px-2 py-1 rounded-full text-xs ${parseFloat(averageCostVariation) < 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {parseFloat(averageCostVariation)  < 0 ? (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  )}
                  <span>{parseFloat(averageCostVariation)  > 0 ? `+${averageCostVariation}%` : `${averageCostVariation}%`}</span>
                </div>
                <span className="text-xs text-gray-500 ml-2">del mes anterior</span>
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

        {/* Desglose de costos operativos */}
        <div className="p-5 border rounded-lg bg-card">
          <h3 className="text-sm text-gray-500 mb-3">Desglose de costos operativos</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs">Combustible</span>
              <span className="text-xs font-medium">{formatCurrency(2800000)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "52.3%" }}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs">Mantenimiento</span>
              <span className="text-xs font-medium">{formatCurrency(1200000)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "22.5%" }}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs">Repuestos</span>
              <span className="text-xs font-medium">{formatCurrency(620000)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "11.6%" }}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs">Mano de obra</span>
              <span className="text-xs font-medium">{formatCurrency(380000)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "7.1%" }}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs">Seguros</span>
              <span className="text-xs font-medium">{formatCurrency(350000)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: "6.5%" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RF 2.4: Gráfica de línea temporal con los costes operativos de los últimos 6 meses */}
        <div className="p-5 border rounded-lg bg-card">
          <h2 className="text-lg font-semibold mb-4">Costos operativos últimos 6 meses</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyOperativeCostsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value / 1000000}M`} />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Costo"]}
                  labelFormatter={(label) => `Mes: ${label}`}
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
                <Line type="monotone" dataKey="combustible" stroke="#10b981" strokeWidth={1.5} name="Combustible" />
                <Line
                  type="monotone"
                  dataKey="mantenimiento"
                  stroke="#8b5cf6"
                  strokeDasharray="5 5"
                  name="Mantenimiento"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RF 2.5: Distribución de costos operativos en un gráfico circular */}
        <div className="p-5 border rounded-lg bg-card">
          <h2 className="text-lg font-semibold mb-4">Distribución de costos operativos</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                  {costDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatCurrency(value), "Costo"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RF 2.3: Vehículos con mayores costos operativos */}
      <div className="p-5 border rounded-lg bg-card">
        <h2 className="text-lg font-semibold mb-4">Vehículos con sobrecosto operativo</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left py-3 px-4 font-medium">Patente</th>
                <th className="text-right py-3 px-4 font-medium">Costo Estimado</th>
                <th className="text-right py-3 px-4 font-medium">Costo Real</th>
                <th className="text-right py-3 px-4 font-medium">Diferencia</th>
                <th className="text-right py-3 px-4 font-medium">% Sobrecosto</th>
                <th className="text-left py-3 px-4 font-medium">Operario Responsable</th>
                <th className="text-center py-3 px-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehiclesWithOvercost.map((vehicle) => (
                <tr key={vehicle.id} className="border-b">
                  <td className="py-3 px-4 font-medium">{vehicle.patent}</td>
                  <td className="py-3 px-4 text-right">{formatCurrency(vehicle.estimatedCost)}</td>
                  <td className="py-3 px-4 text-right">{formatCurrency(vehicle.actualCost)}</td>
                  <td className="py-3 px-4 text-right text-red-600">+{formatCurrency(vehicle.difference)}</td>
                  <td className="py-3 px-4 text-right text-red-600">
                    +{((vehicle.difference / vehicle.estimatedCost) * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 px-4">{vehicle.operator}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-xs text-blue-600 hover:underline">Ver Detalle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparativa de costos por categoría */}
      <div className="p-5 border rounded-lg bg-card">
        <h2 className="text-lg font-semibold mb-4">Comparativa de costos por categoría vs. mes anterior</h2>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: "Combustible", actual: 2800000, anterior: 2600000 },
                { name: "Mantenimiento", actual: 1200000, anterior: 950000 },
                { name: "Repuestos", actual: 620000, anterior: 580000 },
                { name: "Mano de Obra", actual: 380000, anterior: 350000 },
                { name: "Seguros", actual: 350000, anterior: 350000 },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value / 1000}K`} />
              <Tooltip formatter={(value) => [formatCurrency(value), "Costo"]} />
              <Legend />
              <Bar dataKey="actual" name={`Mes actual (${selectedPeriod})`} fill="#3b82f6" />
              <Bar dataKey="anterior" name="Mes anterior" fill="#9ca3af" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Nota informativa */}
      <div className="flex items-start gap-4 p-4 border rounded-lg bg-amber-50">
        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
        <div>
          <p className="font-medium text-amber-800">Nota sobre los costos operativos</p>
          <p className="text-sm text-amber-700 mt-1">
            Los costos operativos incluyen todos los gastos relacionados con la operación de los vehículos: combustible,
            mantenimiento preventivo y correctivo, repuestos, mano de obra, seguros e impuestos. El objetivo es mantener
            estos costos dentro del presupuesto estimado para cada vehículo.
          </p>
        </div>
      </div>
    </div>
  )
}

