const assert = require("assert").strict;
const {LinkedList, iterator} = require('../lib/linkedList')

describe('#makeIterator()', function () {
    it('should return a LinkedList iterator', function () {
        let list = new LinkedList();
        let it = iterator(list);
        assert.deepEqual(it.next(), {value: undefined, done: true});
        list.push(1);
        it = iterator(list);
        assert.deepEqual(it.next(), {value: 1, done: false});
        assert.deepEqual(it.next(), {value: undefined, done: true});
        list.push('hello')
        it = iterator(list);
        assert.deepEqual(it.next(), {value: 1, done: false});
        assert.deepEqual(it.next(), {value: 'hello', done: false});
        assert.deepEqual(it.next(), {value: undefined, done: true});
    });
});

describe('LinkedList', function () {
    it('support "for of"', function () {
        let list = new LinkedList();
        let arr = [];
        for (let ele of list) {
            arr.push(ele);
        }
        assert.deepEqual(arr.length, 0);
        list.push(1)
        list.push(2)
        list.push(3)
        for (let ele of list) {
            arr.push(ele);
        }
        assert.deepEqual(arr.length, 3);
        assert.deepEqual(arr[0], 1);
        assert.deepEqual(arr[1], 2);
        assert.deepEqual(arr[2], 3);
        arr.length = 0;
        for (let ele of list) {
            if (ele > 2) {
                break;
            }
            arr.push(ele);
        }
        assert.deepEqual(arr.length, 2);
        assert.deepEqual(arr[1], 2);
        assert.deepEqual(arr[2], undefined);
    });

    describe('#push()', function () {
        it('should append element at list tail', function () {
            let list = new LinkedList();
            list.push(1);
            assert.deepEqual(list.head.value, 1);
            assert.deepEqual(list.tail.value, 1);
            assert.equal(list.tail, list.head);
            list.pop();
            list.push(1);
            list.push(2);
            assert.deepEqual(list.head.value, 1);
            assert.deepEqual(list.tail.value, 2);
            assert.deepEqual(list.tail.next, null);
            assert.deepEqual(list.head.next.value, 2);
            assert.notDeepEqual(list.tail, list.head);
        });
    });

    describe('.size', function () {
        it('should return size of list', function () {

            let list = new LinkedList();
            assert.deepEqual(list.size, 0);
            list.push(1);
            assert.deepEqual(list.size, 1);
            list.push(2);
            assert.deepEqual(list.size, 2);
            list.pop();
            assert.deepEqual(list.size, 1);
            list.pop()
            assert.deepEqual(list.size, 0);
            list.pop()
            assert.deepEqual(list.size, 0);
            list.push(2);
            list.push(3);
            assert.deepEqual(list.size, 2);
            list.shift();
            assert.deepEqual(list.size, 1);
            list.shift()
            assert.deepEqual(list.size, 0);
            list.unshift('!')
            list.unshift('!')
            assert.deepEqual(list.size, 2);
            list.insert(1, 6666)
            assert.deepEqual(list.size, 3);
        });
    });

    describe('#get(index)', function () {
        it('should return value of the node at index', function () {
            let list = new LinkedList();
            assert.deepEqual(list.get(0), undefined);
            list.push(33)
            assert.deepEqual(list.get(0), 33);
            assert.deepEqual(list.get(10), undefined);
            assert.deepEqual(list.get(-1), 33);
            assert.deepEqual(list.get(-2), undefined);
            list.push(999)
            assert.deepEqual(list.get(0), 33);
            assert.deepEqual(list.get(10), undefined);
            assert.deepEqual(list.get(-1), 999);
            assert.deepEqual(list.get(-2), 33);
            assert.deepEqual(list.get(1), 999);
        });
    });

    describe('pop()', function () {
        it('should remove and return the last value', function () {
                let list = new LinkedList();
                assert.deepEqual(list.pop(), undefined);
                list.push(33);
                assert.deepEqual(list.pop(), 33);
                list.push(44);
                assert.deepEqual(list.pop(), 44);
                assert.deepEqual(list.pop(), undefined);
                assert.deepEqual(list.head, null);
                assert.deepEqual(list.tail, null);
            }
        );
    });

    describe('#shift()', function () {
        it('should remove and return the first value', function () {
                let list = new LinkedList();
                assert.deepEqual(list.shift(), undefined);
                list.push(33);
                assert.deepEqual(list.shift(), 33);
                list.push(66);
                list.push('hello')
                assert.deepEqual(list.shift(), 66);
                assert.deepEqual(list.shift(), 'hello');
                assert.deepEqual(list.shift(), undefined);
            }
        );
    });

    describe('#unshift()', function () {
        it('should add an element at head', function () {
                let list = new LinkedList();
                list.unshift('hello')
                assert.deepEqual(list.head.value, 'hello');
                assert.deepEqual(list.tail.value, 'hello');
                list.unshift(' world')
                assert.deepEqual(list.head.value, ' world')
                assert.deepEqual(list.tail.value, 'hello');
                list.unshift('!')
                assert.deepEqual(list.head.value, '!');
                assert.deepEqual(list.head.next.value, ' world');
            }
        );
    });

    describe('#insert()', function () {
        it('should insert element', function () {
                let list = new LinkedList();
                list.insert(-8, 'hello')
                assert.deepEqual(list.head.value, 'hello');
                assert.deepEqual(list.tail.value, 'hello');
                list.insert(0, 77);
                assert.deepEqual(list.tail.value, 'hello');
                assert.deepEqual(list.head.value, 77);
                list.insert(1, 88)
                assert.deepEqual(list.head.next.value, 88);
            }
        );
    });

    describe('#count(value)', function () {
        it('should return the total number of value', function () {
                let list = new LinkedList();
                assert.deepEqual(list.count('hello'), 0);
                list.insert(-8, 'hello')
                list.insert(-8, 'to')
                list.insert(-8, 'hello')
                assert.deepEqual(list.count('hello'), 2);
                list.insert(-3, 456)
                assert.deepEqual(list.count('hello'), 2);
            }
        );
    });

    it('implment all', function () {
            let list = new LinkedList([2, 4]);
            assert.deepEqual(list.all(c => c % 2 === 0), true);
            assert.deepEqual(list.all(c => c % 2 !== 0), false);
            list.push(4);
            list.push(5);
            list.push(6);
            assert.deepEqual(list.all(c => c % 2 === 0), false);
            assert.throws(() => {
                list.all(1)
            });
        }
    );

    it('should implement any', function () {
            let list = new LinkedList();
            assert.deepEqual(list.any(c => c % 2 === 0), false);
            list.push(2);
            list.push(4);
            assert.deepEqual(list.any(c => c % 2 === 0), true);
            assert.deepEqual(list.any(c => c % 2 !== 0), false);
            list.push(4);
            list.push(5);
            list.push(6);
            assert.deepEqual(list.any(c => c % 2 === 0), true);
            assert.deepEqual(list.any(c => c % 2 !== 0), true);
            assert.throws(() => {
                list.any(1)
            });
        }
    );

    it('should implment map', function () {
            let list = new LinkedList();
            assert.deepEqual(list.map(c => c * 2).get(0), undefined);
            list.push(1)
            list.push(2)
            list.push(3)
            let newList = list.map(c => c * 2);
            assert.deepEqual(newList.get(0), 2);
            assert.deepEqual(newList.get(1), 4);
            assert.deepEqual(newList.get(2), 6);
            assert.deepEqual(newList.get(3), undefined);
            newList = list.map((c, k) => c + k);
            assert.deepEqual(newList.get(0), 1);
            assert.deepEqual(newList.get(1), 3);
            assert.deepEqual(newList.get(2), 5);
            assert.deepEqual(newList.get(5), undefined);
            assert.throws(() => {
                list.map('hello')
            });
        }
    );

    it('should implement filter', function () {
        {
            let list = new LinkedList();
            assert.deepEqual(list.filter(c => c % 2 === 0).get(0), undefined);
            list.push(1)
            list.push(2)
            list.push(3)
            list.push(4)
            let newList = list.filter(c => c % 2 === 0);
            assert.deepEqual(newList.get(0), 2);
            assert.deepEqual(newList.get(1), 4);
            assert.deepEqual(newList.get(5), undefined);
            newList = list.filter((c, k) => k >= 2);
            assert.deepEqual(newList.get(0), 3);
            assert.deepEqual(newList.get(1), 4);
            newList = list.filter(c => c % 2 !== 0);
            assert.deepEqual(newList.get(0), 1);
            assert.deepEqual(newList.get(1), 3);
            assert.deepEqual(newList.get(5), undefined);
        }
    });

    it('should implement reduce', function () {
            let list = new LinkedList();
            assert.throws(() => {
                list.reduce(list.reduce((accum, cur) => accum + cur))
            });
            assert.deepEqual(list.reduce((accum, cur) => accum + cur, 8), 8);
            list.push(2)
            assert.deepEqual(list.reduce((accum, cur) => accum + cur), 2);
            list.push(3)
            list.push(4)
            list.push(5)
            assert.deepEqual(list.reduce((accum, cur) => accum + cur), 14);
            assert.deepEqual(list.reduce((accum, cur) => accum + cur, 10), 24);
            assert.deepEqual(list.reduce((accum, cur) => Math.max(accum, cur)), 5);
        }
    );

    it('should implement forEach', function () {
            let list = new LinkedList();
            let copy = [];
            list.forEach(c => copy.push(c))
            assert.deepEqual(copy, []);
            list.push(1)
            list.push(2)
            list.forEach(c => copy.push(c))
            assert.deepEqual(copy, [1, 2]);
            list.forEach((c, k) => copy.push(c + k))
            assert.deepEqual(copy, [1, 2, 1, 3]);
        }
    );

    it('should implement max', function () {
        {
            let list = new LinkedList();
            assert.throws(() => {
                list.max();
            });
            list.push(1, 2, 3)
            assert.deepEqual(list.max(), 3);
            list.push('hello')
            assert.deepEqual(list.max(), 3);
        }
    });

    it('should implement min', function () {
            let list = new LinkedList();
            assert.throws(() => {
                list.max();
            });
            list.push(2, 1, 3)
            assert.deepEqual(list.min(), 1);
            list.push('hello')
            assert.deepEqual(list.min(), 1);
        }
    );
});