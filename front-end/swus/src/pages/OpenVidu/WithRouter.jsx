import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
//class component에서 useNavigate 사용하기 위한 HOC

function WithRouter(Component) {
  //원하는 훅 선언
  const navigate = useNavigate();

  //전달할 훅들 나열
  return (props) => <Component {...props} {...{ navigate }} />;
}

export default WithRouter;
