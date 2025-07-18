"use client"

import { useState } from "react"
import SubTabs from "@/components/ui/sub-tabs"
import EmailSettingsSection from "@/components/sections/email-settings-section"
import SmsSettingsSection from "@/components/sections/sms-settings-section"

export default function NotificationsModule() {
  const [activeSection, setActiveSection] = useState("email")

  const sections = [
    { id: "email", label: "Email Settings" },
    { id: "sms", label: "SMS Settings" },
  ]

  const renderActiveSection = () => {
    switch (activeSection) {
      case "email":
        return <EmailSettingsSection />
      case "sms":
        return <SmsSettingsSection />
      default:
        return <EmailSettingsSection />
    }
  }

  return (
    <div>
      <SubTabs sections={sections} activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderActiveSection()}
    </div>
  )
}
