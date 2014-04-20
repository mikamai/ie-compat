// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Browser_compatibility
// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.com/#x15.4.4.14
if (!Array.prototype.indexOf) {

  Array.prototype.indexOf = function indexOf(searchElement, fromIndex) {
    'use strict';
    var T, k, n = 0;

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

    // 5. If argument fromIndex was passed let n be ToInteger(fromIndex); else let n be 0.
    if (arguments.length >= 2) {
      n = fromIndex | 0; // convert fromIndex to int.If it's NaN, the result is 0 (http://es5.github.io/#x9.4)
    }

    // 6. If n ≥ len, return -1.
    if(n >= len) {
      return -1;
    }

    // 7. If n ≥ 0, then
    //   a. Let k be n.
    if(n >= 0) {
      k = n;
    } else {
      // 8. Else, n<0
      //   a. Let k be len - abs(n).
      k = len - (Math.abs(n));
      //   b. If k is less than 0, then let k be 0.
      if(k < 0) {
        k = 0
      }
    }

    // 9. Repeat, while k < len
    while (k < len) {

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
      // c. Increase k by 1
      k++;
    }
    // 10. return -1
    return (-1);
  };
}
