import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // 1. Import React Query
import { CartProvider } from './Context/Cartcontext.jsx'
import WishlistProvider from './Context/Whislistcontext.jsx'
import FilterProvider from './Context/FilteterContext.jsx'
import './index.css'
import App from './App.jsx'
import { Authprovider } from './Context/AuthContext.jsx'

// 2. Create a client instance
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
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
  </StrictMode>
)