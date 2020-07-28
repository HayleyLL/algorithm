const assert = require("assert").strict;
const {simpleSort,bubbleSort,selectSort}=require('../lib/sort');

const result=[1,2,2,3,4,6,8,44,77,'bubble','hello']

const arr1=[1,2,4,2,3,44,6,77,8,'hello','bubble']
it('should pass simpleSort', function () {
    simpleSort(arr1);
    assert.deepEqual(arr1,result);
});

const arr2=[1,2,4,2,3,44,6,77,8,'hello','bubble']
it('should pass simpleSort', function () {
    bubbleSort(arr2);
    assert.deepEqual(arr2,result);
});

const arr3=[1,2,4,2,3,44,6,77,8,'hello','bubble']
it('should pass selectSort', function () {
    selectSort(arr3);
    assert.deepEqual(arr3,result);
});

