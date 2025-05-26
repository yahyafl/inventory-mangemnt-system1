"use client"
import { useInventory } from "../context/InventoryContext"

const StatusFilter = () => {
  const { statusFilter, setStatusFilter } = useInventory()

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "in-stock", label: "In Stock" },
    { value: "low-stock", label: "Low Stock" },
    { value: "ordered", label: "Ordered" },
    { value: "discontinued", label: "Discontinued" },
  ]

  return (
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default StatusFilter
