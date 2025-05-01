"use client"


import { Card, CardContent, CardHeader, CardTitle } from "../../common/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../common/ui/tabs"

interface CostChartsProps {
  selectedVehicles: string[]
}

export function CostCharts({ selectedVehicles }: CostChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Distribución de Costos por Vehículo</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="aspect-square relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* MERCEDES */}
                  <circle cx="100" cy="100" r="60" fill="transparent" stroke="#e2e8f0" strokeWidth="30" />
                  <circle
                    cx="100"
                    cy="100"
                    r="60"
                    fill="transparent"
                    stroke="#4f46e5"
                    strokeWidth="30"
                    strokeDasharray="377"
                    strokeDashoffset="94"
                    transform="rotate(-90 100 100)"
                  />
                  {/* FORD */}
                  <circle
                    cx="100"
                    cy="100"
                    r="60"
                    fill="transparent"
                    stroke="#eab308"
                    strokeWidth="30"
                    strokeDasharray="377"
                    strokeDashoffset="245"
                    transform="rotate(-90 100 100)"
                  />
                  {/* IVECO */}
                  <circle
                    cx="100"
                    cy="100"
                    r="60"
                    fill="transparent"
                    stroke="#0ea5e9"
                    strokeWidth="30"
                    strokeDasharray="377"
                    strokeDashoffset="320"
                    transform="rotate(-90 100 100)"
                  
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">$11.1M</span>
                  <span className="text-sm text-gray-500">Total</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-indigo-600"></div>
              <div>
                <p className="text-sm font-medium">MERCEDES</p>
                <p className="text-xs text-gray-500">$4.4M (40%)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <div>
                <p className="text-sm font-medium">FORD</p>
                <p className="text-xs text-gray-500">$3.9M (35%)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-sky-500"></div>
              <div>
                <p className="text-sm font-medium">IVECO</p>
                <p className="text-xs text-gray-500">$2.8M (25%)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Desglose de Costos por Categoría</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="mercedes">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="mercedes" disabled={!selectedVehicles.includes("MERCEDES")}>
                MERCEDES
              </TabsTrigger>
              <TabsTrigger value="ford" disabled={!selectedVehicles.includes("FORD")}>
                FORD
              </TabsTrigger>
              <TabsTrigger value="iveco" disabled={!selectedVehicles.includes("IVECO")}>
                IVECO
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mercedes">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Chofer</span>
                    <span className="text-sm">$1.380.000,00 (31%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "31%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Combustible</span>
                    <span className="text-sm">$1.995.073,00 (45%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Mantenimiento</span>
                    <span className="text-sm">$575.000,00 (13%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "13%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Seguros</span>
                    <span className="text-sm">$356.400,00 (8%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "8%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Impuestos</span>
                    <span className="text-sm">$109.898,00 (3%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "3%" }}></div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ford">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Chofer</span>
                    <span className="text-sm">$1.380.000,00 (35%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Combustible</span>
                    <span className="text-sm">$1.664.600,00 (42%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Mantenimiento</span>
                    <span className="text-sm">$620.000,00 (16%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "16%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Seguros</span>
                    <span className="text-sm">$219.600,00 (6%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "6%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Impuestos</span>
                    <span className="text-sm">$59.300,00 (1%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "1%" }}></div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="iveco">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Chofer</span>
                    <span className="text-sm">$1.380.000,00 (50%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Combustible</span>
                    <span className="text-sm">$450.000,00 (16%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: "16%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Mantenimiento</span>
                    <span className="text-sm">$250.000,00 (9%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: "9%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Seguros</span>
                    <span className="text-sm">$479.040,00 (17%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: "17%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Impuestos</span>
                    <span className="text-sm">$191.900,00 (8%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: "8%" }}></div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Comparativa de Costos por Km y por Viaje</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[300px] relative">
            <svg className="w-full h-full">
              {/* X and Y axis */}
              <line x1="50" y1="250" x2="650" y2="250" stroke="#e2e8f0" strokeWidth="2" />
              <line x1="50" y1="50" x2="50" y2="250" stroke="#e2e8f0" strokeWidth="2" />

              {/* Cost per KM bars */}
              <g transform="translate(150, 0)">
                <rect x="-30" y="125" width="20" height="125" fill="#4f46e5" />
                <rect x="0" y="120" width="20" height="130" fill="#eab308" />
                <rect x="30" y="50" width="20" height="200" fill="#0ea5e9" />
                <text x="0" y="270" textAnchor="middle" fontSize="12">
                  Costo por KM
                </text>
              </g>

              {/* Cost per Trip bars */}
              <g transform="translate(350, 0)">
                <rect x="-30" y="150" width="20" height="100" fill="#4f46e5" />
                <rect x="0" y="160" width="20" height="90" fill="#eab308" />
                <rect x="30" y="50" width="20" height="200" fill="#0ea5e9" />
                <text x="0" y="270" textAnchor="middle" fontSize="12">
                  Costo por Viaje
                </text>
              </g>

              {/* KM traveled bars */}
              <g transform="translate(550, 0)">
                <rect x="-30" y="150" width="20" height="100" fill="#4f46e5" />
                <rect x="0" y="160" width="20" height="90" fill="#eab308" />
                <rect x="30" y="220" width="20" height="30" fill="#0ea5e9" />
                <text x="0" y="270" textAnchor="middle" fontSize="12">
                  Km Recorridos
                </text>
              </g>

              {/* Y axis labels */}
              <text x="40" y="50" textAnchor="end" fontSize="10">
                $3.000
              </text>
              <text x="40" y="100" textAnchor="end" fontSize="10">
                $2.250
              </text>
              <text x="40" y="150" textAnchor="end" fontSize="10">
                $1.500
              </text>
              <text x="40" y="200" textAnchor="end" fontSize="10">
                $750
              </text>
              <text x="40" y="250" textAnchor="end" fontSize="10">
                $0
              </text>
            </svg>
          </div>

          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-indigo-600"></div>
              <span className="text-sm">MERCEDES</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm">FORD</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-sky-500"></div>
              <span className="text-sm">IVECO</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
