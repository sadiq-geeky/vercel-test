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

export default function TurnaroundTimeSection({
  data,
  addTurnaround,
  deleteTurnaround,
  getCategoryName,
  getTypeName,
  getTypesByCategory,
}: ConfigDataProps) {
  const [formData, setFormData] = useState({
    categoryId: "",
    typeId: "",
    low: "",
    medium: "",
    mediumHigh: "",
    high: "",
  })
  const { alert, showAlert, hideAlert } = useAlert()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const existing = data.turnarounds.find(
      (t) => t.categoryId == Number.parseInt(formData.categoryId) && t.typeId == Number.parseInt(formData.typeId),
    )

    if (existing) {
      showAlert("Turnaround time already exists for this category and type!", "error")
      return
    }

    addTurnaround({
      categoryId: Number.parseInt(formData.categoryId),
      typeId: Number.parseInt(formData.typeId),
      low: Number.parseInt(formData.low),
      medium: Number.parseInt(formData.medium),
      mediumHigh: Number.parseInt(formData.mediumHigh),
      high: Number.parseInt(formData.high),
    })

    setFormData({
      categoryId: "",
      typeId: "",
      low: "",
      medium: "",
      mediumHigh: "",
      high: "",
    })

    showAlert("Turnaround time saved successfully!", "success")
  }

  const columns = [
    { key: "category", label: "Category", render: (_: any, row: any) => getCategoryName(row.categoryId) },
    { key: "type", label: "Type", render: (_: any, row: any) => getTypeName(row.typeId) },
    { key: "low", label: "Low" },
    { key: "medium", label: "Medium" },
    { key: "mediumHigh", label: "Medium High" },
    { key: "high", label: "High" },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: any) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            if (confirm("Are you sure you want to delete this turnaround time?")) {
              deleteTurnaround(row.id)
              showAlert("Turnaround time deleted successfully!", "success")
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
      <h3 className="text-xl font-semibold mb-6">Turnaround Time Configuration</h3>

      <Alert {...alert} onClose={hideAlert} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="category">Complaint Category</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => {
                setFormData({ ...formData, categoryId: value, typeId: "" })
              }}
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
            <Label htmlFor="type">Complaint Type</Label>
            <Select
              value={formData.typeId}
              onValueChange={(value) => setFormData({ ...formData, typeId: value })}
              disabled={!formData.categoryId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {getTypesByCategory(Number.parseInt(formData.categoryId)).map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="low">Low (Days)</Label>
            <Input
              type="number"
              min="1"
              max="365"
              value={formData.low}
              onChange={(e) => setFormData({ ...formData, low: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="medium">Medium (Days)</Label>
            <Input
              type="number"
              min="1"
              max="365"
              value={formData.medium}
              onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="mediumHigh">Medium High (Days)</Label>
            <Input
              type="number"
              min="1"
              max="365"
              value={formData.mediumHigh}
              onChange={(e) => setFormData({ ...formData, mediumHigh: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="high">High (Days)</Label>
            <Input
              type="number"
              min="1"
              max="365"
              value={formData.high}
              onChange={(e) => setFormData({ ...formData, high: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit">Save Turnaround Time</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setFormData({
                categoryId: "",
                typeId: "",
                low: "",
                medium: "",
                mediumHigh: "",
                high: "",
              })
            }
          >
            Reset
          </Button>
        </div>
      </form>

      <DataTable columns={columns} data={data.turnarounds} />
    </div>
  )
}
