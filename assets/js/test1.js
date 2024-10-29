function sendDataToBackend(value) {
    fetch('test2.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Assuming you're sending JSON data
      },
      body: JSON.stringify({ data: value }), // Sending the value as JSON data
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text(); // assuming backend returns text
    })
    .then(data => {
      // Do something with the response from the backend
      console.log(data);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
    });
  }
  