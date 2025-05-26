# 📦 Inventory Management System

A modern, full-featured inventory management application built with React, Vite, and Tailwind CSS. Features real-time CRUD operations, intelligent search & filtering, status management, and an AI-powered chatbot assistant using Google Gemini.

![Inventory Management System](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-4.5.0-green) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.5-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🔄 **Complete CRUD Operations**
- **Create**: Add new inventory items with comprehensive forms
- **Read**: View all items in responsive grid/card layouts
- **Update**: Edit existing items with pre-populated data
- **Delete**: Remove items with confirmation dialogs

### 📊 **Smart Status Management**
- **In Stock**: Items available for sale (Green)
- **Low Stock**: Items running low on inventory (Yellow)
- **Ordered**: Items that have been reordered (Purple)
- **Discontinued**: Items no longer available (Red)

### 🔍 **Advanced Search & Filtering**
- Real-time search by item name, description, or SKU
- Filter by status with visual indicators
- Instant results as you type
- Combined search and filter functionality

### 🤖 **AI-Powered Assistant**
- Google Gemini integration for intelligent responses
- Context-aware inventory management guidance
- Natural language processing for user queries
- Floating chat interface accessible from any page

### 📱 **Modern UI/UX**
- Responsive design for all screen sizes
- Clean, professional interface with Tailwind CSS
- Interactive hover effects and smooth transitions
- Accessibility-focused design with proper ARIA labels

### 💾 **Data Persistence**
- Local storage for data persistence
- Automatic save on every change
- Sample data included for testing

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Google Gemini API key (for AI chatbot)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventory-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatBot.jsx     # AI chatbot component
│   ├── ItemCard.jsx    # Individual item display
│   ├── ItemForm.jsx    # Add/Edit item form
│   ├── Navbar.jsx      # Navigation component
│   ├── SearchBar.jsx   # Search functionality
│   └── StatusFilter.jsx # Status filtering
├── context/            # React Context for state management
│   └── InventoryContext.jsx
├── pages/              # Main application pages
│   ├── Dashboard.jsx   # Overview and statistics
│   ├── InventoryList.jsx # Item listing page
│   ├── AddItem.jsx     # Add new item page
│   └── EditItem.jsx    # Edit existing item page
├── App.jsx             # Main app with routing
├── main.jsx           # React entry point
└── index.css          # Global styles
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 4.5.0
- **Styling**: Tailwind CSS 3.3.5
- **Routing**: React Router DOM 6.20.1
- **Icons**: Lucide React 0.294.0
- **AI Integration**: Google Gemini API
- **State Management**: React Context API
- **Data Storage**: Local Storage

## 📖 Usage Guide

### Dashboard
- View inventory statistics and overview
- Quick access to key metrics (total items, stock levels)
- Status breakdown with visual indicators

### Managing Items

#### Adding Items
1. Navigate to "Add Item" in the navigation
2. Fill in required fields:
   - Item Name
   - SKU (Stock Keeping Unit)
   - Description
   - Quantity
   - Price
   - Category
   - Supplier
   - Status
3. Click "Add Item" to save

#### Editing Items
1. Go to the Inventory page
2. Find the item you want to edit
3. Click the blue "Edit" button
4. Update the fields as needed
5. Click "Update Item" to save changes

#### Deleting Items
1. Go to the Inventory page
2. Find the item you want to delete
3. Click the red trash icon
4. Confirm deletion in the popup dialog

### Search & Filter
- Use the search bar to find items by name, description, or SKU
- Use the status filter dropdown to show only items with specific statuses
- Combine search and filter for precise results

### AI Chatbot
1. Look for the blue chat button in the bottom-right corner
2. Click to open the chat window
3. Ask questions about inventory management
4. Get intelligent responses powered by Google Gemini

#### Example Questions:
- "How do I add a new item?"
- "What does low stock status mean?"
- "How can I search for specific items?"
- "What's the best way to manage inventory levels?"

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI chatbot | Yes |

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

## 🎨 Customization

### Adding New Item Fields
1. Update the form in `src/components/ItemForm.jsx`
2. Modify the context in `src/context/InventoryContext.jsx`
3. Update the display components as needed

### Styling Changes
- Modify `src/index.css` for global styles
- Update Tailwind classes in components for specific styling
- Customize the color scheme in `tailwind.config.js`

### Adding New Status Types
1. Update the status options in `ItemForm.jsx`
2. Add corresponding colors in `ItemCard.jsx`
3. Update the filter options in `StatusFilter.jsx`

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically on every push

### Deploy to Netlify
1. Build the project locally
2. Upload the `dist` folder to Netlify
3. Set up environment variables in Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information
3. Use the AI chatbot for inventory management questions
4. Contact the development team

## 🔮 Future Enhancements

- [ ] Real-time notifications for low stock alerts
- [ ] Barcode scanning integration
- [ ] Export functionality (CSV, PDF)
- [ ] Advanced reporting and analytics
- [ ] Multi-user support with authentication
- [ ] Integration with external APIs (suppliers, shipping)
- [ ] Mobile app version
- [ ] Inventory forecasting with AI

## 📊 Screenshots

### Dashboard
![Dashboard Overview](screenshots/dashboard.png)

### Inventory Management
![Inventory List](screenshots/inventory-list.png)

### AI Chatbot
![AI Assistant](screenshots/chatbot.png)

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

 [live demo](https://your-demo-url.com).
```

