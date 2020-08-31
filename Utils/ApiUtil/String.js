const normalizar = (str) => {

    if(typeof  str != 'string')
        str = ""

    var str1 = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÇç';
    var str2 = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuucc';
    for (let i = 0; i < str1.length; i++) str = str.replace(new RegExp(str1.charAt(i), 'g'), str2.charAt(i));
    str = str.replace(/[&\/\\¿?´+<>"'!$%&]/g, '');
    return str;
}

module.exports = normalizar;