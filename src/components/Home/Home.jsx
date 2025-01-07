import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token"); // Example auth check

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <Login />
    </div>
  );
};

export default Home;
