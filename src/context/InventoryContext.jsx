"use client"

import { createContext, useContext, useState, useEffect, useMemo } from "react"

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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  // Debounce search term for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 150)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Load items from localStorage on component mount
  useEffect(() => {
    try {
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
          {
            id: 3,
            name: "Wireless Mouse",
            description: "Bluetooth wireless mouse with precision tracking",
            quantity: 25,
            price: 49.99,
            category: "Electronics",
            status: "in-stock",
            sku: "MOUSE-BT-001",
            supplier: "Logitech",
            lastUpdated: new Date().toISOString(),
          },
          {
            id: 4,
            name: "Monitor Stand",
            description: "Adjustable monitor stand for better ergonomics",
            quantity: 8,
            price: 79.99,
            category: "Accessories",
            status: "in-stock",
            sku: "STAND-MON-001",
            supplier: "Generic",
            lastUpdated: new Date().toISOString(),
          },
        ]
        setItems(sampleItems)
        localStorage.setItem("inventoryItems", JSON.stringify(sampleItems))
      }
    } catch (error) {
      console.error("Error loading items from localStorage:", error)
      setItems([])
    }
  }, [])

  // Save items to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem("inventoryItems", JSON.stringify(items))
    } catch (error) {
      console.error("Error saving items to localStorage:", error)
    }
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

  // Optimized filtering with useMemo for better performance
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        debouncedSearchTerm === "" ||
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(debouncedSearchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || item.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [items, debouncedSearchTerm, statusFilter])

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
