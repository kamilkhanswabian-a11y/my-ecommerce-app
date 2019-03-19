import { Link } from "react-router";
function Signupbutton() {
  return (
    <div>
      <Link to="/Sign-up">
      <button className="font-body text-sm font-medium tracking-wide bg-slate-950 text-white px-3 py-2 rounded-lg shadow-sm hover:bg-slate-800 hover:shadow-md active:scale-95 transition-all duration-200">
        Sign up
      </button>
      </Link>
    </div>
  )
}

export default Signupbutton;