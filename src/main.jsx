import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'  // ← Import BrowserRouter
import { CartProvider } from './Context/Cartcontext.jsx'
import WishlistProvider from './Context/Whislistcontext.jsx'
import FilterProvider from './Context/FilteterContext.jsx'
import './index.css'
import App from './App.jsx'
import { Authprovider } from './Context/AuthContext.jsx'

// Create a client instance
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* ← Wrap everything with BrowserRouter */}
      <Authprovider>
        <QueryClientProvider client={queryClient}>
          <FilterProvider>
            <CartProvider>
              <WishlistProvider>
                <App />
              </WishlistProvider>
            </CartProvider>
          </FilterProvider>
        </QueryClientProvider>
      </Authprovider>
    </BrowserRouter>
  </StrictMode>
)