"use client"

import { useState } from "react"
import SubTabs from "@/components/ui/sub-tabs"
import BranchesSection from "@/components/sections/branches-section"
import SystemSettingsSection from "@/components/sections/system-settings-section"
import type { ConfigDataProps } from "@/types/config"

export default function GeneralModule(props: ConfigDataProps) {
  const [activeSection, setActiveSection] = useState("branches")

  const sections = [
    { id: "branches", label: "Branch Information" },
    { id: "system", label: "System Settings" },
  ]

  const renderActiveSection = () => {
    switch (activeSection) {
      case "branches":
        return <BranchesSection {...props} />
      case "system":
        return <SystemSettingsSection />
      default:
        return <BranchesSection {...props} />
    }
  }

  return (
    <div>
      <SubTabs sections={sections} activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderActiveSection()}
    </div>
  )
}
