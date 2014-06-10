// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRightRight#Browser_compatibility
// Production steps of ECMA-262, Edition 5, 15.4.4.22
// Reference: http://es5.github.com/#x15.4.4.22

if (!Array.prototype.reduceRight) {

  Array.prototype.reduceRight = function reduceRight(callback, initialValue) {
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

    // 5. If len is 0 and initialValue is not present, throw a TypeError exception.
    if(len === 0 && arguments.length < 2) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    // 6. Let k be len-1
    k = len-1;

    var accumulator;
    // 7. If initialValue is present, then
    if(arguments.length > 1) {
			// a. Set accumulator to initialValue.
    	accumulator = initialValue;
    } else {
    	// NOTE: verbose but correct implementation 
    	// 8. Else, initialValue is not present
    	// a. Let kPresent be false.
    	var kPresent = false;

    	// b. Repeat, while kPresent is false and k ≥ 0
    	while(kPresent === false && k >= 0) {
		    // i. Let Pk be ToString(k).
		    //     This is implicit for LHS operands of the in operator
				// ii. Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument Pk.
				kPresent = (k in O);    		
				// iii. If kPresent is true, then
				if(kPresent === true) {
					// 1. Let accumulator be the result of calling the [[Get]] internal method of O with argument Pk.
					accumulator = O[k];
				}

				// iv. Decrease k by 1.
				k--;
    	}

    	// c. If kPresent is false, throw a TypeError exception.
    	if(kPresent === false) {
      	throw new TypeError("Reduce of empty array with no initial value");    		
    	}

    }

    // 7. Repeat, while k >= 0
    while (k >= 0) {

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[k];

        // ii. Let accumulator be the result of calling the [[Call]] internal method of callbackfn 
        // with undefined as the this value and argument list containing accumulator, kValue, k, and O.
        accumulator = callback.call(undefined, accumulator, kValue, k, O);
      }
      // d. Decrease k by 1.
      k--;
    }
    // 10. Return accumulator
    return accumulator;
  };
}
