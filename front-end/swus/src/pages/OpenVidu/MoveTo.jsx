import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function MoveTo(props) {
  const [url, setUrl] = useState(props.nav);
  const navigate = useNavigate();
  navigate(`${url}`);

  return <></>;
}

export default MoveTo;
