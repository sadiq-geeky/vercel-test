"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Alert from "@/components/ui/alert"
import { useAlert } from "@/hooks/use-alert"

export default function SmsSettingsSection() {
  const [formData, setFormData] = useState({
    provider: "twilio",
    apiKey: "",
  })
  const { alert, showAlert, hideAlert } = useAlert()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showAlert("SMS settings saved successfully!", "success")
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">SMS Notification Settings</h3>

      <Alert {...alert} onClose={hideAlert} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="provider">SMS Provider</Label>
            <Select value={formData.provider} onValueChange={(value) => setFormData({ ...formData, provider: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="twilio">Twilio</SelectItem>
                <SelectItem value="nexmo">Nexmo</SelectItem>
                <SelectItem value="textlocal">TextLocal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              value={formData.apiKey}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            />
          </div>
        </div>

        <Button type="submit">Save SMS Settings</Button>
      </form>
    </div>
  )
}
