function sendGet(param) {
    var url = 'choose_mode.php?pose=' + encodeURIComponent(param);
    window.location.href = url;
}

function train(){
    window.location.href = "noob";
}

function getter(mode){
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get('pose');
    if (mode == 'sport'){
        var url = 'pose.php?mode=' + mode + '&pose=' + paramValue;
        window.location.href = url;
    }
    else {
        var url = 'marathon_pose.php?mode=' + mode + '&pose=' + paramValue;
        window.location.href = url;
    }
}

