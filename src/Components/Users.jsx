import { User } from "lucide-react"
import { Link } from "react-router"

function Users() {
  return (
    <div>
      <Link to="/Profile">
      <button title="Profile" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <User size={24} color="#333" />
      </button>
      </Link>
    </div>
  )
}

export default Users