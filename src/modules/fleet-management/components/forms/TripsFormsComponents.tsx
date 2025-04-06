"use client"

import type React from "react"

import { useState } from "react"
import { Trash, Plus, ArrowLeft, ArrowRight, Eye } from "lucide-react"
import { Trip } from "../../../../models/Types/VehicleFleetTypes"
import { Label } from "../../../../common/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../common/ui/select"
import { Input } from "../../../../common/ui/input"
import { Button } from "../../../../common/ui/button"
import { Card, CardContent } from "../../../../common/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../common/ui/table"

interface TripsFormProps {
  trips: Trip[]
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>
  vehiclePlate?: string
  onPrevious?: () => void
  onNext?: () => void
}

export function TripsForm({ trips, setTrips, vehiclePlate, onPrevious, onNext }: TripsFormProps) {
  const [newTrip, setNewTrip] = useState({
    origin: "",
    destination: "",
    startDate: "",
    endDate: "",
    distance: "",
    driver: "",
    cargo: "",
    originAddress: "",
    destinationAddress: "",
    originLatitude: "",
    originLongitude: "",
    destinationLatitude: "",
    destinationLongitude: "",
  })

  const [showTripsList, setShowTripsList] = useState(false)

  const handleAddTrip = () => {
    if (!newTrip.origin || !newTrip.destination || !newTrip.startDate || !newTrip.distance) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }

    setTrips([
      ...trips,
      {
        ...newTrip,
        id: trips.length + 1,
        date: newTrip.startDate, // Mantener compatibilidad con el tipo Trip existente
      },
    ])

    // Reset form
    setNewTrip({
      origin: "",
      destination: "",
      startDate: "",
      endDate: "",
      distance: "",
      driver: "",
      cargo: "",
      originAddress: "",
      destinationAddress: "",
      originLatitude: "",
      originLongitude: "",
      destinationLatitude: "",
      destinationLongitude: "",
    })
  }

  const handleDeleteTrip = (id: number) => {
    const updatedTrips = trips.filter((trip) => trip.id !== id)
    setTrips(updatedTrips)
  }

  const driverOptions = ["Fernando Perez", "Ignacio Gimenez", "Otro..."]

  return (
    <div className="space-y-6">
 



      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="driver">Operario Responsable</Label>
            <Select value={newTrip.driver} onValueChange={(value) => setNewTrip({ ...newTrip, driver: value })}>
              <SelectTrigger id="driver" className="w-full">
                <SelectValue placeholder="Seleccionar operario" />
              </SelectTrigger>
              <SelectContent>
                {driverOptions.map((driver) => (
                  <SelectItem key={driver} value={driver}>
                    {driver}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="startDate">Fecha de inicio</Label>
            <Input
              id="startDate"
              type="date"
              value={newTrip.startDate}
              onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="originAddress">Dirección de origen*</Label>
            <Input
              id="originAddress"
              placeholder="Dirección de origen"
              value={newTrip.originAddress}
              onChange={(e) => setNewTrip({ ...newTrip, originAddress: e.target.value, origin: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="originLatitude">Latitud Origen</Label>
              <Input
                id="originLatitude"
                placeholder="Latitud de origen"
                value={newTrip.originLatitude}
                onChange={(e) => setNewTrip({ ...newTrip, originLatitude: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="originLongitude">Longitud Origen</Label>
              <Input
                id="originLongitude"
                placeholder="Longitud de origen"
                value={newTrip.originLongitude}
                onChange={(e) => setNewTrip({ ...newTrip, originLongitude: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="destinationLatitude">Latitud Destino</Label>
            <Input
              id="destinationLatitude"
              placeholder="Latitud de destino"
              value={newTrip.destinationLatitude}
              onChange={(e) => setNewTrip({ ...newTrip, destinationLatitude: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="cargo">Carga transportada</Label>
            <Input
              id="cargo"
              placeholder="Carga transportada"
              value={newTrip.cargo}
              onChange={(e) => setNewTrip({ ...newTrip, cargo: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="endDate">Fecha de finalización</Label>
            <Input
              id="endDate"
              type="date"
              value={newTrip.endDate}
              onChange={(e) => setNewTrip({ ...newTrip, endDate: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="destinationAddress">Dirección de destino*</Label>
            <Input
              id="destinationAddress"
              placeholder="Dirección de destino"
              value={newTrip.destinationAddress}
              onChange={(e) =>
                setNewTrip({ ...newTrip, destinationAddress: e.target.value, destination: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="distance">Distancia (km)*</Label>
            <Input
              id="distance"
              type="number"
              placeholder="Distancia en km"
              value={newTrip.distance}
              onChange={(e) => setNewTrip({ ...newTrip, distance: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="destinationLongitude">Longitud Destino</Label>
            <Input
              id="destinationLongitude"
              placeholder="Longitud de destino"
              value={newTrip.destinationLongitude}
              onChange={(e) => setNewTrip({ ...newTrip, destinationLongitude: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" className="gap-2" onClick={() => setShowTripsList(!showTripsList)}>
          <Eye className="h-4 w-4" />
          {showTripsList ? "Ocultar Viajes" : "Ver Carga de Viajes"}
        </Button>

        <Button onClick={handleAddTrip} className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar Viaje
        </Button>
      </div>

      {showTripsList && trips.length > 0 && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Viajes registrados</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Origen</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Fecha Inicio</TableHead>
                    <TableHead>Fecha Fin</TableHead>
                    <TableHead>Distancia</TableHead>
                    <TableHead>Conductor</TableHead>
                    <TableHead>Carga</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell>{trip.origin}</TableCell>
                      <TableCell>{trip.destination}</TableCell>
                      <TableCell>{trip.startDate || trip.date}</TableCell>
                      <TableCell>{trip.endDate || "-"}</TableCell>
                      <TableCell>{trip.distance} km</TableCell>
                      <TableCell>{trip.driver}</TableCell>
                      <TableCell>{trip.cargo || "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTrip(trip.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
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
    </div>
  )
}

