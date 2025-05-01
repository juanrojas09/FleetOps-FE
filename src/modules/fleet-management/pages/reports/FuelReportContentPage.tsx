

import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../common/ui/table"
import { Badge } from "../../../../common/ui/badge"
import { Vehicle } from "../../../../models/Types/VehicleFleetTypes"




interface FuelReportContentProps {
    vehicle: Vehicle
    periodType: string
    month: number
    year: number
  }
  
  export function FuelReportContentPage({ vehicle, periodType, month, year }: FuelReportContentProps) {
    // Datos simulados para el reporte
    const fuelData = [
      {
        id: 1,
        station: "YPF",
        date: "04/03/2025",
        plate: vehicle.plate,
        liters: 87.45,
        odometer: 39283,
        timeSinceLastCharge: "10 días",
        totalAmount: 114600,
        pricePerLiter: 1312,
        kmL: 8.7,
        kmLPercentage: "+3.4%",
      },
    ]
  
    // Datos para el gráfico de consumo mensual
    const monthlyConsumptionData = [
      { month: "Ene", liters: 350, cost: 350000 },
      { month: "Feb", liters: 320, cost: 320000 },
      { month: "Mar", liters: 442, cost: 442000 },
      { month: "Abr", liters: 380, cost: 380000 },
      { month: "May", liters: 410, cost: 410000 },
      { month: "Jun", liters: 395, cost: 395000 },
      { month: "Jul", liters: 420, cost: 420000 },
      { month: "Ago", liters: 400, cost: 400000 },
      { month: "Sep", liters: 430, cost: 430000 },
      { month: "Oct", liters: 450, cost: 450000 },
      { month: "Nov", liters: 440, cost: 440000 },
      { month: "Dic", liters: 460, cost: 460000 },
    ]
  
    // Datos para el gráfico de litros vs costo por carga
    const litersVsCostData = [
      { id: 1, liters: 85, cost: 111520 },
      { id: 2, liters: 75, cost: 98400 },
      { id: 3, liters: 82, cost: 107584 },
      { id: 4, liters: 70, cost: 91840 },
    ]
  
    // Datos para el gráfico de comparativa de costos
    const costComparisonData = [
      { name: "YPF", costPerKm: 220, pricePerLiter: 1312, efficiency: 5.8 },
      { name: "Shell", costPerKm: 240, pricePerLiter: 1350, efficiency: 5.6 },
      { name: "Axion", costPerKm: 230, pricePerLiter: 1330, efficiency: 5.7 },
      { name: "Puma", costPerKm: 210, pricePerLiter: 1300, efficiency: 6.0 },
    ]
  
    // Datos para el gráfico de evolución de KM/L
    const efficiencyEvolutionData = [
      { date: "2023-01-15", efficiency: 6.2 },
      { date: "2023-02-15", efficiency: 6.0 },
      { date: "2023-03-15", efficiency: 5.8 },
    ]
  
    // Función para formatear moneda
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .format(value)
        .replace("ARS", "$")
    }
  
    return (
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Costo Total Acumulado */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-slate-800 text-white text-xs font-medium p-2 flex justify-between items-center">
                <span>Costo Total Acumulado</span>
                <span>Mes</span>
              </div>
              <div className="p-4">
                <p className="text-2xl font-bold">1.200.000$</p>
                <div className="flex items-center mt-2">
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">+12%</div>
                  <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
                </div>
              </div>
            </CardContent>
          </Card>
  
          {/* Litros Cargados */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-slate-800 text-white text-xs font-medium p-2 flex justify-between items-center">
                <span>Litros Cargados</span>
                <span>Mes</span>
              </div>
              <div className="p-4">
                <p className="text-2xl font-bold">800 Litros</p>
                <div className="flex items-center mt-2">
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">+20%</div>
                  <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
                </div>
              </div>
            </CardContent>
          </Card>
  
          {/* Promedio de KM/L */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-slate-800 text-white text-xs font-medium p-2 flex justify-between items-center">
                <span>Promedio de KM/L</span>
                <span>Mes</span>
              </div>
              <div className="p-4">
                <p className="text-2xl font-bold">5.8 KM / Litro</p>
                <div className="flex items-center mt-2">
                  <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">-7%</div>
                  <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
                </div>
              </div>
            </CardContent>
          </Card>
  
          {/* Costo promedio por Litro */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-slate-800 text-white text-xs font-medium p-2 flex justify-between items-center">
                <span>Costo promedio por Litro</span>
                <span>Mes</span>
              </div>
              <div className="p-4">
                <p className="text-2xl font-bold">1312$</p>
                <div className="flex items-center mt-2">
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">+5%</div>
                  <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
  
        {/* Charts - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Consumo de Combustible por Mes */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-slate-800 text-white text-xs font-medium p-2 flex justify-between items-center">
                <span>Consumo de Combustible por Mes</span>
                <span>Mes</span>
              </div>
              <div className="p-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#1e40af" />
                    <YAxis yAxisId="right" orientation="right" stroke="#0ea5e9" />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "liters") return [`${value} L`, "Litros"]
                        if (name === "cost") return [formatCurrency(value as number), "Costo"]
                        return [value, name]
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="liters" name="Litros" fill="#1e40af" />
                    <Bar yAxisId="right" dataKey="cost" name="Costo" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
  
          {/* Litros Cargados vs Costo Total por Carga */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-slate-800 text-white text-xs font-medium p-2 flex justify-between items-center">
                <span>Litros Cargados vs Costo Total por Carga</span>
                <span>Mes</span>
              </div>
              <div className="p-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={litersVsCostData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" />
                    <YAxis yAxisId="left" orientation="left" stroke="#0ea5e9" />
                    <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "liters") return [`${value} L`, "Litros"]
                        if (name === "cost") return [formatCurrency(value as number), "Costo"]
                        return [value, name]
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="liters" name="Litros" fill="#0ea5e9" />
                    <Line yAxisId="right" type="monotone" dataKey="cost" name="Costo" stroke="#ef4444" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
  
        {/* Charts - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Comparativa Costo por KM, Precio por Litro y KM Recorridos */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-slate-800 text-white text-xs font-medium p-2 flex justify-between items-center">
                <span>Comparativa Costo por KM, Precio por Litro y KM Recorridos</span>
                <span>Mes</span>
              </div>
              <div className="p-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={costComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "costPerKm") return [`${value} $/km`, "Costo por KM"]
                        if (name === "pricePerLiter") return [`${value} $`, "Precio por Litro"]
                        if (name === "efficiency") return [`${value} km/L`, "Eficiencia"]
                        return [value, name]
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="costPerKm" name="Costo por KM" fill="#94a3b8" />
                    <Bar yAxisId="left" dataKey="pricePerLiter" name="Precio por Litro" fill="#64748b" />
                    <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Eficiencia" stroke="#0ea5e9" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
  
          {/* Evolución de KM/L */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-slate-800 text-white text-xs font-medium p-2 flex justify-between items-center">
                <span>Evolución de KM/L</span>
                <span>Mes</span>
              </div>
              <div className="p-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={efficiencyEvolutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[5, 7]} />
                    <Tooltip formatter={(value) => [`${value} km/L`, "Rendimiento"]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      name="KM/L"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
  
        {/* Table */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="rounded-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="text-xs">Id</TableHead>
                    <TableHead className="text-xs">Estación</TableHead>
                    <TableHead className="text-xs">Fecha</TableHead>
                    <TableHead className="text-xs">Patente</TableHead>
                    <TableHead className="text-xs">Litros de carga</TableHead>
                    <TableHead className="text-xs">KM del vehículo al momento de carga</TableHead>
                    <TableHead className="text-xs">Tiempo desde última carga</TableHead>
                    <TableHead className="text-xs">Importe total</TableHead>
                    <TableHead className="text-xs">Precio por litro</TableHead>
                    <TableHead className="text-xs">Tiempo desde última carga</TableHead>
                    <TableHead className="text-xs">KM/L</TableHead>
                    <TableHead className="text-xs">% KM/L</TableHead>
                    <TableHead className="text-xs">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fuelData.map((charge) => (
                    <TableRow key={charge.id}>
                      <TableCell>{charge.id}</TableCell>
                      <TableCell>{charge.station}</TableCell>
                      <TableCell>{charge.date}</TableCell>
                      <TableCell>{charge.plate}</TableCell>
                      <TableCell>{charge.liters}</TableCell>
                      <TableCell>{charge.odometer}</TableCell>
                      <TableCell>{charge.timeSinceLastCharge}</TableCell>
                      <TableCell>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {formatCurrency(charge.totalAmount)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                          {formatCurrency(charge.pricePerLiter)}
                        </span>
                      </TableCell>
                      <TableCell>{charge.timeSinceLastCharge}</TableCell>
                      <TableCell>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{charge.kmL}</span>
                      </TableCell>
                      <TableCell>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {charge.kmLPercentage}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <button className="text-blue-600 hover:text-blue-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  