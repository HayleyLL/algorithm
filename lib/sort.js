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
        for (let j = len - 1; j > i; j--) {
            if (arr[j-1] > arr[j ]) {
                swap(arr, j-1, j );
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

//直接插入排序
//时间复杂度：最好：O(n)； O(n2) 比冒泡排序和简单选择排序性能好一些
function insertSort(arr) {
    for (let i = 1, len = arr.length; i < len; i++) {
        let temp = arr[i];
        if (temp < arr[i - 1]) {
            let j = i - 1;
            //不需要j>=0了，因为undefined和其他值比较返回false
            for (; arr[j] > temp; j--) {
                arr[j + 1] = arr[j];
            }
            //退出循环时，多了一次j--
            arr[j + 1] = temp;
        }
    }
}

//希尔排序：对插入排序的改进，分组;增量序列的最后一个增量值要是1
//时间复杂度：最好：O(n3/2次方)
function shellSort(arr) {
    let len = arr.length;
    let increment = len;
    do {
        increment = Math.floor(increment / 3) + 1;
        for (let i = increment; i < len; i++) {
            if (arr[i] < arr[i - increment]) {
                let temp = arr[i];
                let j = i - increment;
                for (; j >= 0 && arr[j] > temp; j -= increment) {
                    arr[j + increment] = arr[j];
                }
                arr[j + increment] = temp;
            }
        }
    } while (increment > 1)
}

//归并排序：两两合并排序再合并，一颗倒置的完全二叉树
//时间复杂度：
function merge(left, right) {
    const compared = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            compared.push(left.shift());
        } else {
            compared.push(right.shift());
        }
    }

    while (left.length) {
        compared.push(left.shift());
    }
    while (right.length) {
        compared.push(right.shift());
    }
    return compared;
}


function mSort(arr) {
    const len = arr.length;
    if (len < 2) {
        return arr;
    }
    const middle = Math.floor(len / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merge(mSort(left), mSort(right));
}

function mergeSort(arr){
    const result = mSort(arr);
    arr.length=0;
    arr.push(...result)
}

//快速排序

module.exports = {
    simpleSort,
    bubbleSort,
    selectSort,
    insertSort,
    shellSort,
    mergeSort
}


