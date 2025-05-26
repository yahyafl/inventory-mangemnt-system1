"use client"

import { useState, useEffect } from "react"
import { inventoryService } from "@/services/inventory-service"
import { SearchFiltersComponent } from "@/components/search-filters"
import { InventoryItemCard } from "@/components/inventory-item-card"
import { InventoryForm } from "@/components/inventory-form"
import { AIChatbot } from "@/components/ai-chatbot"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, AlertTriangle, ShoppingCart } from "lucide-react"

export default function InventoryManagement() {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(undefined)
  const [chatbotOpen, setChatbotOpen] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const allItems = inventoryService.getAllItems()
    const allCategories = inventoryService.getCategories()
    setItems(allItems)
    setFilteredItems(allItems)
    setCategories(allCategories)
  }

  const handleFiltersChange = (filters) => {
    const filtered = inventoryService.searchItems(filters)
    setFilteredItems(filtered)
  }

  const handleSortChange = (field, order) => {
    const sorted = inventoryService.searchItems({}, field, order)
    setFilteredItems(sorted)
  }

  const handleAddItem = () => {
    setEditingItem(undefined)
    setShowForm(true)
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
    setShowForm(true)
  }

  const handleDeleteItem = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      inventoryService.deleteItem(id)
      loadData()
    }
  }

  const handleFormSubmit = (formData) => {
    if (editingItem) {
      inventoryService.updateItem(editingItem.id, formData)
    } else {
      inventoryService.addItem(formData)
    }
    loadData()
    setShowForm(false)
    setEditingItem(undefined)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingItem(undefined)
  }

  const getStatusCounts = () => {
    const counts = {
      "in-stock": 0,
      "low-stock": 0,
      ordered: 0,
      discontinued: 0,
    }
    items.forEach((item) => {
      counts[item.status]++
    })
    return counts
  }

  const statusCounts = getStatusCounts()
  const totalValue = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (showForm) {
    return (
      <div className="container mx-auto p-6">
        <InventoryForm
          item={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          categories={categories}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Inventory Management System</h1>
          <Button onClick={handleAddItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-500" />
                <span className="text-2xl font-bold">{items.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">{statusCounts["in-stock"]}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <Badge className="bg-yellow-100 text-yellow-800">{statusCounts["low-stock"]}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ordered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-blue-500" />
                <Badge className="bg-blue-100 text-blue-800">{statusCounts["ordered"]}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <SearchFiltersComponent
          onFiltersChange={handleFiltersChange}
          onSortChange={handleSortChange}
          categories={categories}
        />

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <InventoryItemCard key={item.id} item={item} onEdit={handleEditItem} onDelete={handleDeleteItem} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search filters or add a new item.</p>
          </div>
        )}
      </div>

      {/* AI Chatbot */}
      <AIChatbot isOpen={chatbotOpen} onToggle={() => setChatbotOpen(!chatbotOpen)} />
    </div>
  )
}

