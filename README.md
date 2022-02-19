### Add fading reactions to an element in your react projects.

Easy and simple to use 😊
Simply import or require the component like so:
```js
import { Reaction } from "reaction-react"
```

And wrap it around the element you want to apply the animation to like so:

```js
<Reaction maxExtent={300} duration={2000}>
    <span style={{ cursor: "pointer", fontSize: "30px" }}>🔥</span>
</Reaction>
```

# Props 

| Property  | Description                                                          | Default | type   | Unit         |
|-----------|----------------------------------------------------------------------|---------|--------|--------------|
| maxExtent | This refers to the maximum height the element will animate to.       | 300     | number | px           |
| duration  | This is the time it will take for the element to reach the maxExtent | 2000    | number | milliseconds |