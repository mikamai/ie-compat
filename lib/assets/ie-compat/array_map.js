// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Browser_compatibility
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function map(callback, thisArg) {
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

    // 6. Let A be a new array created as if by the expression new Array( len) 
    var A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the [[Call]] internal method of callbackfn 
        // with T as the this value and argument list containing kValue, k, and O.
        var mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the [[DefineOwnProperty]] internal method of A with arguments Pk, Property Descriptor 
        // {[[Value]]: mappedValue, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
        // not 100% compliant implementation, but defineProperty is not supported in IE < 9
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }
    // 9. return A
    return (A);
  };
}
