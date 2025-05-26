import { useInventory } from "../context/InventoryContext"
import SearchBar from "../components/SearchBar"
import ItemCard from "../components/ItemCard"
import StatusFilter from "../components/StatusFilter"

const InventoryList = () => {
  const { filteredItems, searchTerm, statusFilter } = useInventory()

  const getSearchResultsText = () => {
    if (searchTerm && statusFilter !== "all") {
      return `${filteredItems.length} items found for "${searchTerm}" with status "${statusFilter}"`
    } else if (searchTerm) {
      return `${filteredItems.length} items found for "${searchTerm}"`
    } else if (statusFilter !== "all") {
      return `${filteredItems.length} items with status "${statusFilter}"`
    } else {
      return `${filteredItems.length} total items`
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
        <p className="text-gray-600">{getSearchResultsText()}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar />
        </div>
        <div className="md:w-64">
          <StatusFilter />
        </div>
      </div>

      {searchTerm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <span className="font-medium">Searching for:</span> "{searchTerm}"
            {statusFilter !== "all" && (
              <span>
                {" "}
                <span className="font-medium">with status:</span> {statusFilter}
              </span>
            )}
          </p>
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm || statusFilter !== "all"
              ? "No items found matching your criteria."
              : "No items in inventory yet."}
          </p>
          {(searchTerm || statusFilter !== "all") && (
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms or filters.</p>
          )}
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
