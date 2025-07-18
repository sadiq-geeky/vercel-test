"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Alert from "@/components/ui/alert"
import DataTable from "@/components/ui/data-table"
import type { ConfigDataProps } from "@/types/config"
import { useAlert } from "@/hooks/use-alert"

export default function TypesSection({ data, addType, deleteType, getCategoryName }: ConfigDataProps) {
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
  })
  const { alert, showAlert, hideAlert } = useAlert()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const existing = data.types.find(
      (t) =>
        t.categoryId == Number.parseInt(formData.categoryId) && t.name.toLowerCase() === formData.name.toLowerCase(),
    )

    if (existing) {
      showAlert("Type already exists in this category!", "error")
      return
    }

    addType({
      categoryId: Number.parseInt(formData.categoryId),
      name: formData.name,
    })

    setFormData({ categoryId: "", name: "" })
    showAlert("Type added successfully!", "success")
  }

  const columns = [
    { key: "category", label: "Category", render: (_: any, row: any) => getCategoryName(row.categoryId) },
    { key: "name", label: "Type Name" },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: any) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            if (confirm("Are you sure you want to delete this type? This will also delete related turnaround times.")) {
              deleteType(row.id)
              showAlert("Type deleted successfully!", "success")
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
      <h3 className="text-xl font-semibold mb-6">Complaint Types</h3>

      <Alert {...alert} onClose={hideAlert} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {data.categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="typeName">Type Name</Label>
            <Input
              id="typeName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit">Add Type</Button>
          <Button type="button" variant="secondary" onClick={() => setFormData({ categoryId: "", name: "" })}>
            Reset
          </Button>
        </div>
      </form>

      <DataTable columns={columns} data={data.types} />
    </div>
  )
}
