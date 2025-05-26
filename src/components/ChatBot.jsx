"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI-powered inventory assistant using Google Gemini. I can help you with:\n\n• Managing inventory items\n• Understanding stock statuses\n• Search and filtering tips\n• Best practices for inventory management\n\nWhat would you like to know about your inventory?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Real Gemini AI integration with updated model
  const getAIResponse = async (message) => {
    setIsLoading(true)

    try {
      // Check if API key exists
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY

      console.log("🔍 Debug Info:")
      console.log("API Key exists:", !!apiKey)
      console.log("API Key length:", apiKey ? apiKey.length : 0)
      console.log("API Key starts with:", apiKey ? apiKey.substring(0, 10) + "..." : "No key")

      if (!apiKey) {
        throw new Error("Gemini API key not found. Please add VITE_GEMINI_API_KEY to your environment variables.")
      }

      console.log("🚀 Making API request to Gemini with updated model...")

      // Updated API endpoint with correct model name
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an inventory management assistant. Help the user with their inventory-related question: "${message}". 
            
            Context: This is an inventory management system where users can:
            - Add, edit, and delete inventory items
            - Search and filter items by name, description, SKU, or status
            - Manage item statuses: In Stock, Low Stock, Ordered, Discontinued
            - View dashboard with inventory statistics
            
            Provide helpful, concise responses about inventory management. If the question is not inventory-related, politely redirect to inventory topics.`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
            ],
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.text()
        console.error("API Error Response:", errorData)
        throw new Error(`API request failed: ${response.status} - ${errorData}`)
      }

      const data = await response.json()
      console.log("✅ API Response successful:", data)

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text
      } else {
        throw new Error("Invalid response format from Gemini API")
      }
    } catch (error) {
      console.error("Gemini API Error:", error)

      // Fallback responses for common inventory questions
      const fallbackResponse = getFallbackResponse(message)
      return (
        fallbackResponse ||
        "I'm sorry, I'm having trouble connecting to my AI service right now. Please try again in a moment, or feel free to explore the inventory management features on your own!"
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Fallback responses when API is not available
  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("add") && lowerMessage.includes("item")) {
      return "To add a new item:\n1. Click 'Add Item' in the navigation\n2. Fill in the required fields (name, SKU, description, etc.)\n3. Set the quantity and price\n4. Choose the appropriate status\n5. Click 'Add Item' to save"
    }

    if (lowerMessage.includes("search")) {
      return "You can search for items using:\n• The search bar on the Inventory page\n• Press Ctrl+K for quick search\n• Search by name, description, SKU, category, or supplier\n• Use the status filter to narrow results"
    }

    if (lowerMessage.includes("status")) {
      return "Item statuses:\n• In Stock: Items available for sale\n• Low Stock: Items running low (yellow warning)\n• Ordered: Items that have been reordered\n• Discontinued: Items no longer available"
    }

    if (lowerMessage.includes("edit") || lowerMessage.includes("update")) {
      return "To edit an item:\n1. Go to the Inventory page\n2. Find the item you want to edit\n3. Click the blue 'Edit' button\n4. Update the fields as needed\n5. Click 'Update Item' to save changes"
    }

    if (lowerMessage.includes("delete")) {
      return "To delete an item:\n1. Go to the Inventory page\n2. Find the item you want to delete\n3. Click the red trash icon\n4. Confirm deletion in the popup dialog"
    }

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! I'm here to help you with your inventory management. You can ask me about:\n• Adding or editing items\n• Understanding item statuses\n• Search and filtering features\n• Best practices for inventory management\n\nWhat would you like to know?"
    }

    return null
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
    const currentMessage = inputMessage
    setInputMessage("")

    const aiResponse = await getAIResponse(currentMessage)

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
      {/* Chat Toggle Button - Extra Large */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all duration-300 hover:scale-110 z-50 w-16 h-16 flex items-center justify-center"
        title="Open AI Assistant"
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-medium">Inventory Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
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
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {import.meta.env.VITE_GEMINI_API_KEY
                ? "✅ AI Assistant Ready (Gemini 1.5 Flash)"
                : "⚠️ Add VITE_GEMINI_API_KEY to enable AI features"}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot
