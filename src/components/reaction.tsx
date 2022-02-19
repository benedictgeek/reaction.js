import { ComponentProps, FC, useEffect, useState } from "react";

//TODO: add a little animation to jiggle the reaction item
//TODO: make the movement sinusodial

interface ReactionTypes {
  //TODO:   direction?: string;
  maxExtent: number;
  duration: number;
}

export const Reaction = ({
  children,
  maxExtent = 300,
  duration = 2000,
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
    <div onClick={() => handleClick()} style={{ position: "relative" }}>
      {children}
      {items}
    </div>
  );
};

Reaction.defaultProps = { maxExtent: 300, duration: 2000 };

let ReactionItem = ({
  children,
  index,
  maxExtent,
  duration,
  onFinish,
}: ComponentProps<
  FC<{ index: number; onFinish: (index?: number) => void } & ReactionTypes>
>) => {
  let [margin, setMargin] = useState(0);
  let [opacity, setOpacity] = useState(1);

  let startTimeStamp: any;
  let maxExtentStep = (maxExtent * 10) / duration;
  let opacityStep = (maxExtentStep * 10) / duration;
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
      (maxExtentStep * timeElapsed) / 10,
      maxExtent
    );

    if (computedExtent === maxExtent) {
      setOpacity(0);
      onFinish(index);
    }

    if (timeElapsed < duration) {
      animationFrameId = requestAnimationFrame(animationStep);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: margin,
        opacity: opacity,
        zIndex: -1,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default Reaction;
