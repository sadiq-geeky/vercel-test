"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Alert from "@/components/ui/alert"
import DataTable from "@/components/ui/data-table"
import type { ConfigDataProps } from "@/types/config"
import { useAlert } from "@/hooks/use-alert"

export default function BranchesSection({ data, addBranch, deleteBranch }: ConfigDataProps) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    address: "",
  })
  const { alert, showAlert, hideAlert } = useAlert()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const existing = data.branches.find((b) => b.code.toLowerCase() === formData.code.toLowerCase())

    if (existing) {
      showAlert("Branch code already exists!", "error")
      return
    }

    addBranch(formData)
    setFormData({ name: "", code: "", address: "" })
    showAlert("Branch added successfully!", "success")
  }

  const columns = [
    { key: "name", label: "Branch Name" },
    { key: "code", label: "Branch Code" },
    { key: "address", label: "Address" },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: any) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            if (confirm("Are you sure you want to delete this branch?")) {
              deleteBranch(row.id)
              showAlert("Branch deleted successfully!", "success")
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
      <h3 className="text-xl font-semibold mb-6">Branch Information</h3>

      <Alert {...alert} onClose={hideAlert} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="branchName">Branch Name</Label>
            <Input
              id="branchName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="branchCode">Branch Code</Label>
            <Input
              id="branchCode"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="branchAddress">Branch Address</Label>
          <Textarea
            id="branchAddress"
            rows={3}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit">Add Branch</Button>
          <Button type="button" variant="secondary" onClick={() => setFormData({ name: "", code: "", address: "" })}>
            Reset
          </Button>
        </div>
      </form>

      <DataTable columns={columns} data={data.branches} />
    </div>
  )
}
