"use client"
import { useInventory } from "../context/InventoryContext"
import { Search, X } from "lucide-react"
import { useEffect, useRef } from "react"

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useInventory()
  const inputRef = useRef(null)

  // Keyboard shortcut for fast search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }

      // ESC to clear search
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setSearchTerm("")
        inputRef.current?.blur()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [setSearchTerm])

  const clearSearch = () => {
    setSearchTerm("")
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search items... (Ctrl+K)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>
      )}
    </div>
  )
}

export default SearchBar
