// 1. 柯里化
function currying(f) {
    return function(a) {
        return function(b) {
            return f(a,b);
        }
    }
}

function sum(a, b) {
    return a + b;
}

const curriedSum = currying(sum);

console.log(curriedSum(1)(2))

// 柯里化函数的用途
// 以上面为例，把a默认成100
const new_curriedSum = currying(sum)(100);

// 直接输入参数b的值即可，无需再写新的函数
console.log(new_curriedSum(2))
console.log(new_curriedSum(4))

// 2. 组合函数 不确定参数... 会把参数视为一个数组
const compose = (...fns) => {(value) => fns.reduceRight((acc, fn) => fn(acc), value)}

// 示例
// 数组扁平化再去重
var arr = [1, 2, [2, 10, 0, [5, 6, 4, [7, 1]]]];
var flatten = function (arr) {
    while(arr.some(Array.isArray)){
        arr = [].concat(...arr)
    }
    return arr;
};
var unique = function (arr) { return Array.from(new Set(arr)); };
var flattenAndUnique = compose(unique, flatten);
var result1 = flattenAndUnique(arr) // [1, 2, 10, 0, 5, 6, 4, 7]

// 增加排序需求
// 新增一个数组排序方法
var sort = function (arr) { return arr.sort(function(a, b) {
    return  a - b;
}) };
var flattenAndUniqueAndSort = compose(sort, unique, flatten);
var result2 = flattenAndUniqueAndSort(arr) //  [0, 1, 2, 4, 5, 6, 7, 10]
console.log(result2)

// 排序改为求和
// 新增
var getSum = function (arr){ return arr.reduce(function (cur, next) {
    return cur + next
}, 0); };
var flattenAndUniqueAndSum = compose(getSum, unique, flatten);
var result3 = flattenAndUniqueAndSum(arr) // 35
console.log(result3)