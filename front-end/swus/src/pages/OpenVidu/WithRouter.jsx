import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
//class component에서 useNavigate 사용하기 위한 HOC

const WithRouter = (WrappedComponent) => {
  const Component = (props) => {
    const navigate = useNavigate();
    //원하는 훅 선언
    return <WrappedComponent {...props} {...{ navigate }} />;
  };

  //전달할 훅들 다열
  // return <WrappedComponent {...props} {...{ navigate }} />;
};

export default WithRouter;
