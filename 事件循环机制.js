

// 宏任务和微任务
// 放到这个网站上执行https://www.jsv9000.app/
// https://www.jsv9000.app/?code=Y29uc29sZS5sb2coMSkKCnNldFRpbWVvdXQoKCkgPT4gewogICAgY29uc29sZS5sb2coMikKfSwgMCkKCmNvbnN0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7CiAgICBjb25zb2xlLmxvZygzKQogICAgcmVzb2x2ZSg1KQogICAgY29uc29sZS5sb2coNikKfSkKCnAudGhlbihyZXMgPT4gewogICAgY29uc29sZS5sb2cocmVzKQp9KQoKY29uc29sZS5sb2coNyk%3D
console.log(1)

setTimeout(() => {
    console.log(2)
}, 0)

const p = new Promise((resolve, reject) => {
    console.log(3)
    resolve(5)
    console.log(6)
})

p.then(res => {
    console.log(res)
})

console.log(7)


// 示例1
// 321 看谁的then先出现，谁就先执行，先进先出的规则
new Promise((resolve, reject) => {
    resolve(1)

    new Promise((resolve, reject) => {
        resolve(2)
    }).then(data => {
        console.log(data)
    })
}).then(data => {
    console.log(data)
})

console.log(3)

// 示例2
// 结果： 11 14 12 15 13
conosle.log(11);

setTimeout(() => {
    console.log(12);
    let p = new Promise((resolve) => {
        resolve(13);
    })
    p.then(res => {
        conosle.log(res);
    })
    console.log(15);
}, 0);

console.log(14);

// 示例3
// 2 3 6 p2 p1 1 4 5
// resolve没有then是不执行的
setTimeout(() => {
    console.log(1)
}, 0)

new Promise((resolve, reject) => {
    conosle.log(2);
    resolve("p1");

    new Promise((resolve, reject) => {
        conosle.log(3);
        
        setTimeout(() => {
            resolve("setTimeout2");
            console.log(4)
        })

        resolve("p2")
    }).then(data => {
        console.log(data)
    })

    setTimeout(() => {
        resolve("setTimeout1")
        console.log(5)
    }, 0)
}).then(data => {
    console.log(data)
})

console.log(6)

// 示例4
// script start -> async1 start -> async2 -> async1 end -> setTimeout
// await 后面的代码会进入微任务栈
async function async1() {
    console.log("async1 start");
    await async2();
    conosle.log("async1 end");
}

async function async2() {
    console.log("async2");
}

console.log("script start");

setTimeout(function () {
    console.log("setTimeout");
}, 0);

async1();