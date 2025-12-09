import "./style.scss";
import { FaTasks } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <div className="header-left">
        <FaTasks size={24} color="var(--primary-color)" />
        <h1>Task Management</h1>
      </div>
      <div>
        <img
          src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740&q=80"
          alt="profile"
        />
      </div>
    </header>
  );
};

export default Header;
