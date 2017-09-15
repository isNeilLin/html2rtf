module.exports = {
    a: {
        init: function(node){
            let attrs = node.rawAttrs.split(' ');
            let link = ''
            attrs.map(item=>{
                if(item.split('=')[0]=='href'){
                    link = item.split('=')[1];
                }
            })
            this.start = this.start.replace('${link}',link)
        },
        start: '{\\field{\\*\\fldinst{HYPERLINK ${link}}}{\\fldrslt \\f0\\fs24 \\cf0',
        end: '}}}'
    },
    ol: {
        start:'{{\\*\\pn\\pnlvlbody\\pnf0\\pnindent0\\pnstart1\\pndec{\\pntxta.}}\\fi-360\\li720\\sa200\\sl276\\slmult1',
        end: '}'
    },
    ul: {
        start: '{{\\*\\pn\\pnlvlblt\\pnf1\\pnindent0{\\pntxtb\\\'B7}}\\fi-360\\li720\\sa200\\sl276\\slmult1\\lang22\\f0\\fs22',
        end: '}'
    },
    li: {
        start: '{\\pntext\\tab}',
        end: '\\par'
    },
    center: {
        start: '{\\pard\\qr',
        end: '\\par}'
    },
    table: {
        start: '{',
        end: '}'
    },
    td: {
        start: '{\\pard\\intbl\\qc',
        end: '\\cell}'
    },
    th: {
        start: '{\\pard\\intbl\\qc',
        end: '\\cell}'
    },
    tr: {
        start: '{\\trowd\\trgaph10',
        end: '\\row}'
    },
    sup: {
        start: '{\\super',
        end: '}'
    }
};