import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from "../components/Login/Login";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (user && isLoggedIn) {
      navigate("/");
    }
  }, [navigate])

  return (
    <div>
      <Login />
    </div>
  )
}

export default LoginPage;