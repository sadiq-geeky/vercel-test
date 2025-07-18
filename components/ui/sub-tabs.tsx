"use client"

interface SubTabsProps {
  sections: Array<{ id: string; label: string }>
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function SubTabs({ sections, activeSection, onSectionChange }: SubTabsProps) {
  return (
    <div className="flex mb-8 border-b-2 border-gray-100">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`px-6 py-3 font-medium transition-all duration-300 border-b-3 ${
            activeSection === section.id
              ? "text-indigo-600 border-indigo-600"
              : "text-gray-600 border-transparent hover:text-gray-900"
          }`}
        >
          {section.label}
        </button>
      ))}
    </div>
  )
}
