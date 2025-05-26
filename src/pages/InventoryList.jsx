import { useInventory } from "../context/InventoryContext"
import SearchBar from "../components/SearchBar"
import ItemCard from "../components/ItemCard"
import StatusFilter from "../components/StatusFilter"

const InventoryList = () => {
  const { filteredItems } = useInventory()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
        <p className="text-gray-600">{filteredItems.length} items found</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar />
        </div>
        <div className="md:w-64">
          <StatusFilter />
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default InventoryList
