import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import InventoryList from "./pages/InventoryList"
import AddItem from "./pages/AddItem"
import EditItem from "./pages/EditItem"
import ChatBot from "./components/ChatBot"
import { InventoryProvider } from "./context/InventoryContext"

function App() {
  return (
    <InventoryProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<InventoryList />} />
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/edit-item/:id" element={<EditItem />} />
            </Routes>
          </main>
          <ChatBot />
        </div>
      </Router>
    </InventoryProvider>
  )
}

export default App
