"use client"

import { useEffect } from "react"
import { CheckCircle, XCircle } from "lucide-react"

interface AlertProps {
  message: string
  type: "success" | "error"
  show: boolean
  onClose: () => void
}

export default function Alert({ message, type, show, onClose }: AlertProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div
      className={`flex items-center p-4 rounded-lg mb-5 ${
        type === "success"
          ? "bg-green-50 text-green-800 border border-green-200"
          : "bg-red-50 text-red-800 border border-red-200"
      }`}
    >
      {type === "success" ? <CheckCircle className="w-5 h-5 mr-2" /> : <XCircle className="w-5 h-5 mr-2" />}
      {message}
    </div>
  )
}
