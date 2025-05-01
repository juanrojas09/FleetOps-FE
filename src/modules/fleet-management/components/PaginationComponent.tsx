
import { ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../common/ui/select"
import { Button } from "../../../common/ui/button"

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
  indexOfFirstItem: number
  indexOfLastItem: number
}

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
  indexOfFirstItem,
  indexOfLastItem,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Mostrando {indexOfFirstItem + 1} a {indexOfLastItem} de {totalItems} vehículos
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Filas por página:</span>
        <Select value={itemsPerPage.toString()} onValueChange={(value) => onRowsPerPageChange(Number(value))}>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={itemsPerPage} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronDown className="h-4 w-4 rotate-90" />
          </Button>
          <span className="text-sm">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </Button>
        </div>
      </div>
    </div>
  )
}

