import React from "react";
import ReactDOM from "react-dom";

import { Reaction } from "./components/reaction";

ReactDOM.render(
  <React.StrictMode>
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Reaction maxExtent={300} duration={2000}>
        <span style={{ cursor: "pointer", fontSize: "30px" }}>❤️</span>
      </Reaction>
      <span style={{ width: "20px" }} />
      <Reaction maxExtent={300} duration={2000}>
        <span style={{ cursor: "pointer", fontSize: "30px" }}>🔥</span>
      </Reaction>
      <span style={{ width: "20px" }} />
      <Reaction maxExtent={300} duration={2000}>
        <span style={{ cursor: "pointer", fontSize: "30px" }}>Ok!</span>
      </Reaction>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
