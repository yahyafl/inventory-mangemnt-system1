"use client"
import { useParams, useNavigate } from "react-router-dom"
import { useInventory } from "../context/InventoryContext"
import ItemForm from "../components/ItemForm"

const EditItem = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getItemById, updateItem } = useInventory()

  const item = getItemById(id)

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Item not found</p>
      </div>
    )
  }

  const handleSubmit = (itemData) => {
    updateItem(id, itemData)
    navigate("/inventory")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Item</h1>
        <p className="text-gray-600">Update the details for {item.name}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <ItemForm onSubmit={handleSubmit} initialData={item} />
      </div>
    </div>
  )
}

export default EditItem

