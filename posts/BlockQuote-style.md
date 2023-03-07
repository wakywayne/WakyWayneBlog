---
title: 'Styling for a blockquote'
date: 'September 22, 2022'
excerpt: 'Use this for important paragraphs and quotes'
cover_image: ''
category: 'Styles'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# A complex version that might have trouble being squeezed into a layout
**Good for using colors**

```css
  /* blockquote */
  #myBlockQuote {
    background: #fff;
    padding: 15px 20px 15px 45px;

    /*Font*/
    font-family: Georgia, serif;
    font-size: 16px;
    line-height: 1.8;
    color: rgb(72, 72, 72);


    /*Borders - (Optional)*/
    border-left: 10px solid #0de726;
    border-right: 2px solid #0de726;

    /*Box Shadow - (Optional)*/
    -moz-box-shadow: 2px 2px 15px rgb(135, 135, 135);
    -webkit-box-shadow: 2px 2px 15px rgb(135, 135, 135);
    box-shadow: 2px 2px 15px rgb(135, 135, 135);
  }

  #myBlockQuote::before {
    content: "\201C";
    /*Unicode for Left Double Quote*/

    /*Font*/
    font-family: Georgia, serif;
    font-size: 60px;
    font-weight: bold;
    color: #999;

    /*Positioning*/
    position: absolute;
    left: 10px;
    top: 5px;
  }

  #myBlockQuote::after {
    /*Reset to make sure*/
    content: "";
  }

  #myBlockQuote a {
    text-decoration: none;
    background: #eee;
    cursor: pointer;
    padding: 0 3px;
    color: #0de726;
  }

  #myBlockQuote a:hover {
    color: #666;
  }

  #myBlockQuote em {
    font-style: italic;
  }
```

# Another basic version
[**By Chris Coyier](https://css-tricks.com/snippets/css/simple-and-nice-blockquote-styling/)

```css
blockquote {
  background: #f9f9f9;
  border-left: 10px solid #ccc;
  margin: 1.5em 10px;
  padding: 0.5em 10px;
  quotes: "\201C""\201D""\2018""\2019";
}
blockquote:before {
  color: #ccc;
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}
blockquote p {
  display: inline;
}
```

# Eye awe/ eye catching version
[by James LePage](https://isotropic.co/the-best-css-styling-for-blockquotes/)

```html
<div class="background"></div>

<div class="quote">
  <div class="line"></div>
  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/277/first-quote_1.png" />
  <div class="line"></div>
</div>
```


```css
.background {
  position: absolute;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/277/Underwater-Stars.jpg');
  background-size: cover;
  height: 100%;
  width: 100%;
  opacity: 0.3;
}

.quote {
  -webkit-transition: all 900ms cubic-bezier(0.165, 0.84, 0.44, 1);
  -moz-transition: all 900ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 900ms cubic-bezier(0.165, 0.84, 0.44, 1);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -275px;
  margin-top: -120px;
  opacity: 0;
}

.line {
  -webkit-transition: width 900ms cubic-bezier(0.165, 0.84, 0.44, 1);
  -moz-transition: width 900ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: width 900ms cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 0px;
  height: 1px;
  background: #fff;
  margin: auto;
  margin-bottom: 12px;
  margin-top: 18px;
}

.quote.active {
  -webkit-transform: translateY(-30px);
  -moz-transform: translateY(-30px);
  transform: translateY(-30px);
  opacity: 1;
}

.quote.active .line {
  width: 100px;
}

img {
    -webkit-animation: adjustHue 10s infinite;
    -moz-animation: adjustHue 10s infinite;
    animation: adjustHue 10s infinite;
}

@-webkit-keyframes adjustHue { 
  50% {
    -webkit-filter: saturate(150%) hue-rotate(-35deg);
  }
}

@-moz-keyframes adjustHue { 
  50% {
    -moz-filter: saturate(150%) hue-rotate(-35deg);
  }
}

@keyframes adjustHue { 
  50% {
    filter: saturate(150%) hue-rotate(-35deg);
  }
}
```
