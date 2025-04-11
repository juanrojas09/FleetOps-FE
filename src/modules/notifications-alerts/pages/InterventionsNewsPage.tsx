"use client"

import { useState } from "react"
import { Badge } from "../../../common/ui/badge"
import { Button } from "../../../common/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../common/ui/tabs"
import { Card, CardContent } from "../../../common/ui/card"
import { AlertCircle, CheckCircle, Clock, Filter, MoreHorizontal, Plus, Search, Upload } from "lucide-react"
import { Input } from "../../../common/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../common/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../common/ui/dialog"
import { Label } from "../../../common/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../common/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../common/ui/table"


// Sample data for interventions
const interventions = [
  {
    id: 1,
    vehicle: "CITROEN",
    plate: "AC875CG",
    type: "Cambio de aceite",
    date: "24/09/2025",
    currentKm: "45000 km",
    nextService: "49000 km",
    status: "AL DIA",
  },
  {
    id: 2,
    vehicle: "KANGOO",
    plate: "EJP249",
    type: "Service",
    date: "24/09/2025",
    currentKm: "45000 km",
    nextService: "15000 KM",
    status: "EN PROCESO",
  },
  {
    id: 3,
    vehicle: "MERCEDES CAMION",
    plate: "AF954RK",
    type: "Cambio de filtros",
    date: "13/12/2024",
    currentKm: "78000 km",
    nextService: "85000 km",
    status: "PENDIENTE",
  },
  {
    id: 4,
    vehicle: "HILUX",
    plate: "AD814AF",
    type: "Revisión general",
    date: "17/05/2024",
    currentKm: "32000 km",
    nextService: "37000 km",
    status: "FINALIZADA",
  },
  {
    id: 5,
    vehicle: "CITROEN",
    plate: "AC875CG",
    type: "Cambio de frenos",
    date: "15/08/2024",
    currentKm: "42000 km",
    nextService: "60000 km",
    status: "FINALIZADA",
  },
  {
    id: 6,
    vehicle: "KANGOO",
    plate: "EJP249",
    type: "Cambio de batería",
    date: "10/07/2024",
    currentKm: "40000 km",
    nextService: "80000 km",
    status: "PENDIENTE",
  },
  {
    id: 7,
    vehicle: "MERCEDES CAMION",
    plate: "AF954RK",
    type: "Alineación",
    date: "05/06/2024",
    currentKm: "70000 km",
    nextService: "90000 km",
    status: "EN PROCESO",
  },
  {
    id: 8,
    vehicle: "HILUX",
    plate: "AD814AF",
    type: "Cambio de correa",
    date: "20/04/2024",
    currentKm: "28000 km",
    nextService: "60000 km",
    status: "EN PROCESO",
  },
  {
    id: 9,
    vehicle: "CITROEN",
    plate: "AC875CG",
    type: "Revisión eléctrica",
    date: "10/03/2024",
    currentKm: "38000 km",
    nextService: "50000 km",
    status: "FINALIZADA",
  },
]

