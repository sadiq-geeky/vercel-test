"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Alert from "@/components/ui/alert"
import { useAlert } from "@/hooks/use-alert"

export default function SystemSettingsSection() {
  const [formData, setFormData] = useState({
    systemName: "Complaint Management System",
    version: "1.0.0",
  })
  const { alert, showAlert, hideAlert } = useAlert()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showAlert("System settings updated successfully!", "success")
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">System Settings</h3>

      <Alert {...alert} onClose={hideAlert} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="systemName">System Name</Label>
            <Input
              id="systemName"
              value={formData.systemName}
              onChange={(e) => setFormData({ ...formData, systemName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="version">Version</Label>
            <Input
              id="version"
              value={formData.version}
              onChange={(e) => setFormData({ ...formData, version: e.target.value })}
            />
          </div>
        </div>

        <Button type="submit">Update Settings</Button>
      </form>
    </div>
  )
}
