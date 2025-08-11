import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRouteP({ children, msg, redirect }) {
  // console.log(msg);
  // console.log(redirect);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin", { state: { msg, redirect } });
    }
  }, [user]);

  return children;
}