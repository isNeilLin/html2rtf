var str = `<xml><return_code><![CDATA[SUCCESS]]></return_code>
<return_msg><![CDATA[OK]]></return_msg>
<appid><![CDATA[wx784e716f7bbc4]]></appid>
<mch_id><![CDATA[1899632]]></mch_id>
<nonce_str><![CDATA[UG9wJR8S]]></nonce_str>
<sign><![CDATA[EE07B5FB2D1AAF98A0CE7]]></sign>
<result_code><![CDATA[SUCCESS]]></result_code>
<prepay_id><![CDATA[wx201709131ed29634f720459035310]]></prepay_id>
<trade_type><![CDATA[APP]]></trade_type>
</xml>`;
function getValue(nodeName){
    let reg = new RegExp(`<${nodeName}>(.*?)</${nodeName}>`,'g')
    return reg.exec(str)[1]
}
let appid = getValue('prepay_id');
console.log(appid)