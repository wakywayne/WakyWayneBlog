---
title: 'Tailwind'
date: 'September 14, 2022'
excerpt: 'This article will cover everything I have learned about tailwind'
cover_image: ''
category: 'Styles'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---
<!-- Markdown generator - https://jaspervdj.be/lorem-markdownum/ -->

# Tailwind

# Set Up
1. Go to docs follow installation commands
2. npx tailwindcss init -p *This makes your customization files*
3. In your global styles file: @tailwind base; @tailwind components; @tailwind utilities;

# Rules
- If you want to dynamically add a class via javascript you must add safelist
```javascript
  safelist: [
    'bg-yellow-600',
    'bg-blue-600',
    'bg-green-600',
    'bg-purple-600',
    'bg-red-600',
          ]
```

# Customization
**@apply allows you to use tailwind css classes in the customization you can use md: & hover:**

### When customizing you can see the options by going to unpkg.com/tailwindcss
- Then remove everything after the / that comes after the numbers
- then stubs
- then defaultConfig.stubs.js

## Headings
*In css file under your @'s*
```javascript
@layer base{
  h2{
    @apply text-5xl;
  }
  }
  h2{
    @apply text-3xl;
  }
```


## Making breakpoints on screen
1. add require require("tailwind-debug-screens") to plugins
2. In theme add 
```
    debugScreens:{
      position: ['top','left'],
    }  
```
3. In your main body tag add class debug-screens

## Customizing your breakpoints with a container class
tailwind config.js
```javascript
corePlugins:{
  container: false;
},

theme:{
  screen:{
    'tablet':'640px',
    'desktop': '1000px',
  },
}

  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen desktop': {
            maxWidth: '1140px',
          },
        }
      })
    }
  ],
```

## Making Dark Mode Option
**Go to the docs**

## Adding custom fonts
1. create fonts folder
2. In styles 
```javascript
    @layer base{
      @font-face{
        font-family: Oswald;
        src: url(/dist/fonts/Oswald/Oswald-Bold.ttf) format("truetype");
      }
    }
```

3. Under theme in tailwind.config.js
*Under theme*
```javascript
       extend:{
         fontFamily:{
           headline: ['Oswald']
         }
       }
```


## Custom Colors
*Under theme in tailwind.config.js*
```javascript
extend:{
  colors:{
   mainColor:'#3212f49'
  }
}
```

## Building your own palets entirely
1. add full color package
  - in cofig file: const colors = require("tailwindcss/colors") *at the very top*
```javascript
      colors:{
        red: colors.rose,
        gray: colors.blueGray,
      }
```

## Making Custom Container class
*Probably easier to use tailwind css file, but this is an option*
```javascript
container:{
  center: true,
  padding:{
    DAFAULT:'0.5rem',
    sm: '1rem",
    lg: '3.5rem',
    xl: '2rem',
    2xl: '4rem'
  }
}
```
## Typography Plugin
**class prose**

## Making you outsource file 
1. Save tailwind config file and rename it
2. In module.exports
```javascript
    presets: [
      require('./myFileName.js'),
    ]
```

### Casing/ Font
- text
- uppercase lowercase, and capitalize classes available
- underline
- text-xs, sm, base, lg, xl, *xl
- text-justify?
----------------
- font-thin
- font-extralight
- font-light
- font-normal
- font-medium
- font-semibold
- font-bold
- font-extrabold
- font-black

## Line Height
- leading-3 to leading-10
- leading-none
- leading-tight
- leading-snug
- leading-normal
- leading-relaxed
- leading-loose

## Letter spacing
tracking-tightest
tracking-tight
tracking-normal
tracking-wide
tracking-wider
tracking-widest

## Lists
- list-disc *adds bullet points*
- list-inside *bullet points are more inside*

## Sizes
__You can specify specific one off fonts like so: *text-[14px]*__
- *sm, base, lg, xl, 7xl*

# Color
*100 - 900*
## Gradient
**Can use up to 4 colors after gradient bay adding from via and to before the color class**
bg-gradient-to-tr *background gradient towards top right*


# Sizing
- object-none *Default*
- object-cover *Will fill it's parent*
- object-contain *Will fill not fill*
- object-fill *Stretch an element’s content to fit its container using*
- object-scale-down *Display an element’s content at its original size but scale it down to fit its container if necessary using*
## width
- w-full
- w-max *Makes it so that the button or whatever grows to the content, but not more
#### Fractions
- */12


# Positioning
## FlexBox
### Direction
- flex-col
- flex-row
### Position
- items-center
- justify-between   
- mx-auto *center* 

### Padding and Margin
*Numbers 1-100*

## Grid
### Using useful utility class
**yarn add -D @shrutibalasa/tailwind-grid-auto-fit**
```javascript
// in tailwind.config.js
plugins: [require('@shrutibalasa/tailwind-grid-auto-fit')],
)]
```

*What is going on under the hood*
```css
.container{
  display: grid; /*You must apply this before using package*/
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 2; /*You must apply this before using package*/
}
```

    
# Styling
### Shadows
- shadow-sm
- shadow-md
- shadow-outline

## Containers
- border-rounded
- rounded-full *Makes circle*
- border-b-4
- border-gray-500
- ring *Good for buttons*

# Responsiveness
*sm: md: lg: xl:* 

# Effects
- transition
- duration-500 
- ease