import { Calendar } from "lucide-react"

export function PageHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Flota de vehículos</h1>
        <p className="text-gray-500">Gestión centralizada de la flota de vehículos</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-card border rounded-md px-3 py-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm">Fecha: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}

