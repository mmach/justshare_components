module.exports = (codeList, lang, ) => {

    return {
        translate(codeTxt, ...param) {
            let result = codeList[codeTxt];
            if (typeof result != "undefined" && result.message[lang]) {
                return result.message[lang].format(...param);
            } else {
                return codeTxt;
            }
        }
    }

}