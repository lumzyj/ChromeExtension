// content.js

// Create the popup HTML element
const popup = document.createElement('div');
popup.id = 'my-popup';
popup.style.position = 'fixed';
popup.style.bottom = '20px';
popup.style.left = '20px';
popup.innerHTML = `
  <h2>Recording in Progress</h2>
  <button id="stopRecording">Stop Recording</button>
`;

// Add the popup to the main page's DOM
document.body.appendChild(popup);

// Listen for click events on the "Stop Recording" button
const stopRecordingButton = document.getElementById('stopRecording');
stopRecordingButton.addEventListener('click', () => {
  // Communicate with your extension's background script to stop recording
  chrome.runtime.sendMessage({ type: 'stop-recording' }, (response) => {
    if (response.stopped) {
      // Handle any UI updates or cleanup here
    }
  });
});

  