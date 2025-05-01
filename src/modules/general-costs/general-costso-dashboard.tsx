"use client"

import { useState } from "react"
import { Button } from "../../common/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../common/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../common/ui/dropdown-menu"
import { BarChart, Car, Check, ChevronsUpDown, DollarSign, Download, FileSpreadsheet, FileText, Filter, LayoutDashboard, TrendingUp, Truck } from "lucide-react"
import { cn } from "../../lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../../common/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../../common/ui/popover"
import { CostCharts } from "./cost-charts"
import { CostPerKmTable } from "./cost-per-km-table"
import { CostPerTripTable } from "./cost-per-trip-table"
import { GeneralCostsTable } from "./general-costs-table"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../common/ui/tabs"
import { DateRangePicker } from "../../common/ui/date-range-picker"

const VehicleSelector = ({ 
  selectedVehicles, 
  setSelectedVehicles 
}: { 
  selectedVehicles: string[], 
  setSelectedVehicles: (vehicles: string[]) => void 
}) => {
  const vehicles = ["MERCEDES", "FORD", "IVECO", "RENAULT", "SCANIA", "VOLVO"];
  
  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full ">
            {selectedVehicles.length > 0
              ? `${selectedVehicles.length} vehículos seleccionados`
              : "Seleccionar vehículos"}
            <ChevronsUpDown className="ml-2 h-4 w-2 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Buscar vehículo..." />
            <CommandEmpty>No se encontraron vehículos.</CommandEmpty>
            <CommandGroup>
              {vehicles.map((vehicle) => (
                <CommandItem
                  key={vehicle}
                  onSelect={() => {
                    const isSelected = selectedVehicles.includes(vehicle);
                    if (isSelected) {
                      setSelectedVehicles(selectedVehicles.filter(v => v !== vehicle));
                    } else {
                      setSelectedVehicles([...selectedVehicles, vehicle]);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedVehicles.includes(vehicle) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {vehicle}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};



export function GeneralCostsDashboard() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>(["MERCEDES", "FORD", "IVECO", "RENAULT"])

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-300">Costos Generales</h1>
          <p className="text-gray-500">Análisis de Costos Generales Segmentado por marca</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Exportar Excel
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Descargar PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 ">
      <Card className="p-4 ">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Costo Total</p>
              <p className="text-2xl font-bold">$11.110.811,00</p>
            </div>
          </CardContent>
        </Card>
        <Card className="p-4 ">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Car className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Costo Promedio por Km</p>
              <p className="text-2xl font-bold">$1.681,84</p>
            </div>
          </CardContent>
        </Card>
        <Card className="p-4 ">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Truck className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Costo Promedio por Viaje</p>
              <p className="text-2xl font-bold">$109.433,30</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <Card className="w-full md:w-2/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="w-full">
              <DateRangePicker className="w-full" />
            </div>
            <div className="w-full">
              <VehicleSelector
                selectedVehicles={selectedVehicles}
                setSelectedVehicles={setSelectedVehicles}
              />
            </div>
            <div className="w-full">
              <Button className="w-full h-10 flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800">
                <Filter className="h-4 w-4" />
                Aplicar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="gap-2 text-sm">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard gral
            </Button>
            <Button variant="outline" className="gap-2 text-sm">
              <FileText className="h-4 w-4" />
              Gestión de Flotas
            </Button>
            <Button variant="outline" className="gap-2 text-sm">
              <TrendingUp className="h-4 w-4" />
              Dashboard Cargas
            </Button>
            <Button variant="outline" className="gap-2 text-sm">
              <BarChart className="h-4 w-4" />
              Dashboard Distancias
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="mt-6 ">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100">
          <TabsTrigger value="general">Datos Generales</TabsTrigger>
          <TabsTrigger value="km">Costo x Km</TabsTrigger>
          <TabsTrigger value="trip">Costo x Viaje</TabsTrigger>
          <TabsTrigger value="charts">Gráficos</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralCostsTable selectedVehicles={selectedVehicles} />
        </TabsContent>

        <TabsContent value="km">
          <CostPerKmTable selectedVehicles={selectedVehicles} />
        </TabsContent>

        <TabsContent value="trip">
          <CostPerTripTable selectedVehicles={selectedVehicles} />
        </TabsContent>

        <TabsContent value="charts">
          <CostCharts selectedVehicles={selectedVehicles} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

