import { ComponentProps, FC } from "react";

interface ReactionTypes {
  maxExtent: String | Number;
}

const Reaction = ({ children }: ComponentProps<FC<ReactionTypes>>) => {
  return <div>{children}</div>;
};

export default Reaction;
