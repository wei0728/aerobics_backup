function send_score(url){
    var xhr = new XMLHttpRequest();
        
        // Prepare the data to send
        var data = {
            value: score // Change 'Your value here' to the value you want to send
        };
        
        // Convert the data to a JSON string
        var jsonData = JSON.stringify(data);
        
        // Set up the AJAX request
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        
        // Define what happens on successful data submission
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                // Request was successful
                //console.log(xhr.responseText); // Log the response from the server
            }
        };
        
        // Send the request
        xhr.send(jsonData);
}
