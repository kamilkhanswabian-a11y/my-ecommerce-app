import { Link } from "react-router";
import Button from "./Button";
function Signupbutton() {
  return (
    <div>
      <Button className="bg-black text-white p-2 px-4 rounded-lg">
          <Link to="/Sign-up">
              Sign Up
          </Link>
      </Button>
    </div>
  )
}

export default Signupbutton;