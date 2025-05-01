
interface VehicleSummaryProps {
  vehicleData: {
    brand: string
    model: string
    year: string
    plate: string
    service: string
    fuelType: string
    mileage: string
  }
  trips: any[]
  interventions: any[]
}

export function VehicleSummary({ vehicleData, trips, interventions }: VehicleSummaryProps) {
  return (
    <div className="grid gap-4 py-4">
      <h3 className="text-lg font-medium">Resumen de Datos</h3>

      <div className="rounded-md border p-4 bg-gray-50">
        <h4 className="text-md font-medium mb-2">Datos del Vehículo</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-gray-500">Marca:</p>
            <p className="font-medium">{vehicleData.brand}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Modelo:</p>
            <p className="font-medium">{vehicleData.model}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Año:</p>
            <p className="font-medium">{vehicleData.year}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Patente:</p>
            <p className="font-medium">{vehicleData.plate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Servicio:</p>
            <p className="font-medium">{vehicleData.service}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tipo de combustible:</p>
            <p className="font-medium">{vehicleData.fuelType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Kilometraje:</p>
            <p className="font-medium">{vehicleData.mileage} km</p>
          </div>
        </div>
      </div>

      {trips.length > 0 && (
        <div className="rounded-md border p-4 bg-gray-50">
          <h4 className="text-md font-medium mb-2">Viajes Registrados ({trips.length})</h4>
          <ul className="space-y-2">
            {trips.map((trip) => (
              <li key={trip.id} className="text-sm">
                <span className="font-medium">
                  {trip.origin} → {trip.destination}
                </span>
                <span className="text-gray-500">
                  {" "}
                  | {trip.date} | {trip.distance} km
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {interventions.length > 0 && (
        <div className="rounded-md border p-4 bg-gray-50">
          <h4 className="text-md font-medium mb-2">Intervenciones Registradas ({interventions.length})</h4>
          <ul className="space-y-2">
            {interventions.map((intervention) => (
              <li key={intervention.id} className="text-sm">
                <span className="font-medium">{intervention.type}</span>
                <span className="text-gray-500">
                  {" "}
                  | {intervention.date} | ${intervention.cost}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

