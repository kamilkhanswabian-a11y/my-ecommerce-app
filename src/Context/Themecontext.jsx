import { createContext } from "react";


export const Themecontext =  createContext(null);


export default function ThemeProvider({children}) {
    const [darkMode, setdarkMode] = useState(false)
    
    return (
          <Themecontext value={{}}>
                       {children}
          </Themecontext>
    )
}