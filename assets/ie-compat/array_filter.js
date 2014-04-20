// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Browser_compatibility
// Production steps of ECMA-262, Edition 5, 15.4.4.20
// Reference: http://es5.github.com/#x15.4.4.20
if (!Array.prototype.filter) {

  Array.prototype.filter = function filter(callback, thisArg) {
    'use strict';
    var T, k, to;

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
    var A = new Array();

    // 7. Let k be 0
    k = 0;

    // 8. Let to be 0.
    to = 0;

    // 9. Repeat, while k < len
    while (k < len) {

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[k];

        // ii. Let selected be the result of calling the [[Call]] internal method of callbackfn 
        // with T as the this value and argument list containing kValue, k, and O.
        var selected = callback.call(T, kValue, k, O);

        // iii. If ToBoolean(selected) is true, then
        if(!!selected === true) {
          // 1. Call the [[DefineOwnProperty]] internal method of A with arguments ToString(to), Property Descriptor 
          // {[[Value]]: kValue, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
          // not 100% compliant, but defineProperty is not available on IE < 9  
          A.push(kValue);
          // 2. Increase to by 1
          to++;
        }
      }
      // d. Increase k by 1
      k++;
    }
    // 10. return A
    return (A);
  };
}
