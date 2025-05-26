"use client"

import { createContext, useContext, useState, useEffect } from "react"

const InventoryContext = createContext()

export const useInventory = () => {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider")
  }
  return context
}

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Load items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem("inventoryItems")
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    } else {
      // Sample data
      const sampleItems = [
        {
          id: 1,
          name: "Laptop Dell XPS 13",
          description: "High-performance laptop for business use",
          quantity: 15,
          price: 999.99,
          category: "Electronics",
          status: "in-stock",
          sku: "DELL-XPS-001",
          supplier: "Dell Inc.",
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Office Chair",
          description: "Ergonomic office chair with lumbar support",
          quantity: 3,
          price: 299.99,
          category: "Furniture",
          status: "low-stock",
          sku: "CHAIR-ERG-001",
          supplier: "Office Depot",
          lastUpdated: new Date().toISOString(),
        },
      ]
      setItems(sampleItems)
      localStorage.setItem("inventoryItems", JSON.stringify(sampleItems))
    }
  }, [])

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("inventoryItems", JSON.stringify(items))
  }, [items])

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      lastUpdated: new Date().toISOString(),
    }
    setItems((prev) => [...prev, newItem])
  }

  const updateItem = (id, updatedItem) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === Number.parseInt(id)
          ? { ...updatedItem, id: Number.parseInt(id), lastUpdated: new Date().toISOString() }
          : item,
      ),
    )
  }

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const getItemById = (id) => {
    return items.find((item) => item.id === Number.parseInt(id))
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusCounts = () => {
    return {
      total: items.length,
      inStock: items.filter((item) => item.status === "in-stock").length,
      lowStock: items.filter((item) => item.status === "low-stock").length,
      ordered: items.filter((item) => item.status === "ordered").length,
      discontinued: items.filter((item) => item.status === "discontinued").length,
    }
  }

  const value = {
    items,
    filteredItems,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
    getStatusCounts,
  }

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
}
