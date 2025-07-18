"use client"

import { useState } from "react"

export function useAlert() {
  const [alert, setAlert] = useState({
    message: "",
    type: "success" as "success" | "error",
    show: false,
  })

  const showAlert = (message: string, type: "success" | "error" = "success") => {
    setAlert({ message, type, show: true })
  }

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }))
  }

  return { alert, showAlert, hideAlert }
}
