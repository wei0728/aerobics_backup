// main.js

if (window.Worker) {
    // 创建 Worker 实例
    const myWorker = new Worker('../assets/js/dino.js');

    // 向 Worker 发送消息
    myWorker.postMessage(10);

    // 接收来自 Worker 的消息
    myWorker.onmessage = function(e) {
        console.log('来自 Worker 的结果：', e.data);
    };

    // 处理 Worker 中的错误
    myWorker.onerror = function(error) {
        console.error('Worker 错误：', error);
    };
} else {
    console.log('你的浏览器不支持 Web Worker。');
}
