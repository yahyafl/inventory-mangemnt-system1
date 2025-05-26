"use client"
import { Link } from "react-router-dom"
import { useInventory } from "../context/InventoryContext"
import { Edit, Trash2, Package } from "lucide-react"

const ItemCard = ({ item }) => {
  const { deleteItem } = useInventory()

  const getStatusColor = (status) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800"
      case "ordered":
        return "bg-purple-100 text-purple-800"
      case "discontinued":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "in-stock":
        return "In Stock"
      case "low-stock":
        return "Low Stock"
      case "ordered":
        return "Ordered"
      case "discontinued":
        return "Discontinued"
      default:
        return status
    }
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(item.id)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500">SKU: {item.sku}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
          {getStatusLabel(item.status)}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Quantity</p>
          <p className="text-lg font-semibold text-gray-900">{item.quantity}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Price</p>
          <p className="text-lg font-semibold text-gray-900">${item.price}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500">Category</p>
        <p className="text-sm text-gray-900">{item.category}</p>
      </div>

      <div className="flex space-x-2">
        <Link
          to={`/edit-item/${item.id}`}
          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default ItemCard
