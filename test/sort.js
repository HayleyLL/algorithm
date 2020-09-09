const assert = require("assert").strict;
const {simpleSort,bubbleSort,selectSort,insertSort,shellSort, mergeSort}=require('../lib/sort');

const arr1=[1,2,4,2,3,44,6,77,8,99,98]
const result=[1,2,2,3,4,6,8,44,77,98,99]

it('should pass simpleSort', function () {
    const arr2=[...arr1];
    simpleSort(arr2);
    assert.deepEqual(arr2,result);
});

it('should pass bubbleSort', function () {
    const arr2=[...arr1];
    bubbleSort(arr2);
    assert.deepEqual(arr2,result);
});

it('should pass selectSort', function () {
    const arr2=[...arr1];
    selectSort(arr2);
    assert.deepEqual(arr2,result);
});

it('should pass insertSort', function () {
    const arr2=[...arr1];
    insertSort(arr2);
    assert.deepEqual(arr2,result);
});

it('should pass insertSort', function () {
    const arr2=[...arr1];
    const arr5=[9,1,5,8,3,7,4,6,2];
    const result5=[1,2,3,4,5,6,7,8,9]
    shellSort(arr5);
    shellSort(arr2);
    assert.deepEqual(arr5,result5);
    assert.deepEqual(arr2,result);
});

//字符串测试位置有问题？
it('should pass mergeSort', function () {
    const arr2=[...arr1];
    mergeSort(arr2)
    assert.deepEqual(arr2,result);
    const anotherArr=[2,4,3,88,55,67,9,4,23,100];
    const anotherResult=[2,3,4,4,9,23,55,67,88,100];
    mergeSort(anotherArr)
    assert.deepEqual(anotherArr,anotherResult);
});
