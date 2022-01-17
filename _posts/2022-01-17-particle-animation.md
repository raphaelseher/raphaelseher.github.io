---
layout: post
title: "CSS Planet Moving Animation"
tags: scss animation html web
---

In school I learned css and after that I never used so much css, that I looked into modern styling
solutions. So while thinking about the design of this blog, I wanted to have animated stars and
planets.

Best solution I found was with scss and mininmal Javascript.

### TLDR, just let me copy

`app.js`

```js
window.addEventListener(
  "scroll",
  () => {
    const scrollOffset =
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    console.log("ScrollOffset ", scrollOffset);
    document.body.style.setProperty("--scroll", scrollOffset);
  },
  false
);
```

`app.scss`

```scss
@function particles($max, $color) {
  $val: 0px 0px $color;
  @for $i from 1 through $max {
    $val: #{$val}, random($particle-spacing-x) + px random($particle-spacing-y) + px $color;
  }
  @return $val;
}

@mixin particles($max, $color) {
  box-shadow: particles($max, $color);
}

.particle-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: $nav-particles-index;
}

.particle {
  animation: planetMoving 1s linear 1;
  animation-delay: calc(var(--scroll) * -1s);
  animation-play-state: paused;
  animation-fill-mode: forwards;
}

.particle:after {
  position: absolute;
  content: "";
  top: 0;
}

.particle-1 {
  @include particles(400, $color-particles-1);
  width: 2px;
  height: 2px;
}

.particle-2 {
  @include particles(100, $color-particles-1);
  width: 2px;
  height: 2px;
}

.particle-3 {
  @include particles(500, $color-particles-1);
  width: 2px;
  height: 2px;
}

.particle-4 {
  @include particles(200, $color-particles-1);
  width: 2px;
  height: 2px;
}

.particle-1:after {
  @include particles(400, $color-particles-2);
  width: 1px;
  height: 1px;
}

.particle-2:after {
  @include particles(200, $color-particles-2);
  width: 1px;
  height: 1px;
}

.particle-3:after {
  @include particles(500, $color-particles-2);
  width: 3px;
  height: 3px;
}

.particle-4:after {
  @include particles(200, $color-particles-2);
  width: 3px;
  height: 3px;
}
```

### Details

First of all we use scss mixin and a function to create a lot of drop shadows. To create the
effect of distance between the stars we just create different particles with differnt counts and
sizes.

```scss
$particle-spacing-x: 769px;
$particle-spacing-y: 2000px;

@function particles($max, $color) {
  $val: 0px 0px $color;
  @for $i from 1 through $max {
    $val: #{$val}, random($particle-spacing-x) + px random($particle-spacing-y) + px $color;
  }
  @return $val;
}

@mixin particles($max, $color) {
  box-shadow: particles($max, $color);
}

.particle-1 {
  @include particles(400, $color-particles-1);
  width: 2px;
  height: 2px;
}
```

The animation while scrolling is just a transform on the Y axis. With the javascript updated
`--scroll` as the animation delay.

```javascript
window.addEventListener(
  "scroll",
  () => {
    const scrollOffset =
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    console.log("ScrollOffset ", scrollOffset);
    document.body.style.setProperty("--scroll", scrollOffset);
  },
  false
);
```

```scss
@keyframes planetMoving {
  to {
    transform: translateY(-600%);
  }
}

.particle {
  animation: planetMoving 1s linear 1;
  animation-delay: calc(var(--scroll) * -1s);
  animation-play-state: paused;
  animation-fill-mode: forwards;
}
```

The different scrolling speeds same animated planets and the stars is caused by the difference in
their position on screen. The particles are just next to each other and so their translation is
minimal.

For people using _reduced motion_ I just deactivate the animation.

```scss
@media (prefers-reduced-motion) {
  .planet {
    animation: none;
  }

  .particle {
    animation: none;
  }
}
```
