"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Alert from "@/components/ui/alert"
import DataTable from "@/components/ui/data-table"
import type { ConfigDataProps } from "@/types/config"
import { useAlert } from "@/hooks/use-alert"

export default function CategoriesSection({ data, addCategory, deleteCategory }: ConfigDataProps) {
  const [categoryName, setCategoryName] = useState("")
  const { alert, showAlert, hideAlert } = useAlert()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const existing = data.categories.find((c) => c.name.toLowerCase() === categoryName.toLowerCase())

    if (existing) {
      showAlert("Category already exists!", "error")
      return
    }

    addCategory({ name: categoryName })
    setCategoryName("")
    showAlert("Category added successfully!", "success")
  }

  const columns = [
    { key: "name", label: "Category Name" },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: any) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            if (
              confirm(
                "Are you sure you want to delete this category? This will also delete all related types and turnaround times.",
              )
            ) {
              deleteCategory(row.id)
              showAlert("Category deleted successfully!", "success")
            }
          }}
        >
          Delete
        </Button>
      ),
    },
  ]

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Complaint Categories</h3>

      <Alert {...alert} onClose={hideAlert} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="categoryName">Category Name</Label>
            <Input id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit">Add Category</Button>
          <Button type="button" variant="secondary" onClick={() => setCategoryName("")}>
            Reset
          </Button>
        </div>
      </form>

      <DataTable columns={columns} data={data.categories} />
    </div>
  )
}
