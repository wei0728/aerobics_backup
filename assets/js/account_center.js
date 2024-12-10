window.onload = function(){
    jump_pack_rank();
    marathon_jump_pack_rank();
}
function jump_pack_rank() {
    document.getElementById('rank_name').innerText = "檢測模式-"+document.getElementById('jump_pack').innerText
    send_score('jump_pack', 'sport');
}
function deep_squat_rank(){
    document.getElementById('rank_name').innerText = "檢測模式-"+document.getElementById('deep_squat').innerText
    send_score('deep_squat', 'sport');
}
function left_ankle_left_knee_rank(){
    document.getElementById('rank_name').innerText = "檢測模式-"+document.getElementById('left_ankle_left_knee').innerText
    send_score('left_ankle_left_knee', 'sport');
}
function side_bend_rank(){
    document.getElementById('rank_name').innerText = "檢測模式-"+document.getElementById('sidebend').innerText
    send_score('sidebend', 'sport');
}
function front_bend_rank(){
    document.getElementById('rank_name').innerText = "檢測模式-"+document.getElementById('frontbend').innerText
    send_score('frontbend', 'sport');
}
function marathon_jump_pack_rank() {
    document.getElementById('m_rank_name').innerText = "挑戰模式-"+document.getElementById('m_jump_pack').innerText
    send_score('jump_pack', 'marathon');
}
function marathon_deep_squat_rank(){
    document.getElementById('m_rank_name').innerText = "挑戰模式-"+document.getElementById('m_deep_squat').innerText
    send_score('deep_squat', 'marathon');
}
function marathon_left_ankle_left_knee_rank(){
    document.getElementById('m_rank_name').innerText = "挑戰模式-"+document.getElementById('m_left_ankle_left_knee').innerText
    send_score('left_ankle_left_knee', 'marathon');
}
function marathon_side_bend_rank(){
    document.getElementById('m_rank_name').innerText = "挑戰模式-"+document.getElementById('m_sidebend').innerText
    send_score('sidebend', 'marathon');
}
function marathon_front_bend_rank(){
    document.getElementById('m_rank_name').innerText = "挑戰模式-"+document.getElementById('m_frontbend').innerText
    send_score('frontbend', 'marathon');
}


function send_score(pose, mode){
    var xhr = new XMLHttpRequest();
        
        // Prepare the data to send
        var data = {
            value: pose, // Change 'Your value here' to the value you want to send
            mode: mode
        };
        
        // Convert the data to a JSON string
        var jsonData = JSON.stringify(data);
        
        // Set up the AJAX request
        xhr.open("POST", 'http://127.0.0.1/php/account_center.php', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        
        // Define what happens on successful data submission
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let pattern = /\[.*?\]/g;
            let matches = this.responseText.match(pattern);

            // 解析 JSON 字串為 JavaScript 陣列
            let rank = JSON.parse(matches[0]);

            // 使用 map 函數將每個元素轉換成一個包含該元素的陣列
            let rank2 = rank.map(item => [item]);
            // 查看結果

            if (mode == 'sport'){
                document.getElementById('result1').innerText = '第一名'+ ' '+rank2[0];
                document.getElementById('result2').innerText = '第二名'+ ' '+rank2[1];
                document.getElementById('result3').innerText = '第三名'+ ' '+rank2[2];
                document.getElementById('result4').innerText = '第四名'+ ' '+rank2[3];
                document.getElementById('result5').innerText = '第五名'+ ' '+rank2[4];
            }
            else {
                document.getElementById('m_result1').innerText = '第一名'+ ' '+rank2[0];
                document.getElementById('m_result2').innerText = '第二名'+ ' '+rank2[1];
                document.getElementById('m_result3').innerText = '第三名'+ ' '+rank2[2];
                document.getElementById('m_result4').innerText = '第四名'+ ' '+rank2[3];
                document.getElementById('m_result5').innerText = '第五名'+ ' '+rank2[4];
            }
            // 為數組中的每個項目創建<li>並加到<ul>中
              // Request was successful
                //console.log(xhr.responseText); // Log the response from the server
            }
            else {
                console.log("fail");
            }
        };
        
        // Send the request
        xhr.send(jsonData);
  }