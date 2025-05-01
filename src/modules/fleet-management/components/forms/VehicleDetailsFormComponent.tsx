

import type React from "react"
import { Label } from "../../../../common/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../common/ui/select"
import { Input } from "../../../../common/ui/input"


  
  // Opciones para los selectores
  export const fuelTypeOptions = ["NAFTA", "DIESEL", "GNC", "ELÉCTRICO", "HÍBRIDO"]
  export const statusOptions = ["Operativo", "En mantenimiento", "Fuera de servicio", "En reparación"]
  export const brandOptions = ["Mercedes", "Renault", "Citroen", "Toyota", "Chevrolet", "Ford", "Iveco"]
  export const serviceOptions = ["BCA", "EV", "TEMAL", "EV PRIVADOS"]
  
  

interface VehicleDetailsFormProps {
  vehicleData: {
    brand: string
    model: string
    year: string
    plate: string
    service: string
    fuelType: string
    mileage: string
  }
  setVehicleData: React.Dispatch<
    React.SetStateAction<{
      brand: string
      model: string
      year: string
      plate: string
      service: string
      fuelType: string
      mileage: string
    }>
  >
}

export function VehicleDetailsForm({ vehicleData, setVehicleData }: VehicleDetailsFormProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="brand">Marca *</Label>
          <Select value={vehicleData.brand} onValueChange={(value) => setVehicleData({ ...vehicleData, brand: value })}>
            <SelectTrigger id="brand">
              <SelectValue placeholder="Seleccionar marca" />
            </SelectTrigger>
            <SelectContent>
              {brandOptions.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="model">Modelo *</Label>
          <Input
            id="model"
            placeholder="Modelo del vehículo"
            value={vehicleData.model}
            onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="year">Año</Label>
          <Input
            id="year"
            placeholder="Año del vehículo"
            value={vehicleData.year}
            onChange={(e) => setVehicleData({ ...vehicleData, year: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="plate">Patente *</Label>
          <Input
            id="plate"
            placeholder="Patente del vehículo"
            value={vehicleData.plate}
            onChange={(e) => setVehicleData({ ...vehicleData, plate: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="service">Servicio prestado</Label>
          <Select
            value={vehicleData.service}
            onValueChange={(value) => setVehicleData({ ...vehicleData, service: value })}
          >
            <SelectTrigger id="service">
              <SelectValue placeholder="Seleccionar servicio" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="fuelType">Tipo de combustible *</Label>
          <Select
            value={vehicleData.fuelType}
            onValueChange={(value) => setVehicleData({ ...vehicleData, fuelType: value })}
          >
            <SelectTrigger id="fuelType">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              {fuelTypeOptions.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="mileage">Kilometraje actual *</Label>
        <Input
          id="mileage"
          type="number"
          placeholder="Kilometraje actual"
          value={vehicleData.mileage}
          onChange={(e) => setVehicleData({ ...vehicleData, mileage: e.target.value })}
        />
      </div>
    </div>
  )
}

