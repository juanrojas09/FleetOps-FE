import React from 'react'

interface SwitchProps {
    isChecked: boolean
    onChange: (checked: boolean) => void
    }

export const Switch = (props:SwitchProps) => {

    const { isChecked, onChange } = props
    const handleToggle = () => {
        onChange(!isChecked)
    }
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            handleToggle()
        }
    }
  return (
    <button
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        isChecked ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-6 w-6 transform rounded-full transition-transform duration-200 ${
          isChecked ? "translate-x-5 bg-white" : "translate-x-0 bg-gray-400"
        }`}
      ></span>
    </button>
    
  )
}
