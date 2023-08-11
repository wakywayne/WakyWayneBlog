---
title: "Cool Font Effects"
date: "August 10, 2023"
excerpt: "Use this to spice up your pages fonts"
cover_image: ""
category: "Styles"
author: "WayneCarl"
author_image: "/images/wayneswildworldImages/waterfall.jpg"
---

# Cool font effects
*code below explanations*

Subtle Text Shadow:
Apply a slight shadow behind your text to create depth and make it stand out from the background:

Glowing Text:
Add a soft glow effect around your text:

Inset Text Shadow:
Give your text an inset shadow for a subtle engraved effect:

Neon Text:
Create a neon-like effect with a vibrant color and slight blur:

Embossed Text:
Mimic an embossed effect with a combination of shadows:

3D Extrusion:
Create a 3D-like extrusion effect with multiple shadow layers:

Animated Shadow:
Apply an animated shadow effect to create movement:

Underline and Glow:
Combine an underline effect with a subtle glow for links:

Rainbow Text:
Create a rainbow effect by applying different colors in a repeating pattern:

Transparent Text Background:
Apply a semi-transparent background behind the text for added contrast:

```css
.textGlow {
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
}

.textShadow {
  color: black;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
}

.textInsetShadow {
  color: white;
  text-shadow: none; /* Clear any existing text shadows */
  background-color: rgba(255, 0, 0, 0.2); /* Background color for contrast */
  padding: 0.2em; /* Add padding to separate text from background */
  box-shadow: inset 3px 3px 3px rgba(255, 0, 0, 0.8);
}

.textNeon {
  color: #00ff00; /* Neon green text color */
  text-shadow: 0px 0px 10px rgba(0, 255, 0, 0.8);
}

.embossedText {
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.8), -1px -1px 0px rgba(0, 0, 0, 0.3);
}

.threeDtext {
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 2px 2px 2px rgba(0, 0, 0, 0.2);
}

@keyframes shadow-pulse {
  0% {
    text-shadow: 0px 0px 20px rgba(255, 0, 0, 0.5);
  }
  50% {
    text-shadow: 0px 0px 30px rgba(255, 0, 0, 1);
  }
  100% {
    text-shadow: 0px 0px 20px rgba(255, 0, 0, 0.5);
  }
}

.animatedShadowText {
  font-weight: bold;
  font-family: Arial, sans-serif;
  animation: shadow-pulse 5s infinite;
}

.underlineGlowText {
  text-decoration: underline;
  text-shadow: 0px 0px 5px rgba(0, 0, 255, 0.5);
}

.rainbowText {
  background-image: linear-gradient(
    45deg,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  background-clip: text;
  color: transparent;
}

.textTransparentBackground {
  background-color: rgba(
    173,
    216,
    230,
    0.7
  ); /* Light blue transparent background */
  padding: 0.2em; /* Add padding to separate text from background */
  color: black; /* Text color */
}

/* This givest text the background image we used */
.textBackgroundImage {
  background-image: url("/images/wakywayne_cool_background_pattern_for_a_website_brand_that_runs_43d82fd5-4152-4713-a242-2d40c5fed12d.png");
  background-size: cover;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 900;
}

.letterBorder {
  font-size: 36px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  color: white;
  -webkit-text-stroke: 2px #000; /* for Chrome and Safari */
  text-stroke: 2px #000; /* for other browsers */
  -webkit-text-fill-color: white; /* for Chrome and Safari */
  text-fill-color: transparent; /* for other browsers */
  text-align: center;
  text-wrap: balance;
}
```

