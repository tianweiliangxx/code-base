// 1. XMLHttpRequest
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const axios = require('axios');

// 创建XMLHttpRequest对象
var xhr = new XMLHttpRequest();
xhr.addEventListener('progress', function(event) {
    if(event.lengthComputable) {

        // 获取已传输的数据量和总数据量
        var loaded = event.loaded;
        var total = event.total;

        var progress = Math.round((loaded / total) * 100)

        console.log(progress)
    }
})

xhr.open("GET", "https://jkapi.com/api/one_yan?type=json");
xhr.send(); 

xhr.onreadystatechange = function() {
    if ( xhr.status === 200) {
        console.log(xhr.responseText);
    }
};


// 2. Fetch API
// 发送请求
fetch('https://jkapi.com/api/one_yan?type=json')
  .then((response) => {
    if (response.ok) {
      // 创建可读的ReadableStream对象
      const reader = response.body.getReader();
      let receivedLength = 0;
      let chunks = [];
 
 
      // 监听readable事件
      reader.read().then(function processResult(result) {
        if (result.done) {
          // 请求完成后的处理
          const responseData = new Uint8Array(receivedLength);
          let position = 0;
          for (let chunk of chunks) {
            responseData.set(chunk, position);
            position += chunk.length;
          }
          console.log('请求完成');
          console.log(responseData);
          return;
        }
 
 
        // 处理读取的数据
        const chunk = result.value;
        receivedLength += chunk.length;
 
        console.log(response.headers.get('content-length'))
 
        // 在这里更新进度条的状态，例如更新进度条的宽度或百分比显示
        const percentComplete = (receivedLength / response.headers.get('content-length')) * 100;
        console.log(`请求进度：${percentComplete}%`);
 
 
        // 继续读取下一块数据
        return reader.read().then(processResult);
      });
    } else {
      // 请求失败的处理
      throw new Error('请求失败');
    }
  })
  .catch((error) => {
    // 请求发生错误的处理
    console.log(error);
  });


// 3. axios
axios.get("https://jkapi.com/api/one_yan?type=json", {
    onDownloadProgress: function (progressEvent) {
        const percentComplete = (progressEvent.loaded / progressEvent.total) * 100
        console.log(`下载进度：${percentComplete}`)
    }
}).then((response) => {
    console.log(response.data)
}).catch(error => {
    console.log(error)
})