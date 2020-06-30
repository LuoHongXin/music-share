const CryptoJS = require('crypto-js');  //引用AES源码js
    
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

//解密方法
function Decrypt(word,key) {
    key = CryptoJS.enc.Utf8.parse(key);  //十六位十六进制数作为密钥
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    console.log(word,key,encryptedHexStr,srcs,decrypt,decryptedStr);
    return decryptedStr.toString();
}

//加密方法
function Encrypt(word,key) {
    key = CryptoJS.enc.Utf8.parse(key);  //十六位十六进制数作为密钥
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}
function formatData({code = 1,msg ='success',data=[]}){
    if(code===0){
        msg = 'fail'
    }
    return{code,msg,data}
}
function audiourl(name) {
    return 'localhost:1161?filekey='+encodeURI(name);
}
function videourl(name){
    return 'localhost:1161?filename='+encodeURI(name);
}
module.exports = {
    formatData,
    Decrypt,
    Encrypt,
    audiourl,
    videourl
}