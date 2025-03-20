// Handle form submission
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    const fileInput = document.getElementById('document');
    
    if (fileInput.files.length > 0) {
        formData.append('document', fileInput.files[0]);

        // Send the document to the server
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Display the JSON response
            document.getElementById('response-container').innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error uploading document:', error);
            document.getElementById('response-container').innerText = 'Error uploading document.';
        });
    }
});
