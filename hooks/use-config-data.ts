"use client"

import { useState } from "react"
import type { ConfigData, Category, Type, Turnaround, Branch } from "@/types/config"

const initialData: ConfigData = {
  categories: [
    { id: 1, name: "Service Quality" },
    { id: 2, name: "Billing" },
    { id: 3, name: "Technical" },
  ],
  types: [
    { id: 1, categoryId: 1, name: "Slow Response" },
    { id: 2, categoryId: 1, name: "Poor Quality" },
    { id: 3, categoryId: 2, name: "Wrong Charges" },
    { id: 4, categoryId: 3, name: "System Down" },
  ],
  turnarounds: [
    { id: 1, categoryId: 1, typeId: 1, low: 3, medium: 5, mediumHigh: 7, high: 10 },
    { id: 2, categoryId: 1, typeId: 2, low: 2, medium: 4, mediumHigh: 6, high: 8 },
    { id: 3, categoryId: 2, typeId: 3, low: 1, medium: 2, mediumHigh: 3, high: 5 },
    { id: 4, categoryId: 3, typeId: 4, low: 1, medium: 1, mediumHigh: 2, high: 3 },
  ],
  branches: [
    { id: 1, name: "Main Branch", code: "MB001", address: "123 Main Street, City, State" },
    { id: 2, name: "North Branch", code: "NB002", address: "456 North Avenue, City, State" },
  ],
}

export function useConfigData() {
  const [data, setData] = useState<ConfigData>(initialData)
  const [nextIds, setNextIds] = useState({
    categories: 4,
    types: 5,
    turnarounds: 5,
    branches: 3,
  })

  const getCategoryName = (categoryId: number): string => {
    const category = data.categories.find((c) => c.id === categoryId)
    return category ? category.name : ""
  }

  const getTypeName = (typeId: number): string => {
    const type = data.types.find((t) => t.id === typeId)
    return type ? type.name : ""
  }

  const getTypesByCategory = (categoryId: number): Type[] => {
    return data.types.filter((type) => type.categoryId === categoryId)
  }

  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory = { ...category, id: nextIds.categories }
    setData((prev) => ({
      ...prev,
      categories: [...prev.categories, newCategory],
    }))
    setNextIds((prev) => ({ ...prev, categories: prev.categories + 1 }))
  }

  const deleteCategory = (id: number) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== id),
      types: prev.types.filter((t) => t.categoryId !== id),
      turnarounds: prev.turnarounds.filter((t) => t.categoryId !== id),
    }))
  }

  const addType = (type: Omit<Type, "id">) => {
    const newType = { ...type, id: nextIds.types }
    setData((prev) => ({
      ...prev,
      types: [...prev.types, newType],
    }))
    setNextIds((prev) => ({ ...prev, types: prev.types + 1 }))
  }

  const deleteType = (id: number) => {
    setData((prev) => ({
      ...prev,
      types: prev.types.filter((t) => t.id !== id),
      turnarounds: prev.turnarounds.filter((t) => t.typeId !== id),
    }))
  }

  const addTurnaround = (turnaround: Omit<Turnaround, "id">) => {
    const newTurnaround = { ...turnaround, id: nextIds.turnarounds }
    setData((prev) => ({
      ...prev,
      turnarounds: [...prev.turnarounds, newTurnaround],
    }))
    setNextIds((prev) => ({ ...prev, turnarounds: prev.turnarounds + 1 }))
  }

  const deleteTurnaround = (id: number) => {
    setData((prev) => ({
      ...prev,
      turnarounds: prev.turnarounds.filter((t) => t.id !== id),
    }))
  }

  const addBranch = (branch: Omit<Branch, "id">) => {
    const newBranch = { ...branch, id: nextIds.branches }
    setData((prev) => ({
      ...prev,
      branches: [...prev.branches, newBranch],
    }))
    setNextIds((prev) => ({ ...prev, branches: prev.branches + 1 }))
  }

  const deleteBranch = (id: number) => {
    setData((prev) => ({
      ...prev,
      branches: prev.branches.filter((b) => b.id !== id),
    }))
  }

  return {
    data,
    getCategoryName,
    getTypeName,
    getTypesByCategory,
    addCategory,
    deleteCategory,
    addType,
    deleteType,
    addTurnaround,
    deleteTurnaround,
    addBranch,
    deleteBranch,
  }
}
