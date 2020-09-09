//1.顺序表查找/线性查找
//
function sequentialSearch(a, key) {
    for (let i = 0, n = a.length; i < n; i++) {
        if (a[i] === key) {
            return i;
        }
    }
    return -1;
}

//2.顺序表查找优化：设置哨兵无需判断是否越界
// 时间复杂度O(n)；最优：O(1); 最差： O(n+1); 平均（n+1）/2
function sequentialSearchOptimized(a, key) {
    let n = a.length,
        i = n;
    a[-1] = key;
    while (a[i] !== key) {
        i--;
    }
    return i;
}

//有序表查找（记录是关键码有序；线性表必须顺序存储）

//3.折半查找 必须是有序表
//时间复杂度O(logn) 最坏O(|log2n|+1)
function binarySearch(a, key) {
    let low = 0,
        high = a.length - 1,
        mid;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (key < a[mid]) {
            high = mid - 1;
        } else if (key > a[mid]) {
            low = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}

//插值查找：有序表 分布不太均匀时
function interpolationSearch(a,key){
    let low = 0,
        high = a.length - 1,
        mid;
    while(low<=high){
        if(a[low]>key || a[high]<key){
            return -1
        }
        if (a[low] == a[high]){
            return a[low]===key?low :-1
        }
        mid=Math.floor(low+(high-low)*(key-a[low])/(a[high]-a[low]));

        if(key<a[mid]){
            high=mid-1;
        }else if(key>a[mid]){
            low=mid+1;
        }else{
            return mid;
        }
    }
    return -1;
}

module.exports = {
    sequentialSearch, sequentialSearchOptimized, binarySearch, interpolationSearch
}


