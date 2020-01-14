/**
 * Returns the key of the map with the corresponding value
 * @param {Number} value
 * @return {null|String} - Returns null if not found
 */
static keyForValue (value) {
    return FunctionID.keyForValueInternal(value, FunctionID._MAP);
}