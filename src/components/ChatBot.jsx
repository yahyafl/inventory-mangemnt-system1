"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your inventory assistant. I can help you with questions about your inventory, stock levels, and management tips. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Simulated AI responses - In a real app, you'd integrate with Gemini API
  const getAIResponse = async (message) => {
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const lowerMessage = message.toLowerCase()

    let response = ""

    if (lowerMessage.includes("stock") || lowerMessage.includes("inventory")) {
      response =
        "I can help you manage your inventory! You can check stock levels, add new items, or update existing ones. Would you like me to guide you through any specific inventory task?"
    } else if (lowerMessage.includes("add") || lowerMessage.includes("create")) {
      response =
        "To add a new item to your inventory, click on 'Add Item' in the navigation menu. Make sure to fill in all required fields including name, SKU, quantity, price, and status."
    } else if (lowerMessage.includes("search") || lowerMessage.includes("find")) {
      response =
        "You can search for items using the search bar on the Inventory page. You can search by item name, description, or SKU. You can also filter by status (In Stock, Low Stock, Ordered, Discontinued)."
    } else if (lowerMessage.includes("low stock") || lowerMessage.includes("alert")) {
      response =
        "Low stock items are automatically highlighted in your inventory. You can filter to see only low stock items using the status filter. Consider setting up reorder points for critical items."
    } else if (lowerMessage.includes("delete") || lowerMessage.includes("remove")) {
      response =
        "To delete an item, go to the Inventory page, find the item you want to remove, and click the red trash icon. You'll be asked to confirm the deletion to prevent accidental removals."
    } else if (lowerMessage.includes("edit") || lowerMessage.includes("update")) {
      response =
        "To edit an item, go to the Inventory page, find the item, and click the blue 'Edit' button. You can update any field including quantity, price, status, and other details."
    } else if (lowerMessage.includes("help") || lowerMessage.includes("how")) {
      response =
        "I'm here to help! You can ask me about:\n• Adding, editing, or deleting inventory items\n• Searching and filtering your inventory\n• Managing stock levels and alerts\n• Understanding different item statuses\n• General inventory management tips"
    } else {
      response =
        "I understand you're asking about inventory management. Could you be more specific? I can help with adding items, checking stock levels, searching inventory, or managing item statuses."
    }

    setIsLoading(false)
    return response
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    const aiResponse = await getAIResponse(inputMessage)

    const botMessage = {
      id: Date.now() + 1,
      text: aiResponse,
      isBot: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span className="font-medium">Inventory Assistant</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isBot ? "bg-gray-100 text-gray-800" : "bg-blue-600 text-white"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your inventory..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot
