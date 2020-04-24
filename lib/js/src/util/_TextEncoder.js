class _TextEncoder {
    // https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder#Polyfill
    static encode (str) {
        const Len = str.length;
        let resPos = -1;
        // The Uint8Array's length must be at least 3x the length of the string because an invalid UTF-16
        //  takes up the equivelent space of 3 UTF-8 characters to encode it properly. However, Array's
        //  have an auto expanding length and 1.5x should be just the right balance for most uses.
        const resArr = [];
        for (let point = 0, nextcode = 0, idx = 0; idx !== Len;) {
            point = str.charCodeAt(idx), idx += 1;
            if (point >= 0xD800 && point <= 0xDBFF) {
                if (idx === Len) {
                    resArr[resPos += 1] = 0xef;
                    resArr[resPos += 1] = 0xbf;
                    resArr[resPos += 1] = 0xbd;
                    break;
                }
                // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                nextcode = str.charCodeAt(idx);
                if (nextcode >= 0xDC00 && nextcode <= 0xDFFF) {
                    point = ((point - 0xD800) * 0x400) + nextcode - 0xDC00 + 0x10000;
                    idx += 1;
                    if (point > 0xffff) {
                        resArr[resPos += 1] = (0x1e << 3) | (point >>> 18);
                        resArr[resPos += 1] = (0x2 << 6) | ((point >>> 12) & 0x3f);
                        resArr[resPos += 1] = (0x2 << 6) | ((point >>> 6) & 0x3f);
                        resArr[resPos += 1] = (0x2 << 6) | (point & 0x3f);
                        continue;
                    }
                } else {
                    resArr[resPos += 1] = 0xef; resArr[resPos += 1] = 0xbf;
                    resArr[resPos += 1] = 0xbd; continue;
                }
            }
            if (point <= 0x007f) {
                resArr[resPos += 1] = (0x0 << 7) | point;
            } else if (point <= 0x07ff) {
                resArr[resPos += 1] = (0x6 << 5) | (point >>> 6);
                resArr[resPos += 1] = (0x2 << 6) | (point & 0x3f);
            } else {
                resArr[resPos += 1] = (0xe << 4) | (point >>> 12);
                resArr[resPos += 1] = (0x2 << 6) | ((point >>> 6) & 0x3f);
                resArr[resPos += 1] = (0x2 << 6) | (point & 0x3f);
            }
        }
        // else // IE 6-9
        resArr.length = resPos + 1; // trim off extra weight
        return resArr;
    }
}

export { _TextEncoder };