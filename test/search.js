const assert = require("assert").strict;
const {sequentialSearch, sequentialSearchOptimized, binarySearch, interpolationSearch} =require('../lib/search.js');

it('should pass sequentialSearch', function () {
    const result1=sequentialSearch([2,1,4,6,88,55,4,3,67,357,784],67)
    const result2=sequentialSearch([2,1,4,6,88,55,4,3,67,357,784],60)
    assert.deepEqual(result1, 8);
    assert.deepEqual(result2, -1);
});

it('should pass sequentialSearchOptimized', function () {
    const result1=sequentialSearchOptimized([2,1,4,6,88,55,4,3,67,357,784],67)
    const result2=sequentialSearchOptimized([2,1,4,6,88,55,4,3,67,357,784],60)
    assert.deepEqual(result1, 8);
    assert.deepEqual(result2, -1);
});

it('should pass binarySearch', function () {
    const result1=binarySearch([1,2,4,5,66,74,77,89,99,135,674,680],89)
    const result2=binarySearch([1,2,4,5,66,74,77,89,99,135,674,680],88)
    const result3=binarySearch([1,77],77)
    const result4=binarySearch([1,77],1)
    assert.deepEqual(result1, 7);
    assert.deepEqual(result2, -1);
    assert.deepEqual(result3, 1);
    assert.deepEqual(result4, 0);
});

it('should pass interpolationSearch', function () {

  const result1=interpolationSearch([1,2,4,5,66,74,77,89,99,135,674,680],89)
    const result2=interpolationSearch([1,2,4,5,66,74,77,89,99,135,674,680],88)
    const result3=interpolationSearch([1,77],77)
    const result4=interpolationSearch([1,77],1)
  const result5=interpolationSearch([1],1)
    assert.deepEqual(result1, 7);
    assert.deepEqual(result2, -1);
    assert.deepEqual(result3, 1);
    assert.deepEqual(result4, 0);
    assert.deepEqual(result5, 0);
});