// background.js

let isRecording = false;
let mediaRecorder;
let chunks = [];

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'start-recording') {
    if (isRecording) {
      sendResponse({ started: false, message: 'Already recording.' });
    } else {
      try {
        const userMediaStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

        mediaRecorder = new MediaRecorder(userMediaStream);

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const recordedBlob = new Blob(chunks, { type: 'video/webm' });
          // Implement submission logic here, e.g., send to an endpoint
          console.log('Recording stopped:', recordedBlob);
        };

        mediaRecorder.start();
        isRecording = true;
        sendResponse({ started: true });
      } catch (error) {
        console.error('Error starting recording:', error);
        sendResponse({ started: false, error: error.message });
      }
    }
  } else if (message.type === 'stop-recording') {
    if (!isRecording) {
      sendResponse({ stopped: false, message: 'Not recording.' });
    } else {
      mediaRecorder.stop();
      isRecording = false;
      sendResponse({ stopped: true });
    }
  }
});
