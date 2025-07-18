"use client"

interface MainTabsProps {
  activeModule: string
  onModuleChange: (module: string) => void
}

export default function MainTabs({ activeModule, onModuleChange }: MainTabsProps) {
  const tabs = [
    { id: "complaints", label: "Complaints Module" },
    { id: "general", label: "General Configuration" },
    { id: "notifications", label: "Notification Configuration" },
  ]

  return (
    <div className="flex bg-white rounded-lg shadow-lg mb-5 overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onModuleChange(tab.id)}
          className={`flex-1 px-5 py-4 font-semibold transition-all duration-300 border-r border-gray-200 last:border-r-0 ${
            activeModule === tab.id ? "bg-indigo-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
