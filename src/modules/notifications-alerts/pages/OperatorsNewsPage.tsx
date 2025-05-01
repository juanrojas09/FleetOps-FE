import React from 'react'
import { useState } from "react"
import { Badge } from "../../../common/ui/badge"
import { Button } from "../../../common/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../common/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/ui/card"
import { AlertCircle, Check, Filter, Mail, MoreHorizontal, Phone, Plus, Search, Trash2, Upload } from "lucide-react"
import { Input } from "../../../common/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../common/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../common/ui/dialog"
import { Label } from "../../../common/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../common/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../common/ui/table"
import { InterventionsNewsPage } from "./InterventionsNewsPage"
import { AlertsConfigPage } from "./AlertsConfigPage"
import { Switch } from '../../../common/ui/switch'

// Tipo de documento
interface DocumentType {
    id: number
    name: string
    firstAlertDays: number
    secondAlertDays: number
  }
  
  // Historial de notificaciones
  interface NotificationHistory {
    id: number
    date: string
    recipient: string
    documentType: string
    status: "ENVIADO" | "FALLIDO"
    type: "email" | "sms"
  }
export const OperatorsNewsPage = () => {

    // Estado para la recurrencia
  const [isRecurrenceEnabled, setIsRecurrenceEnabled] = useState(true)
  const [recurrenceDays, setRecurrenceDays] = useState(30)

  // Estado para los canales de notificación
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(true)

  // Estado para los tipos de documentos
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([
    { id: 1, name: "Carnet de conducir", firstAlertDays: 60, secondAlertDays: 30 },
    { id: 2, name: "Documento (DNI)", firstAlertDays: 60, secondAlertDays: 30 },
  ])

  // Estado para el historial de notificaciones
  const [notificationHistory] = useState<NotificationHistory[]>([
    {
      id: 1,
      date: "20/03/2025 09:15",
      recipient: "juan.perez@empresa.com",
      documentType: "Renovación de Carnet Próxima",
      status: "ENVIADO",
      type: "email",
    },
    {
      id: 2,
      date: "19/03/2025 14:30",
      recipient: "carlos.gomez@empresa.com",
      documentType: "Documento de Identidad vencido",
      status: "FALLIDO",
      type: "email",
    },
    {
      id: 3,
      date: "18/03/2025 10:45",
      recipient: "+549115678901",
      documentType: "Renovación de Carnet Próxima",
      status: "ENVIADO",
      type: "sms",
    },
  ])

  // Función para actualizar un tipo de documento
  const updateDocumentType = (id: number, field: keyof DocumentType, value: string | number) => {
    setDocumentTypes(
      documentTypes.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              [field]: typeof value === "string" ? (field === "name" ? value : Number.parseInt(value) || 0) : value,
            }
          : doc,
      ),
    )
  }

  // Función para agregar un nuevo tipo de documento
  const addDocumentType = () => {
    const newId = Math.max(0, ...documentTypes.map((d) => d.id)) + 1
    setDocumentTypes([...documentTypes, { id: newId, name: "", firstAlertDays: 60, secondAlertDays: 30 }])
  }

  // Función para eliminar un tipo de documento
  const removeDocumentType = (id: number) => {
    setDocumentTypes(documentTypes.filter((doc) => doc.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl">Alertas de vencimiento de documentación</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="recurrence-days" className="whitespace-nowrap">
              Recurrencia
            </Label>
            <Input
              id="recurrence-days"
              type="number"
              value={recurrenceDays}
              onChange={(e) => setRecurrenceDays(Number(e.target.value))}
              className="w-16"
              disabled={!isRecurrenceEnabled}
            />
            <span className="text-sm text-gray-500">días</span>
          </div>
          <Switch  isChecked={emailEnabled} onChange={setEmailEnabled} />
        </div>
      </div>

      <CardDescription>
        Notificación automática sobre la documentación de operarios antes de su vencimiento
      </CardDescription>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg ">Configuración de alertas por tipo de documento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {documentTypes.map((docType) => (
            <div key={docType.id} className="space-y-4 pb-6 border-b last:border-0">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Input
                      value={docType.name}
                      onChange={(e) => updateDocumentType(docType.id, "name", e.target.value)}
                      placeholder="Nombre del documento"
                      className="font-medium"
                    />
                    {documentTypes.length > 1 && (
                      <Button variant="ghost" size="icon" onClick={() => removeDocumentType(docType.id)}>
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Primera alerta</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={docType.firstAlertDays}
                      onChange={(e) => updateDocumentType(docType.id, "firstAlertDays", e.target.value)}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-500">días antes</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Segunda alerta</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={docType.secondAlertDays}
                      onChange={(e) => updateDocumentType(docType.id, "secondAlertDays", e.target.value)}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-500">días antes</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="gap-2 w-full" onClick={addDocumentType}>
            <Plus className="h-4 w-4" />
            Agregar otro tipo de documentación
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Canales de notificación</CardTitle>
          <CardDescription>Seleccione los canales activos para enviar alertas de documentación</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <Label htmlFor="email-notifications-docs" className="cursor-pointer">
                Correo electrónico
              </Label>
              <span className="text-xs text-gray-500">(Envía alertas por correo electrónico)</span>
            </div>
            <Switch  isChecked={emailEnabled} onChange={setEmailEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-gray-500" />
              <Label htmlFor="sms-notifications-docs" className="cursor-pointer">
                SMS
              </Label>
              <span className="text-xs text-gray-500">(Envía alertas por mensaje de texto)</span>
            </div>
            <Switch  isChecked={smsEnabled} onChange={setSmsEnabled} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Historial de notificaciones</CardTitle>
          <CardDescription>Últimas alertas de documentación enviadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationHistory.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-md">
                <div className={`mt-1 ${notification.status === "ENVIADO" ? "text-green-500" : "text-red-500"}`}>
                  {notification.status === "ENVIADO" ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{notification.recipient}</p>
                    <Badge variant="outline" className="text-xs">
                      {notification.date}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{notification.documentType}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs bg-gray-50">
                      {notification.type === "email" ? (
                        <Mail className="h-3 w-3 mr-1" />
                      ) : (
                        <Phone className="h-3 w-3 mr-1" />
                      )}
                      {notification.type === "email" ? "Email" : "SMS"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        notification.status === "ENVIADO" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                      }`}
                    >
                      {notification.status === "ENVIADO" ? "Enviado" : "Fallido"}
                    </Badge>
                  </div>
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
