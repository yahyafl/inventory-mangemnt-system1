"use client"

import { useInventory } from "../context/InventoryContext"
import { Package, AlertTriangle, ShoppingCart, XCircle, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const { getStatusCounts, items } = useInventory()
  const counts = getStatusCounts()

  const stats = [
    {
      title: "Total Items",
      value: counts.total,
      icon: Package,
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "In Stock",
      value: counts.inStock,
      icon: TrendingUp,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      title: "Low Stock",
      value: counts.lowStock,
      icon: AlertTriangle,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
    },
    {
      title: "Ordered",
      value: counts.ordered,
      icon: ShoppingCart,
      color: "bg-purple-500",
      textColor: "text-purple-600",
    },
    {
      title: "Discontinued",
      value: counts.discontinued,
      icon: XCircle,
      color: "bg-red-500",
      textColor: "text-red-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your inventory management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/add-item"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer group"
          >
            <Package className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors" />
            <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
              Add New Item
            </p>
          </Link>

          <button
            onClick={() => {
              // Filter to show only items with quantities and create a simple report
              const totalValue = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
              const avgPrice = items.length > 0 ? totalValue / items.length : 0

              alert(
                `📊 Inventory Report:\n\n` +
                  `Total Items: ${items.length}\n` +
                  `Total Inventory Value: $${totalValue.toFixed(2)}\n` +
                  `Average Item Price: $${avgPrice.toFixed(2)}\n` +
                  `In Stock: ${counts.inStock}\n` +
                  `Low Stock: ${counts.lowStock}\n` +
                  `Ordered: ${counts.ordered}\n` +
                  `Discontinued: ${counts.discontinued}`,
              )
            }}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
          >
            <TrendingUp className="h-8 w-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2 transition-colors" />
            <p className="text-sm font-medium text-gray-600 group-hover:text-green-600 transition-colors">
              View Reports
            </p>
          </button>

          <button
            onClick={() => {
              const lowStockItems = items.filter((item) => item.status === "low-stock")
              if (lowStockItems.length === 0) {
                alert("✅ Great news! No items are currently low on stock.")
              } else {
                const itemsList = lowStockItems.map((item) => `• ${item.name} (${item.quantity} remaining)`).join("\n")

                alert(
                  `⚠️ Low Stock Alert!\n\n` +
                    `${lowStockItems.length} items need attention:\n\n` +
                    `${itemsList}\n\n` +
                    `Consider reordering these items soon.`,
                )
              }
            }}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors group"
          >
            <AlertTriangle className="h-8 w-8 text-gray-400 group-hover:text-yellow-500 mx-auto mb-2 transition-colors" />
            <p className="text-sm font-medium text-gray-600 group-hover:text-yellow-600 transition-colors">
              Low Stock Alerts
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
