---
title: 'Implement a rich text editor on your website'
date: 'September, 14, 2022'
excerpt: 'A rich text editor allows people to style text before submitting'
cover_image: '/images/posts/img5.jpg'
category: 'Utilities'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Basic Outline
### You only have to do the dynamic import in nextJS

```javascript
import React from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

const MyComponent = ({ width,
    name,
    setContents,
    placeholder,
    defaultValue,
    onChange }) => {

    const ButtonCustomList = [
        ['undo', 'redo'],
        ['font', 'fontSize'],
        ['bold', 'underline', 'italic',],
        ['removeFormat'],
        ['fontColor', 'hiliteColor'],
        ['outdent', 'indent'],
        ['align', 'list'],
        ['link'],
        ['fullScreen',]
    ];
    return (
        <div>
            <p> My Other Contents </p>
            <SunEditor
                width={width}
                name={name}
                setContents={setContents}
                // what the value should be ex. state
                placeholder={placeholder}
                defaultValue={defaultValue}
                // I just make it the same as state
                onChange={onChange}
                // text => setValues((prevState) => ({ ...prevState, description: text }))
                setOptions={{
                    buttonList: ButtonCustomList,
                    fontSize: [16, 18, 20, 22, 24, 26, 28, 36, 48, 72],
                    height: 200,
                }} />
        </div>
    );
};
export default MyComponent;
```

# You will probably need to use html-react-parser and isomorphic-dompurify
**see those articles in the Utilities category**