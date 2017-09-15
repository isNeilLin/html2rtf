# html2rtf


## install

`npm install html2rtf --save`
or
`yarn add html2rtf`

## Example

```javascript
const html2rtf = require('html2rtf');
const path = require('path');
const filename = path.join(__dirname,'example.rtf');
const html = `<div>
    <p>Welcome to RTF!</p>
    <p>This is a example</p>
</div>`;
html2rtf(html,filename).then(res=>{
    console.log('done')
}).catch(e=>{
    console.log(e)
})
```

## Support Tags

`'div','p','h1','h2','h3','h4','h5','h6','a','ol','ul','li','center','table','td','th','tr','sup','b','i','u','sub'`

## Support Styles

`font-size, line-height, margin-top, text-indent`

## TODO

support `color`
