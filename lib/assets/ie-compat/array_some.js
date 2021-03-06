// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some#Browser_compatibility
// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.com/#x15.4.4.17
if (!Array.prototype.some) {

  Array.prototype.some = function some(callback, thisArg) {
    'use strict';
    var T, k;

    if (this == null) {
      throw new TypeError("this is null or not defined");
    }

    var kValue,
        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        O = Object(this),

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        len = O.length >>> 0; // Hack to convert O.length to a UInt32

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ({}.toString.call(callback) !== "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length >= 2) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[k];

        // ii. Let testResult be the result of calling the [[Call]] internal method of callbackfn 
        //    with T as the this value and argument list containing kValue, k, and O.
        // iii. If ToBoolean(testResult) is true, return true.
        // the steps above can be rewritten as 
        if(!!callback.call(T, kValue, k, O) === true)
          return true;

      }
      // d. Increase k by 1
      k++;
    }
    // 8. return false
    return (false);
  };
}
