import { Link, useLocation } from "react-router-dom"
import { Package, Home, Plus, List } from "lucide-react"

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8" />
            <span className="text-xl font-bold">Inventory Manager</span>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/") ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/inventory"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/inventory") ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <List className="h-4 w-4" />
              <span>Inventory</span>
            </Link>

            <Link
              to="/add-item"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/add-item") ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
