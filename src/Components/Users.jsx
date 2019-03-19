import { User } from "lucide-react"

function Users() {
  return (
    <div>
      <button title="Profile" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <User size={24} color="#333" />
      </button>
    </div>
  )
}

export default Users