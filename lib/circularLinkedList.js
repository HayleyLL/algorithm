const {Node}=require('./linkedList');

//迭代器：空循环链表返回{value:undefined, done:true}；
// 遍历到结点的next属性指向头结点时完成遍历，但此时的value为尾结点value
function makeIterator(list) {
    let current = list.head;
    let done=false;
    return {
        next: function () {
            if(!list.size||done){
                return {
                    value:undefined,
                    done:true
                }
            }else {
                if(!done){
                    let it = {
                        value: current.value,
                        done: false
                    }
                    if (current.next === list.head) {
                        done=true;
                    } else {
                        current = current.next;
                    }
                    return it;
                }
            }
        }
    }
}

function makeIndexAndValueIterator(list) {
    let current = list.head;
    let index = 0;
    let done=false;
    return {
        next: function () {
            if(!list.size||done){
                return {
                    value:undefined,
                    done:true
                }
            }else {
                if(!done){
                    let it = {
                        value: [current.value, index],
                        done: false
                    }
                    if (current.next === list.head) {
                        done=true;
                    } else {
                        current = current.next;
                        index++;
                    }
                    return it;
                }
            }
        }
    }
}

class CircularLinkedList{
    constructor(values) {
        this.head = null;
        this.tail = null;
        this.size = 0;

        if(values){
            this.push(...values)
        }
    }

    [Symbol.iterator]() {
        return makeIterator(this);
    }

    entries = () => {
        let that = this;
        return {
            [Symbol.iterator]: function () {
                return makeIndexAndValueIterator(that);
            }
        }
    }

    push(...values) {
        for (let value of values) {
            this._push(value)
        }
    }

    _push(value) {
        let node = new Node(value);
        if(!this.size){
            this.head=this.tail=node;
            this.tail.next=this.head;
        }else{
            this.tail.next=node;
            this.tail=node;
            node.next=this.head;
        }
        this.size++;
    }

    //下标从0开始，返回第n个元素，负数表示从后计数，如果不存在，返回undefined
    getNode(n) {
        let current = this.head;
        let i = 0;
        if (current === null) {
            return undefined
        }
        if (n < 0) {
            n = this.size + n
        }
        if (n >= this.size || n < 0) {
            return undefined
        }
        while (current.next !== this.head && i < n) {
            current = current.next;
            i++;
        }
        return current;
    }

    get(n) {
        let node = this.getNode(n);
        if (node === undefined) {
            return undefined
        }
        return node.value;
    }

