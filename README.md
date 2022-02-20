### Add fading reactions to an element in your react projects.

Easy and simple to use 😊 
![Reaction gif](https://media.giphy.com/media/NkVMtDIofPLqJruaqq/giphy.gif)
Simply import or require the component like so:

```js
import { Reaction } from "reaction-react";
```

And wrap it around the element you want to apply the animation to like so:

```js
<Reaction maxExtent={300} duration={2000} amplitude={2}>
  <span style={{ cursor: "pointer", fontSize: "30px" }}>🔥</span>
</Reaction>
```

# Props

| Property  | Description                                                                                                       | Default | type   | Unit         |
| --------- | ----------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------------ |
| maxExtent | This refers to the maximum height the element will animate to.                                                    | 300     | number | px           |
| duration  | This is the time it will take for the element to reach the maxExtent                                              | 2000    | number | milliseconds |
| amplitude | Set the extent to with the element animates horizontally while going up to maxExtent. Use 0 to remove this effect | 2       | number | milliseconds |
