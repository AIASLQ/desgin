/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validMobile(str) {
    // const valid_map = ['admin', 'editor', '999999']
    if (str.length < 2 || str.length > 15) {
        return false;
    } else {
        return true;
    }
    // return valid_map.indexOf(str.trim()) >= 0
}