import { ComponentProps, FC, useEffect, useState } from "react";

interface ReactionTypes {
  direction: String;
  maxExtent: String | Number;
}

const Reaction = ({ children }: ComponentProps<FC<ReactionTypes>>) => {
  let [items, setItems] = useState<JSX.Element[]>([]);

  let handleClick = () => {
    let itemsCpy = [...items];
    itemsCpy.push(<ReactionItem children={children} index={itemsCpy.length} />);
    setItems(itemsCpy);
  };

  return (
    <div onClick={() => handleClick()} style={{ position: "relative" }}>
      {children}
      {items}
    </div>
  );
};

let ReactionItem = ({
  children,
  index,
}: ComponentProps<FC<{ index: number }>>) => {
  let startTimeStamp: any;
  //   let previousTimeStamp = 0;
  let [margin, setMargin] = useState(0);

  useEffect(() => {
    requestAnimationFrame(animationStep);
  }, []);

  let animationStep = (time: number) => {
    if (startTimeStamp == null) {
      startTimeStamp = time;
    }

    setMargin(margin - 0.1);

    let timeElapsed = time - startTimeStamp;

    if (timeElapsed < 3000) {
      console.log("TIME ELAPSED", time, index);
      requestAnimationFrame(animationStep);
    }
  };

  return <div style={{ position: "absolute", top: margin }}>{children}</div>;
};

export default Reaction;
