// script.js
var a = '../php/test.php';
    function send(url) {
        // 要发送的数据
        var dataToSend = {
            name: '张三',
            age: 25
        };

        // 在发送请求前，显示发送的数据（可选）
        $('#responseContainer').html(
            '<p>正在发送以下数据：</p>' +
            '<p>姓名：' + dataToSend.name + '</p>' +
            '<p>年龄：' + dataToSend.age + '</p>'
        );

        // 使用 AJAX 发送数据
        $.ajax({
            url: url,    // 使用相对路径，确保路径正确
            type: 'POST',          // 请求方法
            data: dataToSend,      // 发送的数据
            dataType: 'json',      // 预期服务器返回的数据类型
            success: function(response) {
                // 请求成功后的回调函数

                // 将服务器返回的数据显示在页面上
                $('#responseContainer').html(
                    '<p>状态：' + response.status + '</p>' +
                    '<p>消息：' + response.message + '</p>' +
                    '<p>姓名：' + response.data.name + '</p>' +
                    '<p>年龄：' + response.data.age + '</p>'
                );
            },
            error: function(xhr, status, error) {
                // 请求失败时的回调函数

                // 显示错误信息
                $('#responseContainer').html('<p>请求失败：' + error + '</p>');
            }
        });
    };

    send('test.php');

