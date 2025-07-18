export interface Category {
  id: number
  name: string
}

export interface Type {
  id: number
  categoryId: number
  name: string
}

export interface Turnaround {
  id: number
  categoryId: number
  typeId: number
  low: number
  medium: number
  mediumHigh: number
  high: number
}

export interface Branch {
  id: number
  name: string
  code: string
  address: string
}

export interface ConfigData {
  categories: Category[]
  types: Type[]
  turnarounds: Turnaround[]
  branches: Branch[]
}

export interface ConfigDataProps {
  data: ConfigData
  getCategoryName: (categoryId: number) => string
  getTypeName: (typeId: number) => string
  getTypesByCategory: (categoryId: number) => Type[]
  addCategory: (category: Omit<Category, "id">) => void
  deleteCategory: (id: number) => void
  addType: (type: Omit<Type, "id">) => void
  deleteType: (id: number) => void
  addTurnaround: (turnaround: Omit<Turnaround, "id">) => void
  deleteTurnaround: (id: number) => void
  addBranch: (branch: Omit<Branch, "id">) => void
  deleteBranch: (id: number) => void
}
