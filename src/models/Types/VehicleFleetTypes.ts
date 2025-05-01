//put DTO ending on types
export interface Vehicle {
    id: number
    brand: string
    model: string
    plate: string
    fuelType: string
    mileage: number
    lastActivity: {
      date: string
      type: string
    }
    status: string
  }
  
  export interface Trip {
    cargo: string
    startDate: string
    endDate: string
    id: number
    origin: string
    destination: string
    date: string
    distance: string
    driver: string

  }
  
  export interface Intervention {
    id: number
    type: string
    date: string
    description: string
    cost: string
    status: string
    laborCost?: string
    partsCost?: string
    totalCost?: string
    estimatedCompletionDate?: string
    responsibleOperator?: string
    parts?: Part[]
  }
  
  
  export interface Part {
    id: number
    name: string
    description: string
    quantity: number
    unitCost: number
    supplier: string
  }
  
  
  