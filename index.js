const fs = require('fs');
const path = require('path');
const transHtml = require('./lib/transHtml.js');
const html2rtf = (html,output) => {
    return new Promise((resolve,reject)=>{
        let rtf = transHtml(html);
        fs.writeFile(output,rtf,err=>{
            if(err){
                console.log(err)
                reject(e)
            }
            resolve()
        })
    })
}
module.exports = html2rtf;