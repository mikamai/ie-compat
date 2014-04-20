// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf#Browser_compatibility
// Production steps of ECMA-262, Edition 5, 15.4.4.15
// Reference: http://es5.github.com/#x15.4.4.15
if (!Array.prototype.lastIndexOf) {

  Array.prototype.lastIndexOf = function lastIndexOf(searchElement, fromIndex) {
    'use strict';
    var T, k, n ;

    if (this == null) {
      throw new TypeError("this is null or not defined");
    }

    var kValue,
        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        O = Object(this),

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        len = O.length >>> 0; // Hack to convert O.length to a UInt32

    // 4. If len is 0, return -1.
    if(len === 0)
      return -1;

    // 5. If argument fromIndex was passed let n be ToInteger(fromIndex); else let n be len.
    if (arguments.length >= 2) {
      n = fromIndex | 0; // convert fromIndex to int.If it's NaN, the result is 0 (http://es5.github.io/#x9.4)
    } else {
      n = len;
    }

    // 6. If n ≥ 0, then let k be min(n, len – 1).
    if(n >= 0) {
      k = Math.min(n, len - 1);
    } else {
      // 7. Else, n<0
      //   a. Let k be len - abs(n).
      k = len - (Math.abs(n));
    }

    // 8. Repeat, while k >= 0
    while (k >= 0) {

      // a. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with b
      // b. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[k];

        // ii. Let same be the result of applying the Strict Equality Comparison Algorithm to searchElement and elementK.
        // iii. If same is true, return k.        
        // combine the two steps together
        if(searchElement === kValue) {
          return k;
        }
      }
      // c. Decrease k by 1
      k--;
    }
    // 9. return -1
    return (-1);
  };
}
