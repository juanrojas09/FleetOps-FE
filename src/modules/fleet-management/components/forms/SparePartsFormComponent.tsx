import { ArrowLeft, Eye, Plus, Trash } from "lucide-react"
import { Button } from "../../../../common/ui/button"
import { Card, CardContent } from "../../../../common/ui/card"
import { DialogContent } from "@radix-ui/react-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../common/ui/table"
import { Input } from "../../../../common/ui/input"
import { Label } from "../../../../common/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../common/ui/select"
import { Dialog, DialogHeader, DialogTitle } from "../../../../common/ui/dialog"
import { useEffect, useState } from "react"

export interface Part {
    id: number
    name: string
    description: string
    quantity: number
    unitCost: number
    supplier: string
  }
  
  interface PartsFormProps {
    isOpen: boolean
    onClose: () => void
    parts: Part[]
    setParts: React.Dispatch<React.SetStateAction<Part[]>>
    onUpdatePartsCost: (totalCost: number) => void
    interventionId: number
  }
  
  export function PartsForm({ isOpen, onClose, parts, setParts, onUpdatePartsCost, interventionId }: PartsFormProps) {
    const [newPart, setNewPart] = useState<Part>({
      id: 0,
      name: "",
      description: "",
      quantity: 1,
      unitCost: 0,
      supplier: "",
    })
  
    const [showPartsList, setShowPartsList] = useState(true)
  
    // Calcular el costo total de todas las piezas
    const calculateTotalCost = () => {
      return parts.reduce((total, part) => total + part.quantity * part.unitCost, 0)
    }
  
    // Actualizar el costo total cuando cambian las piezas
    useEffect(() => {
      onUpdatePartsCost(calculateTotalCost())
    }, [parts])
  
    const handleAddPart = () => {
      if (!newPart.name || newPart.quantity <= 0) {
        alert("Por favor complete los campos obligatorios")
        return
      }
  
      setParts([...parts, { ...newPart, id: Date.now() }])
  
      // Resetear el formulario
      setNewPart({
        id: 0,
        name: "",
        description: "",
        quantity: 1,
        unitCost: 0,
        supplier: "",
      })
    }
  
    const handleDeletePart = (id: number) => {
      setParts(parts.filter((part) => part.id !== id))
    }
  
    const partOptions = [
      "Ruleman y masa",
      "Filtro de aire",
      "Aceite",
      "Filtro de aceite",
      "Filtro de combustible",
      "Otro...",
    ]
  
    const supplierOptions = ["Proveedor 1", "Proveedor 2", "Proveedor 3", "Otro"]
  
    const descriptionOptions = ["Ruleman y masa", "Filtro de aire", "Otro..."]
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
              <DialogContent className="overflow-y-auto max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>
              {parts.length > 0
                ? `Detalle de Repuestos (${parts.length} repuestos agregados)`
                : "Alta de Repuestos Para La Intervención"}
            </DialogTitle>
          </DialogHeader>
  
       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="partName">Repuesto*</Label>
                <Select value={newPart.name} onValueChange={(value) => setNewPart({ ...newPart, name: value })}>
                  <SelectTrigger id="partName">
                    <SelectValue placeholder="Seleccionar repuesto" />
                  </SelectTrigger>
                  <SelectContent>
                    {partOptions.map((part) => (
                      <SelectItem key={part} value={part}>
                        {part}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
  
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Select
                  value={newPart.description}
                  onValueChange={(value) => setNewPart({ ...newPart, description: value })}
                >
                  <SelectTrigger id="description">
                    <SelectValue placeholder="Seleccionar descripción" />
                  </SelectTrigger>
                  <SelectContent>
                    {descriptionOptions.map((desc) => (
                      <SelectItem key={desc} value={desc}>
                        {desc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
  
              <div>
                <Label htmlFor="supplier">Proveedor</Label>
                <Select value={newPart.supplier} onValueChange={(value) => setNewPart({ ...newPart, supplier: value })}>
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Seleccionar proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {supplierOptions.map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>
                        {supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
  
            <div className="space-y-4">
              <div>
                <Label htmlFor="quantity">Cantidad</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newPart.quantity.toString()}
                  onChange={(e) => setNewPart({ ...newPart, quantity: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
  
              <div>
                <Label htmlFor="unitCost">Costo unitario</Label>
                <Input
                  id="unitCost"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newPart.unitCost.toString()}
                  onChange={(e) => setNewPart({ ...newPart, unitCost: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>
  
              <div className="pt-6">
                <Button onClick={handleAddPart} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Repuesto
                </Button>
              </div>
            </div>
          </div>
  
          <div className="mt-6">
            <Button variant="outline" className="gap-2 mb-4" onClick={() => setShowPartsList(!showPartsList)}>
              <Eye className="h-4 w-4" />
              {showPartsList ? "Ocultar Repuestos" : "Ver Detalle de Repuestos"}
            </Button>
  
            {showPartsList && (
              <Card>
                <CardContent className="p-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Repuesto</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Cantidad</TableHead>
                          <TableHead>Costo Unitario</TableHead>
                          <TableHead>Subtotal</TableHead>
                          <TableHead>Proveedor</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parts.length > 0 ? (
                          parts.map((part) => (
                            <TableRow key={part.id}>
                              <TableCell>{part.name}</TableCell>
                              <TableCell>{part.description}</TableCell>
                              <TableCell>{part.quantity}</TableCell>
                              <TableCell>${part.unitCost.toFixed(2)}</TableCell>
                              <TableCell>${(part.quantity * part.unitCost).toFixed(2)}</TableCell>
                              <TableCell>{part.supplier}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="icon" onClick={() => handleDeletePart(part.id)}>
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-4">
                              No hay repuestos agregados
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
  
                  <div className="mt-4 text-right">
                    <p className="font-medium">
                      Costo Total Actual de la intervención: ${calculateTotalCost().toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
  
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={onClose} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a la Intervención
            </Button>
  
            <Button onClick={onClose} className="gap-2">
              Confirmar Repuestos
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  
  