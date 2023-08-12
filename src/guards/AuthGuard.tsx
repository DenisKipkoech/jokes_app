import React, { ReactNode, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const navigate = useNavigate();

  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("key") || null;
    if (token === null) {
      navigate("/login");
    } else {
      setAuthenticated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [isAuthenticated]);

  return <>{children}</>;
}