    //删除并返回最后一个元素，如果是空链表，返回undefined
    pop() {
        if (!this.size) {
            return undefined
        }
        let current = this.tail.value;
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            let prev = this.getNode(-2);
            this.tail = prev;
            prev.next = this.head;
        }
        this.size--;
        return current;
    }


    //删除并返回第一个元素，如果是空链表，返回undefined
    shift() {
        if (!this.size) {
            return undefined
        }
        let current = this.head;
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = current.next;
            current.next = null;
        }
        this.size--;
        return current.value;
    }

    //在列表开头增加一个结点
    unshift(value) {
        let node = new Node(value);
        if (!this.size) {
            this.tail = node;
        } else {
            node.next = this.head;
        }
        this.head = node;
        this.tail.next=this.head;
        this.size++;
    }

    //在下标为n的位置插入一个结点，支持传入负数，数字大于等于链表长度时，放在尾结点；极小时放在头结点
    insert(n, value) {
        let node = new Node(value);
        if (n < 0) {
            n = this.size + n;
        }
        if (n > this.size - 1) {
            this.push(value)
            return;
        }
        if (n <= 0) {
            this.unshift(value);
            return;
        }
        let prev = this.getNode(n - 1);
        node.next = prev.next;
        prev.next = node;
        this.size++;
    }

    //返回某个元素出现的次数
    count(value) {
        let n=0;
        for(let ele of this){
            if(ele===value){
                n++;
            }
        }
        return n;
    }

    //判断是不是function
    _isFunction(fn) {
        if (typeof fn !== 'function') {
            throw new Error('fn is not a function!')
        }
    }

    //判断是否每个元素都满足条件，空列表返回false
    all(fn) {
        this._isFunction(fn)
        if (!this.size) {
            return false
        }
        for (let ele of this) {
            if (!fn(ele)) {
                return false;
            }
        }
        return true;
    }

    //是否有一个元素满足条件
    any(fn) {
        this._isFunction(fn)
        for (let ele of this) {
            if (fn(ele)) {
                return true;
            }
        }
        return false;
    }

    //对链表的每个元素调用传入的函数，返回一个新的结果链表
    map(fn, thisArg) {
        this._isFunction(fn);
        fn.bind(thisArg);
        let list = new CircularLinkedList();
        for (let ele of this.entries()) {
            if (ele === undefined) {
                return list;
            }
            const [value, key] = ele;
            list.push(fn(value, key, this))
        }
        return list;
    }

    //选出符合条件的元素组成的新链表
    filter(fn, thisArg) {
        this._isFunction(fn);
        fn.bind(thisArg);
        let list = new CircularLinkedList()
        for (let ele of this.entries()) {
            if (ele === undefined) {
                return list;
            }
            const [value, index] = ele;
            if (fn(value, index, this)) {
                list.push(value);
            }
        }
        return list;
    }

    //reduce
    reduce(fn, initialValue) {
        this._isFunction(fn);
        if (!this.size && !initialValue) {
            throw new TypeError('The linked list is empty!')
        }
        if (!this.size && initialValue) {
            return initialValue;
        }
        if (this.size === 1 && !initialValue) {
            return this.head.value;
        }

        let accumulator = undefined;
        for (let ele of this.entries()) {
            const [value, index] = ele;
            if (index === 0) {
                if (initialValue) {
                    accumulator = fn(initialValue, value, index, this)
                } else {
                    accumulator = value;
                }
            } else {
                accumulator = fn(accumulator, value, index, this)
            }
        }
        return accumulator;
    }

    //对每项元素执行回调函数，跳过未初始化的项，总是返回undefined
    forEach(fn, thisArg) {
        this._isFunction(fn);
        if (thisArg) {
            fn.bind(thisArg);
        }
        for (let ele of this.entries()) {
            if (ele) {
                const [value, index] = ele;
                fn(value, index, this);
            }
        }
    }

    //返回最大值
    max() {
        if (!this.size) {
            throw new Error('The linked list is empty!');
        }
        let max = this.head.value;
        for (let ele of this) {
            if (ele > max) {
                max = ele;
            }
        }
        return max;
    }

    //返回最小值
    min(){
        if (!this.size) {
            throw new Error('The linked list is empty!');
        }
        let min = this.head.value;
        for (let ele of this) {
            if (ele < min) {
                min = ele;
            }
        }
        return min;
    }

    //返回第一个满足条件的元素
    first(fn){
        this._isFunction(fn);
        for (let ele of this) {
            if(fn(ele)){
                return ele;
            }
        }
    }

    //返回最后一个满足条件的元素
    last(fn){
        this._isFunction(fn);
        let value=undefined;
        for(let ele of this){
            if(fn(ele)){
                value=ele;
            }
        }
        return value;
    }

    //返回是否包含某个元素
    contain(value){
        for (let ele of this){
            if(ele===value){
                return true;
            }
        }
        return false;
    }

    //合并两个循环链表
    concat(list){
        if(!this.size&&list.size){
            return list
        }
        if(!list.size){
            return this;
        }
        this.tail.next=list.head;
        list.tail.next=this.head;
        this.size=list.size=this.size+list.size;
        list.head=this.head;
        this.tail=list.tail;
        return this;
    }
}

module.exports={
    CircularList: CircularLinkedList,
    iterator: makeIterator
}


