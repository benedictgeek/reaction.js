import React from "react";
import ReactDOM from "react-dom";
import { ComponentProps, FC, useEffect, useState } from "react";

//TODO: add a little animation to jiggle the reaction item

interface ReactionTypes {
  //TODO:   direction?: string;
  maxExtent?: number;
  duration?: number;
  amplitude?: number;
}

const Reaction = ({
  children,
  maxExtent = 300,
  duration = 2000,
  amplitude = 2,
  ...props
}: ComponentProps<FC<ReactionTypes>>) => {
  const itemsBreakPoint = 30;
  let [items, setItems] = useState<JSX.Element[]>([]);

  let handleClick = () => {
    let itemsCpy = [...items];
    if (itemsCpy.length < itemsBreakPoint) {
      itemsCpy.push(
        <ReactionItem
          key={Date.now() * Math.random()}
          children={children}
          index={itemsCpy.length}
          onFinish={(index) => removeItem(index)}
          maxExtent={maxExtent}
          duration={duration}
          amplitude={amplitude}
          {...props}
        />
      );
      setItems(itemsCpy);
    }
  };

  let removeItem = (index?: number) => {
    let itemsCpy = [...items];
    if (itemsCpy.length === itemsBreakPoint - 1) {
      setItems([]);
    }
  };

  return (
    <div
      role="reaction"
      onClick={() => handleClick()}
      style={{ position: "relative" }}
    >
      {children}
      {items}
    </div>
  );
};

let ReactionItem = ({
  children,
  index,
  maxExtent,
  duration,
  amplitude,
  onFinish,
}: ComponentProps<
  FC<{ index: number; onFinish: (index?: number) => void } & ReactionTypes>
>) => {
  let [margin, setMargin] = useState(0);
  let [opacity, setOpacity] = useState(1);
  let [moveFactor, setMoveFactor] = useState(0);
  const converterFactor = 10;
  let startTimeStamp: any;
  let maxExtentStep = (Number(maxExtent) * converterFactor) / Number(duration);
  let opacityStep = (maxExtentStep * converterFactor) / Number(duration);
  let animationFrameId: number;

  useEffect(() => {
    animationFrameId = requestAnimationFrame(animationStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  let animationStep = (time: number) => {
    if (startTimeStamp == null) {
      startTimeStamp = time;
    }

    setMargin((_margin) => _margin - maxExtentStep);
    setOpacity((_opacity) => _opacity - opacityStep);

    let timeElapsed = time - startTimeStamp;

    let computedExtent = Math.min(
      (maxExtentStep * timeElapsed) / converterFactor,
      Number(maxExtent)
    );

    setMoveFactor(
      Number(amplitude) * Math.cos(computedExtent * converterFactor)
    );

    if (computedExtent === Number(maxExtent)) {
      setOpacity(0);
      onFinish(index);
    }

    if (timeElapsed < Number(duration)) {
      animationFrameId = requestAnimationFrame(animationStep);
    }
  };

  return (
    <div
      role="reactionItem"
      // className="reactionItem"
      style={{
        position: "absolute",
        top: margin,
        left: moveFactor,
        opacity: opacity,
        zIndex: -1,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export { Reaction };
export default Reaction;

// import { Reaction } from "./components/index";

// ReactDOM.render(
//   <React.StrictMode>
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Reaction maxExtent={300} duration={2000} amplitude={2}>
//         <span style={{ cursor: "pointer", fontSize: "30px" }}>❤️</span>
//       </Reaction>
//       <span style={{ width: "20px" }} />
//       <Reaction maxExtent={300} duration={2000} amplitude={2}>
//         <span style={{ cursor: "pointer", fontSize: "30px" }}>🔥</span>
//       </Reaction>
//       <span style={{ width: "20px" }} />
//       <Reaction maxExtent={300} duration={2000} amplitude={2}>
//         <span style={{ cursor: "pointer", fontSize: "30px" }}>Ok!</span>
//       </Reaction>
//     </div>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
