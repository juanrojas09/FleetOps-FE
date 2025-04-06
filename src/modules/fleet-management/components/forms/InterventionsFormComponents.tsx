

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, Plus, Trash } from "lucide-react"
import { Intervention } from "../../../../models/Types/VehicleFleetTypes"
import { Button } from "../../../../common/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../common/ui/table"
import { Label } from "../../../../common/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../common/ui/select"
import { Input } from "../../../../common/ui/input"
import { Textarea } from "../../../../common/ui/textarea"
import { Card, CardContent } from "../../../../common/ui/card"
import { Part, PartsForm } from "./SparePartsFormComponent"
interface InterventionsFormProps {
  interventions: Intervention[]
  setInterventions: React.Dispatch<React.SetStateAction<Intervention[]>>
  vehiclePlate?: string
  onPrevious?: () => void
  onNext?: () => void
}

export function InterventionsForm({
  interventions,
  setInterventions,
  vehiclePlate,
  onPrevious,
  onNext,
}: InterventionsFormProps) {
  const [newIntervention, setNewIntervention] = useState({
    id: 0,
    type: "",
    date: "",
    description: "",
    cost: "",
    status: "Pendiente",
    laborCost: "",
    partsCost: "",
    totalCost: "",
    estimatedCompletionDate: "",
    responsibleOperator: "",
  })

  const [showInterventionsList, setShowInterventionsList] = useState(false)
  const [showPartsModal, setShowPartsModal] = useState(false)
  const [manualPartsCost, setManualPartsCost] = useState(false)
  const [parts, setParts] = useState<Part[]>([])

  // Calcular costo total cuando cambian los costos de mano de obra o repuestos
  const calculateTotalCost = (laborCost: string, partsCost: string) => {
    const labor = Number.parseFloat(laborCost) || 0
    const parts = Number.parseFloat(partsCost) || 0
    return (labor + parts).toString()
  }

  const handleLaborCostChange = (value: string) => {
    const totalCost = calculateTotalCost(value, newIntervention.partsCost)
    setNewIntervention({
      ...newIntervention,
      laborCost: value,
      totalCost: totalCost,
      cost: totalCost, // Mantener compatibilidad con el campo cost existente
    })
  }

  const handlePartsCostChange = (value: string) => {
    const totalCost = calculateTotalCost(newIntervention.laborCost, value)
    setNewIntervention({
      ...newIntervention,
      partsCost: value,
      totalCost: totalCost,
      cost: totalCost, // Mantener compatibilidad con el campo cost existente
    })
  }

  // Modificar el botón para agregar intervención para que incluya los repuestos
  const handleAddIntervention = () => {
    if (!newIntervention.type || !newIntervention.estimatedCompletionDate || !newIntervention.description) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }

    setInterventions([
      ...interventions,
      {
        ...newIntervention,
        id: interventions.length + 1,
        date: newIntervention.estimatedCompletionDate, // Mantener compatibilidad con el campo date existente
        parts: parts, // Agregar los repuestos a la intervención
      },
    ])

    // Reset form
    setNewIntervention({
      id: 0,
      type: "",
      date: "",
      description: "",
      cost: "",
      status: "Pendiente",
      laborCost: "",
      partsCost: "",
      totalCost: "",
      estimatedCompletionDate: "",
      responsibleOperator: "",
    })

    // Limpiar los repuestos después de agregar la intervención
    setParts([])
  }

  const handleDeleteIntervention = (id: number) => {
    const updatedInterventions = interventions.filter((intervention) => intervention.id !== id)
    setInterventions(updatedInterventions)
  }

  const interventionTypeOptions = ["Service", "Rotura", "Otro..."]

  const operatorOptions = ["Fernando Perez", "Ignacio Gimenez", "Otro..."]

  const statusOptions = ["Pendiente", "En proceso", "Finalizado"]

  return (
    <>
    {!showPartsModal && <div className="space-y-6">
    

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="interventionType">Tipo de intervención*</Label>
            <Select
              value={newIntervention.type}
              onValueChange={(value) => setNewIntervention({ ...newIntervention, type: value })}
            >
              <SelectTrigger id="interventionType">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {interventionTypeOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Detalles de la intervención"
              value={newIntervention.description}
              onChange={(e) => setNewIntervention({ ...newIntervention, description: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="estimatedCompletionDate">Fecha estimada de finalización</Label>
            <Input
              id="estimatedCompletionDate"
              type="date"
              value={newIntervention.estimatedCompletionDate}
              onChange={(e) => setNewIntervention({ ...newIntervention, estimatedCompletionDate: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="responsibleOperator">Operario Responsable antes de la intervención</Label>
            <Select
              value={newIntervention.responsibleOperator}
              onValueChange={(value) => setNewIntervention({ ...newIntervention, responsibleOperator: value })}
            >
              <SelectTrigger id="responsibleOperator">
                <SelectValue placeholder="Seleccionar operario" />
              </SelectTrigger>
              <SelectContent>
                {operatorOptions.map((operator) => (
                  <SelectItem key={operator} value={operator}>
                    {operator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="laborCost">Costo de MO</Label>
            <Input
              id="laborCost"
              type="number"
              placeholder="Costo de mano de obra"
              value={newIntervention.laborCost}
              onChange={(e) => handleLaborCostChange(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="totalCost">Costo total</Label>
            <Input
              id="totalCost"
              type="number"
              placeholder="0"
              value={newIntervention.totalCost}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div>
            <Label htmlFor="partsCost">Costo Repuestos</Label>
            <div className="flex items-center gap-2">
              <Input
                id="partsCost"
                type="number"
                placeholder="Costo de repuestos"
                value={newIntervention.partsCost}
                onChange={(e) => handlePartsCostChange(e.target.value)}
                readOnly={!manualPartsCost}
                className={manualPartsCost ? "" : "bg-gray-50"}
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="manualPartsCost"
                  checked={manualPartsCost}
                  onChange={(e) => setManualPartsCost(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="manualPartsCost" className="ml-2 text-xs">
                  Manual
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="status">Estado de la intervención</Label>
            <Select
              value={newIntervention.status}
              onValueChange={(value) => setNewIntervention({ ...newIntervention, status: value })}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" className="gap-2" onClick={() => setShowInterventionsList(!showInterventionsList)}>
          <Eye className="h-4 w-4" />
          {showInterventionsList ? "Ocultar Intervenciones" : "Ver Intervenciones cargadas"}
        </Button>

        <Button onClick={() => setShowPartsModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Añadir Detalle de Repuestos
        </Button>
        <Button onClick={() => handleAddIntervention()} className="gap-2">
          <Plus className="h-4 w-4" />
          Añadir Intervencion
        </Button>
      </div>

      {/* Modificar la tabla de intervenciones para mostrar un botón para ver los repuestos */}
      {showInterventionsList && interventions.length > 0 && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Intervenciones registradas</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Costo MO</TableHead>
                    <TableHead>Costo Repuestos</TableHead>
                    <TableHead>Costo Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Operario</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {interventions.map((intervention) => (
                    <TableRow key={intervention.id}>
                      <TableCell>{intervention.type}</TableCell>
                      <TableCell>{intervention.estimatedCompletionDate || intervention.date}</TableCell>
                      <TableCell>{intervention.description}</TableCell>
                      <TableCell>${intervention.laborCost || "-"}</TableCell>
                      <TableCell>${intervention.partsCost || "-"}</TableCell>
                      <TableCell>${intervention.totalCost || intervention.cost}</TableCell>
                      <TableCell>{intervention.status}</TableCell>
                      <TableCell>{intervention.responsibleOperator || "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              // Mostrar los repuestos de esta intervención
                              if (intervention.parts && intervention.parts.length > 0) {
                                setParts(intervention.parts)
                                setShowPartsModal(true)
                              } else {
                                alert("Esta intervención no tiene repuestos asociados")
                              }
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteIntervention(intervention.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="outline" className="gap-2" onClick={onPrevious}>
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>


      </div>
 
    </div>}
         {showPartsModal && (
          <PartsForm
            isOpen={showPartsModal}
            onClose={() => setShowPartsModal(false)}
            parts={parts}
            setParts={setParts}
            onUpdatePartsCost={(totalCost) => {
              if (!manualPartsCost) {
                handlePartsCostChange(totalCost.toString())
              }
            }}
            interventionId={newIntervention.id || 0}
          />
        )}
        </>
  )
}

