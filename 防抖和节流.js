function fetchData(url) {
    return fetch(url).then(response => response.json())
}

// # 防抖
// 防抖函数，只执行最后一次操作（闭包原理）
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait)
    }
}

// 使用防抖函数
const debounceFetchData = debounce(() => {
    fetchData('https://jkapi.com/api/one_yan?type=json').then(data => {
        console.log(data);
    })
}, 1000)

// 模拟多次请求
for (let i = 0; i < 10; i++) {
    debounceFetchData() // 这里执行的是执行的debounce返回的函数，他们共享一个timeout
}

// # 节流
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if(!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit)
        }
    }
}

// 使用节流函数
const throttledFetchData = throttle(() => {
    fetchData('https://jkapi.com/api/one_yan?type=json').then(data => {
        console.log(data);
    })
}, 300)

// 用async和await变成异步函数
async function test() {
    for (let i = 0; i < 10; i++) {
        await sleep(50)
        throttledFetchData() // 这里执行的是执行的debounce返回的函数，他们共享一个timeout
    }
}

// 延长for循环所用的时间
function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

// 模拟节流测试
test()