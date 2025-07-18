"use client"

import { useState } from "react"
import Header from "@/components/header"
import MainTabs from "@/components/main-tabs"
import ComplaintsModule from "@/components/modules/complaints-module"
import GeneralModule from "@/components/modules/general-module"
import NotificationsModule from "@/components/modules/notifications-module"
import { useConfigData } from "@/hooks/use-config-data"

export default function ConfigurationManagement() {
  const [activeModule, setActiveModule] = useState("complaints")
  const configData = useConfigData()

  const renderActiveModule = () => {
    switch (activeModule) {
      case "complaints":
        return <ComplaintsModule {...configData} />
      case "general":
        return <GeneralModule {...configData} />
      case "notifications":
        return <NotificationsModule />
      default:
        return <ComplaintsModule {...configData} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-5">
        <Header />
        <MainTabs activeModule={activeModule} onModuleChange={setActiveModule} />
        <div className="bg-white rounded-lg shadow-lg p-8 min-h-[600px]">{renderActiveModule()}</div>
      </div>
    </div>
  )
}
