const htmlParser = require('fast-html-parser');
const urlencode = require('urlencode');
const customTagMap = require('./customTagMap');
const translateStyle = require('./translateStyle');
var style = '';
const encodeText = (text)=>{
    text = text.replace(/&emsp;&emsp;/g,function(){
        return ''
    })
    let reg = new RegExp('[\\u4E00-\\u9FFF]','g');
    if(!reg.test(text)){
        return text;
    }
    let gbk = urlencode(text,'GBK');
    gbk = gbk.replace(/%/g,'\\\'');
    return gbk;
}
const matchTag = (node)=>{
    let blockTags = ['div','p','h1','h2','h3','h4','h5','h6'],
        markTags = ['b','i','u','sub'],
        customTags = ['a','ol','ul','li','center','table','td','th','tr','sup'];
    let tag = node.tagName;
    let str = '';
    if(blockTags.includes(tag)){
        str = getTagRTF(node,'{\\pard ','\\sb70\\par}')
    }else if(markTags.includes(tag)){
        str = getTagRTF(node,`{\\${tag}`,'}')
    }else if(customTags.includes(tag)){
        let custom = customTagMap[tag];
        custom.init && custom.init(node);
        str = getTagRTF(node,custom.start,custom.end);
    }else{
        str = getTagRTF(node)
    }
    return str
}
const matchStyle = (node)=>{
    if(!node.rawAttrs){
        return
    }
    let attrs = node.attributes;
    let style = attrs.style;
    let styleRTF = getStyleRTF(style);
    return styleRTF;
}
const getTagRTF = (node,start,end)=>{
    let str = '';
    start = start || '';
    end = end || '';
    style = matchStyle(node) ? matchStyle(node) : style;
    if(!node.childNodes||node.childNodes.length===0){
        if(node.rawText&&node.rawText!=='&emsp;&emsp;'){
            console.log(style)
            str += start + style
            let text = encodeText(node.rawText)
            str += `${text}${end}`;
        }
    }else{
        str += start
        let childNodeStr = mapNode(node.childNodes);
        if(childNodeStr){
            str = str + childNodeStr + end;
        }else{
            str = ''
        } 
    }
    return str
}
const getStyleRTF = (style)=>{
    let styleObj = parseStyle(style);
    let str = '';
    let fontSize = styleObj['font-size'],
        lineHeight = styleObj['line-height'],
        marginTop = styleObj['margin-top'],
        textIndent = styleObj['text-indent'],
        color = styleObj['color'];
    str += fontSize ? translateStyle.getFontSizeRTF(fontSize) : '';
    str += lineHeight ? translateStyle.getLineHeightRTF(lineHeight) : '';
    str += marginTop ? translateStyle.getMarginTopRTF(marginTop) : '';
    str += textIndent ? translateStyle.getTextIndentRTF(textIndent) : '';
    // str += color ? translateStyle.getColorRTF(color) : '';
    return str;
}
const parseStyle = (style)=>{
    let styles = style.split(';');
    let styleObj = {};
    for(let stringStyle of styles){
        if(stringStyle){
            let splitStyle = stringStyle.split(':');
            styleObj[splitStyle[0].trim()] = splitStyle[1].trim();
        }
    }
    return styleObj;
}
const mapNode = (nodes)=>{
    let str = ''
    for(let node of nodes){
        str += matchTag(node);
    }
    return str;
}
const transHtml = (html)=>{
    let rtf_str = "{\\rtf1\\ansi\\ansicpg936\\cocoartf1504\\cocoasubrtf830{\\fonttbl {\\f0 \\fnil \\fcharset134 }}{\\colortbl;\\red255\\green255\\blue255;\\red246\\green250\\blue211;}"
    let document = htmlParser.parse(html);
    let result = mapNode(document.childNodes);
    rtf_str = rtf_str + result + "\\par}";
    return rtf_str;
}
module.exports = transHtml;
