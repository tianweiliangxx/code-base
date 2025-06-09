class RequestQueue {
    constructor(maxConcurrent) {
        this.maxConcurrent = maxConcurrent; // 最大并发请求数
        this.currentConcurrent = 0; // 当前并发请求数
        this.queue = []; // 请求队列
    }

    add(request) {
        return new Promise((resolve, reject) => {
            this.queue.push({ request, resolve, reject })
            this.processQueue();
        })
    }

    processQueue() {
        if (this.queue.length > 0 && this.currentConcurrent < this.maxConcurrent) {
            const { request, resolve, reject } = this.queue.shift();
            this.currentConcurrent++;
            request().then(resolve).catch(reject).finally(() => {
                this.currentConcurrent--;
                // this.processQueue();
            })
        }
    }
}

function fetchData(url) {
    return fetch(url).then(response => response.json())
}

// 使用请求队列
const requestQueue = new RequestQueue(5); // 设定最大并发请求数为5

const urls = [
    "https://jkapi.com/api/one_yan?type=json",
    "https://jkapi.com/api/one_yan?type=json",
    "https://jkapi.com/api/one_yan?type=json",
    "https://jkapi.com/api/one_yan?type=json",
    "https://jkapi.com/api/one_yan?type=json",
    "https://jkapi.com/api/one_yan?type=json",
    "https://jkapi.com/api/one_yan?type=json",
    "https://jkapi.com/api/one_yan?type=json",
    "https://jkapi.com/api/one_yan?type=json",
    "https://jkapi.com/api/one_yan?type=json"
]

const requests = urls.map(url => () => fetchData(url));
Promise.all(requests.map(request => requestQueue.add(request)))
    .then(results => {
        console.log("所有请求完成", results)
    })
    .catch(error => {
        console.error("请求失败", error)
    })