//用于交换两个数据的位置，i&j：下标
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

//交换排序初级版：效率低
function simpleSort(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                swap(arr, i, j);
            }
        }
    }
}

//冒泡排序：增加标记变量flag，避免在已经有序的情况下的无意义循环判断
//时间复杂度 最好：O(n); 最差：O(n2)
function bubbleSort(arr) {
    let flag = true;
    for (let i = 0, len = arr.length; i < len && flag; i++) {
        flag = false;
        for (let j = len - 2; j >= i; j--) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                //有数据交换，就设置为true
                flag = true;
            }
        }
    }
}

//简单选择排序：通过n-i次关键字的比较，从n-i+1个记录中选出关键字最小的记录，和第i个记录交换
//时间复杂度：O(n2)，但交换次数最少，性能略优于冒泡排序
function selectSort(arr) {
    for (let i = 0, len = arr.length, min; i < len; i++) {
        min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (i !== min) {
            swap(arr, i, min);
        }
    }
}

//

module.exports = {
    simpleSort,
    bubbleSort,
    selectSort
}