export function InterventionsNewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [vehicleFilter, setVehicleFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDIENTE":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">
            Pendiente
          </Badge>
        )
      case "EN PROCESO":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
            En Proceso
          </Badge>
        )
      case "AL DIA":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
            Al día
          </Badge>
        )
      case "FINALIZADA":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
            Finalizada
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const getRowColor = (status: string) => {
    switch (status) {
      case "PENDIENTE":
        return "bg-amber-50"
      case "EN PROCESO":
        return "bg-blue-50"
      case "AL DIA":
      case "FINALIZADA":
        return "bg-green-50"
      default:
        return ""
    }
  }

  // Filter interventions based on search term and active tab
  const filteredInterventions = interventions.filter((intervention) => {
    const matchesSearch =
      intervention.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intervention.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intervention.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && intervention.status === "PENDIENTE") ||
      (activeTab === "inProgress" && intervention.status === "EN PROCESO") ||
      (activeTab === "completed" && intervention.status === "FINALIZADA")

    const matchesVehicleFilter =
      vehicleFilter === "" || intervention.vehicle.toLowerCase().includes(vehicleFilter.toLowerCase())

    const matchesTypeFilter = typeFilter === "" || intervention.type.toLowerCase().includes(typeFilter.toLowerCase())

    const matchesStatusFilter = statusFilter === "" || intervention.status === statusFilter

    return matchesSearch && matchesTab && matchesVehicleFilter && matchesTypeFilter && matchesStatusFilter
  })

  // Count interventions by status
  const pendingCount = interventions.filter((i) => i.status === "PENDIENTE").length
  const inProgressCount = interventions.filter((i) => i.status === "EN PROCESO").length
  const completedCount = interventions.filter((i) => i.status === "FINALIZADA" || i.status === "AL DIA").length

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 h-9">
          <TabsTrigger value="all" className="text-xs">
            Todas las intervenciones
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-xs">
            Pendientes
          </TabsTrigger>
          <TabsTrigger value="inProgress" className="text-xs">
            En Proceso
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-xs">
            Finalizadas
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por flota, patente..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filtro vehículo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="CITROEN">CITROEN</SelectItem>
                <SelectItem value="KANGOO">KANGOO</SelectItem>
                <SelectItem value="MERCEDES">MERCEDES</SelectItem>
                <SelectItem value="HILUX">HILUX</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Tipo de intervención" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="cambio de aceite">Cambio de aceite</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="cambio de filtros">Cambio de filtros</SelectItem>
                <SelectItem value="revisión">Revisión</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Importar
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-gray-900">
                  <Plus className="h-4 w-4" />
                  Nuevo Registro
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Registrar Nueva Intervención</DialogTitle>
                  <DialogDescription>Complete los datos de la intervención para el vehículo</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="vehicle">Vehículo</Label>
                      <Select>
                        <SelectTrigger id="vehicle">
                          <SelectValue placeholder="Seleccionar vehículo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="citroen">CITROEN</SelectItem>
                          <SelectItem value="kangoo">KANGOO</SelectItem>
                          <SelectItem value="mercedes">MERCEDES CAMION</SelectItem>
                          <SelectItem value="hilux">HILUX</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="plate">Patente</Label>
                      <Select>
                        <SelectTrigger id="plate">
                          <SelectValue placeholder="Seleccionar patente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ac875cg">AC875CG</SelectItem>
                          <SelectItem value="ejp249">EJP249</SelectItem>
                          <SelectItem value="af954rk">AF954RK</SelectItem>
                          <SelectItem value="ad814af">AD814AF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">Tipo de intervención</Label>
                      <Select>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aceite">Cambio de aceite</SelectItem>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="filtros">Cambio de filtros</SelectItem>
                          <SelectItem value="revision">Revisión general</SelectItem>
                          <SelectItem value="frenos">Cambio de frenos</SelectItem>
                          <SelectItem value="bateria">Cambio de batería</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date">Fecha</Label>
                      <Input id="date" type="date" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="current-km">KM Actual</Label>
                      <Input id="current-km" type="text" placeholder="Ej: 45000" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="next-service">Próximo servicio (KM)</Label>
                      <Input id="next-service" type="text" placeholder="Ej: 50000" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Estado</Label>
                    <Select>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="en-proceso">En Proceso</SelectItem>
                        <SelectItem value="finalizada">Finalizada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notas adicionales</Label>
                    <Input id="notes" placeholder="Detalles adicionales de la intervención" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Guardar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-900">
                <TableRow>
                  <TableHead className="text-white">Vehículo</TableHead>
                  <TableHead className="text-white">Patente</TableHead>
                  <TableHead className="text-white">Tipo</TableHead>
                  <TableHead className="text-white">Fecha</TableHead>
                  <TableHead className="text-white">KM Actual</TableHead>
                  <TableHead className="text-white">Próximo Servicio</TableHead>
                  <TableHead className="text-white">Estado</TableHead>
                  <TableHead className="text-white w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterventions.map((intervention) => (
                  <TableRow key={intervention.id} className={getRowColor(intervention.status)}>
                    <TableCell className="font-medium text-gray-900">{intervention.vehicle}</TableCell>
                    <TableCell className="text-gray-900">{intervention.plate}</TableCell>
                    <TableCell className="text-gray-900">{intervention.type}</TableCell>
                    <TableCell className="text-gray-900">{intervention.date}</TableCell>
                    <TableCell className="text-gray-900">{intervention.currentKm}</TableCell>
                    <TableCell className="text-gray-900">{intervention.nextService}</TableCell>
                    <TableCell className="text-gray-900">{getStatusBadge(intervention.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Cambiar a Pendiente</DropdownMenuItem>
                          <DropdownMenuItem>Cambiar a En Proceso</DropdownMenuItem>
                          <DropdownMenuItem>Marcar como Finalizada</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-900">
                <TableRow>
                  <TableHead className="text-white">Vehículo</TableHead>
                  <TableHead className="text-white">Patente</TableHead>
                  <TableHead className="text-white">Tipo</TableHead>
                  <TableHead className="text-white">Fecha</TableHead>
                  <TableHead className="text-white">KM Actual</TableHead>
                  <TableHead className="text-white">Próximo Servicio</TableHead>
                  <TableHead className="text-white">Estado</TableHead>
                  <TableHead className="text-white w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterventions.map((intervention) => (
                  <TableRow key={intervention.id} className={getRowColor(intervention.status)}>
                    <TableCell className="font-medium text-gray-900">{intervention.vehicle}</TableCell>
                    <TableCell className="text-gray-900">{intervention.plate}</TableCell>
                    <TableCell className="text-gray-900">{intervention.type}</TableCell>
                    <TableCell className="text-gray-900">{intervention.date}</TableCell>
                    <TableCell className="text-gray-900">{intervention.currentKm}</TableCell>
                    <TableCell className="text-gray-900">{intervention.nextService}</TableCell>
                    <TableCell className="text-gray-900">{getStatusBadge(intervention.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Cambiar a En Proceso</DropdownMenuItem>
                          <DropdownMenuItem>Marcar como Finalizada</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="inProgress" className="mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-900">
                <TableRow>
                  <TableHead className="text-white">Vehículo</TableHead>
                  <TableHead className="text-white">Patente</TableHead>
                  <TableHead className="text-white">Tipo</TableHead>
                  <TableHead className="text-white">Fecha</TableHead>
                  <TableHead className="text-white">KM Actual</TableHead>
                  <TableHead className="text-white">Próximo Servicio</TableHead>
                  <TableHead className="text-white">Estado</TableHead>
                  <TableHead className="text-white w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterventions.map((intervention) => (
                  <TableRow key={intervention.id} className={getRowColor(intervention.status)}>
                    <TableCell className="font-medium text-gray-900">{intervention.vehicle}</TableCell>
                    <TableCell className="text-gray-900">{intervention.plate}</TableCell>
                    <TableCell className="text-gray-900">{intervention.type}</TableCell>
                    <TableCell className="text-gray-900">{intervention.date}</TableCell>
                    <TableCell className="text-gray-900">{intervention.currentKm}</TableCell>
                    <TableCell className="text-gray-900">{intervention.nextService}</TableCell>
                    <TableCell >{getStatusBadge(intervention.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Cambiar a Pendiente</DropdownMenuItem>
                          <DropdownMenuItem>Marcar como Finalizada</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-900">
                <TableRow>
                  <TableHead className="text-white">Vehículo</TableHead>
                  <TableHead className="text-white">Patente</TableHead>
                  <TableHead className="text-white">Tipo</TableHead>
                  <TableHead className="text-white">Fecha</TableHead>
                  <TableHead className="text-white">KM Actual</TableHead>
                  <TableHead className="text-white">Próximo Servicio</TableHead>
                  <TableHead className="text-white">Estado</TableHead>
                  <TableHead className="text-white w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody > 
                {filteredInterventions.map((intervention) => (
                  <TableRow  key={intervention.id} className={getRowColor(intervention.status)}>
                    <TableCell  className="font-medium text-gray-900">{intervention.vehicle}</TableCell>
                    <TableCell className="text-gray-900">{intervention.plate}</TableCell>
                    <TableCell className="text-gray-900">{intervention.type}</TableCell>
                    <TableCell className="text-gray-900">{intervention.date}</TableCell>
                    <TableCell className="text-gray-900">{intervention.currentKm}</TableCell>
                    <TableCell className="text-gray-900">{intervention.nextService}</TableCell>
                    <TableCell className="text-gray-900">{getStatusBadge(intervention.status)}</TableCell>
                    <TableCell className="text-gray-900">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Cambiar a Pendiente</DropdownMenuItem>
                          <DropdownMenuItem>Cambiar a En Proceso</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Intervenciones Pendientes</p>
              <p className="text-3xl font-bold text-amber-900">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">En Proceso</p>
              <p className="text-3xl font-bold text-blue-900">{inProgressCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Finalizadas (Total)</p>
              <p className="text-3xl font-bold text-green-900">{completedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <AlertCircle className="h-5 w-5 text-amber-500" />
        <p className="text-sm text-gray-600">
          Las intervenciones pendientes requieren atención. Actualice el estado a medida que avance el trabajo.
        </p>
      </div>
    </div>
  )
}
