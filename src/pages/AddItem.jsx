"use client"
import { useNavigate } from "react-router-dom"
import { useInventory } from "../context/InventoryContext"
import ItemForm from "../components/ItemForm"

const AddItem = () => {
  const navigate = useNavigate()
  const { addItem } = useInventory()

  const handleSubmit = (itemData) => {
    addItem(itemData)
    navigate("/inventory")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Add New Item</h1>
        <p className="text-gray-600">Fill in the details to add a new item to your inventory</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <ItemForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default AddItem
