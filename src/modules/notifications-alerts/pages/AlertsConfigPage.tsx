"use client"

import { useState } from "react"
import { Badge } from "../../../common/ui/badge"
import { Button } from "../../../common/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../common/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/ui/card"
import { AlertCircle, Check, Filter, Mail, MoreHorizontal, Phone, Plus, Search, SwatchBook, Upload, X } from "lucide-react"
import { Input } from "../../../common/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../common/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../common/ui/dialog"
import { Label } from "../../../common/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../common/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../common/ui/table"
import { InterventionsNewsPage } from "./InterventionsNewsPage"
import { RecurringInterventionsTab } from "../components/RecurringInterventionsTab"



export function AlertsConfigPage() {
  const [activeTab, setActiveTab] = useState("itv")
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(true)

  // Sample notification history data
  const notificationHistory = [
    {
      id: 1,
      type: "ITV Vencimiento",
      recipient: "juan.perez@empresa.com",
      status: "ENVIADO",
      date: "20/03/2025 09:15",
      channel: "Email",
    },
    {
      id: 2,
      type: "Mantenimiento Programado",
      recipient: "taller@empresa.com",
      status: "ENVIADO",
      date: "19/03/2025 14:30",
      channel: "Email",
    },
    {
      id: 3,
      type: "Vencimiento Matafuegos",
      recipient: "+549115678901",
      status: "ENVIADO",
      date: "18/03/2025 10:45",
      channel: "SMS",
    },
    {
      id: 4,
      type: "ITV Segunda Alerta",
      recipient: "carlos.gomez@empresa.com",
      status: "FALLIDO",
      date: "17/03/2025 08:20",
      channel: "Email",
    },
    {
      id: 5,
      type: "Documentación Operario",
      recipient: "rrhh@empresa.com",
      status: "ENVIADO",
      date: "16/03/2025 16:10",
      channel: "Email",
    },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="itv" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 h-9">
          <TabsTrigger value="itv" className="text-xs">
            ITV y Documentación
          </TabsTrigger>
          <TabsTrigger value="interventions" className="text-xs">
            Intervenciones Recurrentes
          </TabsTrigger>
          <TabsTrigger value="operators" className="text-xs">
            Documentación Operarios
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {activeTab === "itv" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Alertas</CardTitle>
                  <CardDescription>Defina los días de anticipación para las alertas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-alert">Primera alerta</Label>
                      <div className="flex items-center gap-2">
                        <Input id="first-alert" type="number" placeholder="30" className="w-20" />
                        <span className="text-sm text-gray-500">días antes</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="second-alert">Segunda alerta</Label>
                      <div className="flex items-center gap-2">
                        <Input id="second-alert" type="number" placeholder="15" className="w-20" />
                        <span className="text-sm text-gray-500">días antes</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="final-alert">Alerta final</Label>
                    <div className="flex items-center gap-2">
                      <Input id="final-alert" type="number" placeholder="5" className="w-20" />
                      <span className="text-sm text-gray-500">días antes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Canales de Notificación</CardTitle>
                  <CardDescription>Seleccione los canales activos para enviar alertas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <Label htmlFor="email-notifications" className="cursor-pointer">
                        Correo electrónico
                      </Label>
                    </div>
                    <input
                      id="email-notifications"
                      type="checkbox"
                      checked={emailEnabled}
                      onChange={(e) => setEmailEnabled(e.target.checked)}
                      className="toggle-checkbox"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <Label htmlFor="sms-notifications" className="cursor-pointer">
                        SMS
                      </Label>
                    </div>
                    <input
                      id="sms-notifications"
                      type="checkbox"
                      checked={smsEnabled}
                      onChange={(e) => setSmsEnabled(e.target.checked)}
                      className="toggle-checkbox"
                    />
                  </div>
                  <div className="pt-4">
                    <Label htmlFor="recipients">Destinatarios</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input id="recipients" placeholder="Agregar correo electrónico o número" className="flex-1" />
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge className="flex items-center gap-1 bg-gray-100 text-gray-800 hover:bg-gray-200">
                        juan.perez@empresa.com
                        <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                      <Badge className="flex items-center gap-1 bg-gray-100 text-gray-800 hover:bg-gray-200">
                        taller@empresa.com
                        <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                      <Badge className="flex items-center gap-1 bg-gray-100 text-gray-800 hover:bg-gray-200">
                        +549115678901
                        <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "interventions" && <RecurringInterventionsTab />}

          {activeTab === "operators" && (
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-500">Contenido de Documentación Operarios en desarrollo</p>
            </div>
          )}
        </div>

        {activeTab === "itv" && (
          <>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Historial de Notificaciones</CardTitle>
                <CardDescription>Registro de alertas enviadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo de Alerta</TableHead>
                        <TableHead>Destinatario</TableHead>
                        <TableHead>Canal</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha/Hora</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notificationHistory.map((notification) => (
                        <TableRow key={notification.id}>
                          <TableCell>{notification.type}</TableCell>
                          <TableCell>{notification.recipient}</TableCell>
                          <TableCell>{notification.channel}</TableCell>
                          <TableCell>
                            {notification.status === "ENVIADO" ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                <Check className="h-3 w-3 mr-1" /> Enviado
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                                <X className="h-3 w-3 mr-1" /> Fallido
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{notification.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-6">
              <Button className="bg-gray-900">Guardar configuración</Button>
            </div>
          </>
        )}
      </Tabs>
    </div>
  )
}
