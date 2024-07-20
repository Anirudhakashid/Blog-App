import React from "react";

function Container({ children , ...props}) {
  return <div className="w-full max-w-7xl mz-auto px-4  ">{children} </div>;
}

export default Container;
