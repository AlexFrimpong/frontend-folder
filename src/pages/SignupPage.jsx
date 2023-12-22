import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignUp from "../components/Signup/Signup";

const SignupPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (user && isLoggedIn) {
      navigate("/signup");
    }
  }, [navigate])
  return (
    <div>
      <SignUp />
    </div>
  )
}

export default SignupPage