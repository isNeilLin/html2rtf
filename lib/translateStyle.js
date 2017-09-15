const toRGB = (color)=>{
    let hex = color.slice(1,color.length-1);
    let r = hex.slice(0,2),
        g = hex.slice(2,4),
        b = hex.slice(4,6);
    r = parseInt(r,16);
    g = parseInt(g,16);
    b = parseInt(b,16);
    return {
        r,g,b
    }
}
const createColorTable = (color)=>{
    let colorTable = `\\red${color.r}\\green${color.g}\\blue${color.b}`
    return colorTable;
}

module.exports = {
    getFontSizeRTF(size){
        size = parseFloat(size);
        let sizeRTF = '\\fs'+Math.trunc(size*1.25);
        return sizeRTF;
    },
    getLineHeightRTF(lineHeight){
        let lineHeightRTF = '\\sl'+(lineHeight*200);
        return lineHeightRTF;
    },
    getMarginTopRTF(margin){
        margin = parseFloat(margin);
        let marginRTF = '\\sa'+(margin*300);
        return marginRTF;
    },
    getTextIndentRTF(indent){
        if(indent=='2em'||indent=='space'){
            indent = parseFloat(indent);
            let indentRTF = '\\fi'+(margin*300)+' ';
            return indentRTF;
        }else{
            return '';
        }
    },
    getColorRTF(color){
        let colorObj = {};
        if(color.includes('#')){
            colorObj = toRGB(color);
        }else if(color.includes('rgb')){
            let colors = color.match(/([\d]{1,3})/g);
            colorObj = {
                r: ~~colors[0],
                g: ~~colors[1],
                b: ~~colors[2]
            }
            console.log(colorObj)
        }else{
            return '';
        }
        let colorTable = createColorTable(colorObj)
        return colorTable;
    }
}