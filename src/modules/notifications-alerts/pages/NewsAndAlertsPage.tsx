
import { useState } from "react"
import { Badge } from "../../../common/ui/badge"
import { Button } from "../../../common/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../common/ui/tabs"
import { Card, CardContent } from "../../../common/ui/card"
import { AlertCircle, Filter, MoreHorizontal, Plus, Search, Upload } from "lucide-react"
import { Input } from "../../../common/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../common/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../common/ui/dialog"
import { Label } from "../../../common/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../common/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../common/ui/table"
import { InterventionsNewsPage } from "./InterventionsNewsPage"
import { AlertsConfigPage } from "./AlertsConfigPage"


// Sample data based on the provided image
const vehicles = [
  {
    id: 1,
    fleet: "CITROEN",
    project: "TEMAL",
    plate: "AC875CG",
    itvRto: "24/09/2025",
    itvVto: "24/11/2025",
    status: "AL DIA",
    fireExt: "01/2026",
    homologation: "-",
  },
  {
    id: 2,
    fleet: "KANGOO",
    project: "EV",
    plate: "EJP249",
    itvRto: "24/09/2025",
    itvVto: "24/11/2025",
    status: "VENCIDO",
    fireExt: "01/2026",
    homologation: "-",
  },
  {
    id: 3,
    fleet: "MERCEDES CAMION",
    project: "BCA",
    plate: "AF954RK",
    itvRto: "13/12/2024",
    itvVto: "13/02/2025",
    status: "VENCIDO",
    fireExt: "01/2026",
    homologation: "-",
  },
  {
    id: 4,
    fleet: "HILUX AD814AF",
    project: "TEMAL",
    plate: "AD814AF",
    itvRto: "17/05/2024",
    itvVto: "17/07/2024",
    status: "VENCIDO",
    fireExt: "",
    homologation: "-",
  },
]

export function NewsAndAlertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("documentation")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VENCIDO":
        return <Badge variant="destructive">Vencido</Badge>
      case "AL DIA":
        return (
          <Badge variant="default" className="bg-green-500">
            Al día
          </Badge>
        )
      case "SIN DATO":
        return <Badge variant="outline">Sin dato</Badge>
      default:
        return <Badge variant="outline">Sin dato</Badge>
    }
  }

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.fleet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.project.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Novedades y Alertas</h1>
          <p className="text-gray-500 text-sm">
            Gestionar los registros de itv y documentación, novedades e intervenciones y config de propiedades de envíos
            de notificaciones
          </p>
        </div>
        <div className="flex items-center gap-2">
      
          <Button variant="outline" size="icon" className="h-8 w-8">
            <span className="sr-only">Actualizar</span>
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
              className="h-4 w-4"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
              <path d="M8 16H3v5"></path>
            </svg>
          </Button>
          <div className="bg-gray-100 text-xs px-3 py-1 rounded-md">Fecha: 20 Mar 2025</div>
        </div>
      </div>

      <Tabs defaultValue="documentation" className="w-full">
        <TabsList className="w-full bg-gray-100 p-0 h-auto">
          <div className="flex w-full">
            <TabsTrigger
              value="documentation"
              className="flex-1 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none py-2"
            >
              ITV y Control de Documentación
            </TabsTrigger>
            <TabsTrigger
              value="interventions"
              className="flex-1 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none py-2"
            >
              Novedades / Intervenciones
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="flex-1 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none py-2"
            >
              Configuración de Alertas
            </TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value="documentation" className="mt-4">
          <Card>
            <CardContent className="p-8 mt-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Buscar por flota, patente..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e:any) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Todos</DropdownMenuItem>
                      <DropdownMenuItem>Vencidos</DropdownMenuItem>
                      <DropdownMenuItem>Al día</DropdownMenuItem>
                      <DropdownMenuItem>Sin datos</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                        <DialogTitle>Agregar Nuevo Vehículo</DialogTitle>
                        <DialogDescription>Complete los datos del vehículo y su documentación ITV</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="fleet">Flota</Label>
                            <Input id="fleet" placeholder="Nombre del vehículo" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="project">Obra</Label>
                            <Select>
                              <SelectTrigger id="project">
                                <SelectValue placeholder="Seleccionar obra" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bca">BCA</SelectItem>
                                <SelectItem value="temal">TEMAL</SelectItem>
                                <SelectItem value="ev">EV</SelectItem>
                                <SelectItem value="ev-privados">EV PRIVADOS</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="plate">Patente</Label>
                            <Input id="plate" placeholder="Patente del vehículo" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="itv-date">Fecha ITV</Label>
                            <Input id="itv-date" type="date" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="itv-vto">Vencimiento ITV</Label>
                            <Input id="itv-vto" type="date" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="status">Estado</Label>
                            <Select>
                              <SelectTrigger id="status">
                                <SelectValue placeholder="Seleccionar estado" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="al-dia">Al día</SelectItem>
                                <SelectItem value="vencido">Vencido</SelectItem>
                                <SelectItem value="sin-dato">Sin dato</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="fire-ext">Venc. Matafuegos</Label>
                            <Input id="fire-ext" type="date" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="homologation">Homologación</Label>
                            <Input id="homologation" placeholder="Número de homologación" />
                          </div>
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

              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-gray-900">
                    <TableRow>
                      <TableHead className="text-white">Flota</TableHead>
                      <TableHead className="text-white">Obra / Servicio</TableHead>
                      <TableHead className="text-white">Patente</TableHead>
                      <TableHead className="text-white">ITV-RTO</TableHead>
                      <TableHead className="text-white">ITV-VTO</TableHead>
                      <TableHead className="text-white">Estado</TableHead>
                      <TableHead className="text-white">Matafuegos</TableHead>
                      <TableHead className="text-white">Homologación</TableHead>
                      <TableHead className="text-white w-[80px]">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.map((vehicle) => (
                      <TableRow
                        key={vehicle.id}
                        className={
                          vehicle.status === "VENCIDO" ? "bg-red-50" : vehicle.status === "AL DIA" ? "bg-green-50" : ""
                        }
                      >
                        <TableCell  className="text-gray-900">{vehicle.fleet}</TableCell>
                        <TableCell  className="text-gray-900">{vehicle.project}</TableCell>
                        <TableCell  className="text-gray-900">{vehicle.plate}</TableCell>
                        <TableCell  className="text-gray-900">{vehicle.itvRto}</TableCell>
                        <TableCell  className="text-gray-900">{vehicle.itvVto}</TableCell>
                        <TableCell  className="text-gray-900">{getStatusBadge(vehicle.status)}</TableCell>
                        <TableCell  className="text-gray-900">{vehicle.fireExt}</TableCell>
                        <TableCell  className="text-gray-900">{vehicle.homologation}</TableCell>
                        <TableCell  className="text-gray-900">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Ver historial</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4 mt-4">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <p className="text-sm text-gray-600">
              Los vehículos con ITV vencida se muestran en rojo. Actualice la documentación para evitar sanciones.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="interventions" className="mt-4">
          <InterventionsNewsPage />
        </TabsContent>

        <TabsContent value="alerts" className="mt-4">
                    <AlertsConfigPage />
        </TabsContent>
      </Tabs>
    </div>
  )
}
