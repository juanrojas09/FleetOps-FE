"use client"

import { useState } from "react"
import { Badge } from "../../../common/ui/badge"
import { Button } from "../../../common/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/ui/card"
import { Mail, Phone, Plus, SwatchBook, Trash2, ToggleLeft, ToggleRight } from "lucide-react"
import { Input } from "../../../common/ui/input"
import { Label } from "../../../common/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../common/ui/table"


// Tipo de servicio preventivo
interface PreventiveService {
  id: number
  name: string
  kilometers: number
  alertKilometers: number
}

// Historial de notificaciones
interface NotificationHistory {
  id: number
  date: string
  recipient: string
  content: string
  type: "email" | "sms"
}

export function RecurringInterventionsTab() {
  // Estado para el switch general de activación
  const [isEnabled, setIsEnabled] = useState(true)

  // Estado para los canales de notificación
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(true)

  // Estado para los servicios preventivos
  const [services, setServices] = useState<PreventiveService[]>([
    { id: 1, name: "Cambio de aceite", kilometers: 7500, alertKilometers: 500 },
    { id: 2, name: "Cambio de filtros", kilometers: 15000, alertKilometers: 1000 },
    { id: 3, name: "Revisión de frenos", kilometers: 20000, alertKilometers: 1500 },
    { id: 4, name: "Alineación y balanceo", kilometers: 10000, alertKilometers: 800 },
  ])

  // Estado para el historial de notificaciones
  const [notificationHistory] = useState<NotificationHistory[]>([
    {
      id: 1,
      date: "20/03/2025 09:15",
      recipient: "taller@empresa.com",
      content: "Próximo cambio de aceite para CITROEN AC875CG en 450km",
      type: "email",
    },
    {
      id: 2,
      date: "19/03/2025 14:30",
      recipient: "juan.perez@empresa.com",
      content: "Revisión de frenos para KANGOO EJP249 en 1200km",
      type: "email",
    },
    {
      id: 3,
      date: "18/03/2025 10:45",
      recipient: "+549115678901",
      content: "Alineación y balanceo para MERCEDES AF954RK en 750km",
      type: "sms",
    },
  ])

  // Función para actualizar un servicio
  const updateService = (id: number, field: keyof PreventiveService, value: string | number) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? { ...service, [field]: typeof value === "string" ? Number.parseInt(value) || 0 : value }
          : service,
      ),
    )
  }

  // Función para agregar un nuevo servicio
  const addService = () => {
    const newId = Math.max(0, ...services.map((s) => s.id)) + 1
    setServices([...services, { id: newId, name: "", kilometers: 0, alertKilometers: 0 }])
  }

  // Función para eliminar un servicio
  const removeService = (id: number) => {
    setServices(services.filter((service) => service.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl">Intervenciones Recurrentes por Kilometraje</CardTitle>
        <div className="flex items-center gap-2">
          <Label htmlFor="notifications-enabled" className="font-medium">
            Activar notificaciones
          </Label>
          <ToggleLeft
            id="notifications-enabled"
            className={`cursor-pointer ${isEnabled ? "text-green-500" : "text-gray-500"}`}
            onClick={() => setIsEnabled(!isEnabled)}
          />
        </div>
      </div>

      <CardDescription>
        Configure los tipos de servicio preventivo y el kilometraje para recibir alertas automáticas
      </CardDescription>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tipos de servicio preventivo</CardTitle>
          <CardDescription>
            Defina los umbrales de kilometraje para cada tipo de servicio y la anticipación para las alertas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="w-[40%]">Tipo de servicio</TableHead>
                  <TableHead className="w-[25%]">Kilometraje</TableHead>
                  <TableHead className="w-[25%]">Alerta (km antes)</TableHead>
                  <TableHead className="w-[10%]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <Input
                        value={service.name}
                        onChange={(e) => updateService(service.id, "name", e.target.value)}
                        placeholder="Nombre del servicio"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={service.kilometers}
                          onChange={(e) => updateService(service.id, "kilometers", e.target.value)}
                          placeholder="0"
                        />
                        <span className="text-sm text-gray-500">km</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={service.alertKilometers}
                          onChange={(e) => updateService(service.id, "alertKilometers", e.target.value)}
                          placeholder="0"
                        />
                        <span className="text-sm text-gray-500">km</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => removeService(service.id)}>
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Button variant="outline" className="mt-4 gap-2" onClick={addService}>
            <Plus className="h-4 w-4" />
            Agregar otro tipo de servicio
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Canales de notificación</CardTitle>
          <CardDescription>Seleccione los canales activos para enviar alertas de kilometraje</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <Label htmlFor="email-notifications" className="cursor-pointer">
                Correo electrónico
              </Label>
            </div>
            <ToggleLeft
              id="email-notifications"
              className={`cursor-pointer ${emailEnabled ? "text-green-500" : "text-gray-500"}`}
              onClick={() => setEmailEnabled(!emailEnabled)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-gray-500" />
              <Label htmlFor="sms-notifications" className="cursor-pointer">
                SMS
              </Label>
            </div>
            <ToggleLeft
              id="sms-notifications"
              className={`cursor-pointer ${smsEnabled ? "text-green-500" : "text-gray-500"}`}
              onClick={() => setSmsEnabled(!smsEnabled)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Historial de notificaciones recientes</CardTitle>
          <CardDescription>Últimas alertas de kilometraje enviadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationHistory.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-md">
                <div className={`mt-1 ${notification.type === "email" ? "text-blue-500" : "text-green-500"}`}>
                  {notification.type === "email" ? <Mail className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{notification.recipient}</p>
                    <Badge variant="outline" className="text-xs">
                      {notification.date}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-gray-900">Guardar configuración</Button>
      </div>
    </div>
  )
}
