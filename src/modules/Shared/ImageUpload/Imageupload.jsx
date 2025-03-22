"use client"

import { useState, useRef, useEffect } from "react"
import { Upload } from "lucide-react"

export function ImageUpload({ defaultImage, onChange, className = "" }) {
  const [preview, setPreview] = useState(defaultImage || "/placeholder.svg")
  const fileInputRef = useRef(null)

  useEffect(() => {
    console.log("defaultImage updated:", defaultImage)
    setPreview(defaultImage)
  }, [defaultImage])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        console.log("Image preview updated:", reader.result)
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)

      if (onChange) {
        console.log("File selected:", file)
        onChange(file)
      }
    }
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={`relative rounded-full overflow-hidden cursor-pointer ${className}`} onClick={handleClick}>
      <div
        className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 ${preview ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
      >
        <Upload className="w-8 h-8 md:w-12 md:h-12 text-gray-400 dark:text-gray-500" />
      </div>
      <div
        className={`absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ${preview ? "" : "hidden"}`}
      >
        <Upload className="w-6 h-6 md:w-8 md:h-8 text-white" />
      </div>
      {preview && (
        <img
          src={preview}
          alt="Profile"
          className="rounded-circle d-block mx-auto"
          style={{ width: "140px", height: "140px", objectFit: "cover" }}
        />
      )}
      <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />
    </div>
  )
}
