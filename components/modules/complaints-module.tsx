"use client"

import { useState } from "react"
import SubTabs from "@/components/ui/sub-tabs"
import TurnaroundTimeSection from "@/components/sections/turnaround-time-section"
import CategoriesSection from "@/components/sections/categories-section"
import TypesSection from "@/components/sections/types-section"
import type { ConfigDataProps } from "@/types/config"

export default function ComplaintsModule(props: ConfigDataProps) {
  const [activeSection, setActiveSection] = useState("turnaround")

  const sections = [
    { id: "turnaround", label: "Turnaround Time" },
    { id: "categories", label: "Complaint Categories" },
    { id: "types", label: "Complaint Types" },
  ]

  const renderActiveSection = () => {
    switch (activeSection) {
      case "turnaround":
        return <TurnaroundTimeSection {...props} />
      case "categories":
        return <CategoriesSection {...props} />
      case "types":
        return <TypesSection {...props} />
      default:
        return <TurnaroundTimeSection {...props} />
    }
  }

  return (
    <div>
      <SubTabs sections={sections} activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderActiveSection()}
    </div>
  )
}
