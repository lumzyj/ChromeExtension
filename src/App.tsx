import './App.css';
import { useState, useEffect } from 'react';
import Logo from './assets/favicon32.png';
import Setting from './assets/setting-2.svg';
import Close from './assets/close-circle.svg';
import Monitor from './assets/monitor.svg';
import Microphone from './assets/microphone.svg';
import VideoCamera from './assets/video-camera.svg';
import Copy from './assets/copy.png';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const closeApp = () => {
    // You can add additional cleanup logic here if needed
    window.close(); // This will close the current window or tab
  };

  useEffect(() => {
    // Additional setup logic can go here, e.g., requesting permissions
  }, []);

  const startRecording = async () => {
    if (isRecording) {
      return;
    }

    try {
      const userMediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      // Start recording
      const mediaRecorder = new MediaRecorder(userMediaStream);
      const chunks: BlobPart[] = [];

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
      setStream(userMediaStream);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (!isRecording) {
      return;
    }

    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    }

    setIsRecording(false);
  };

  return (
    <>
      <div className="body-cover">
        <div className="body-content">
          <div className="logo-container">
            <img src={Logo} className="logo" alt="Logo" />
            <div className="Helpmeout text-indigo-950 text-base font-bold font-['Sora']">HelpMeOut</div>
          </div>
          <div className="icons-container">
            <img src={Setting} className="Setting2 w-5 h-5 justify-center items-center inline-flex relative" alt="Setting" />
            <button className="CloseButton" onClick={closeApp}>
              <img src={Close} alt="Close" />
            </button>
          </div>
        </div>
        <div className="text-slate-600 mt-4" style={{ clear: 'both' }}>
          This extension helps you record<br></br> and share help videos with ease.
        </div>
        <div className="text-center mt-8">
          <img src={Monitor} alt="Monitor" />
          <img src={Copy} alt="Copy" />
        </div>
        <div className="text-icon">
          <div className="FullScreen text-gray-400 text-sm font-medium font-['Work Sans']">Full screen</div>
          <div className="CurrentTab text-indigo-950 text-sm font-semibold font-['Work Sans']">Current Tab</div>
        </div>

        <div className="Frame41 w-64 h-12 pl-4 pr-3 py-3 rounded-xl border border-indigo-950 justify-between items-center inline-flex mt-8">
          <div className="Frame37 justify-start items-center gap-2 flex">
            <div className="Frame46 justify-start items-center gap-1 flex">
              <img src={VideoCamera} alt="Video Camera" />
              <div className="Camera text-indigo-950 text-sm font-medium font-['Work Sans']">Camera</div>
            </div>
            <input
              className="w-9 h-5 p-0.5 appearance-none rounded-xl bg-indigo-950 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type="checkbox"
              role="switch"
              id="flexSwitchChecked"
              defaultChecked
            />
          </div>
        </div>

        <div className="Frame42 w-64 h-12 pl-4 pr-3 py-3 rounded-xl border border-indigo-950 justify-start items-center gap-32 mt-8">
          <div className="Frame38 grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
            <div className="Frame46 justify-start items-center gap-1 flex">
              <img src={Microphone} alt="Microphone" />
              <div className="Audio text-indigo-950 text-sm font-medium font-['Work Sans']">Audio</div>
              <div className="flex justify-end">
                <input
                  className="w-9 h-5 p-0.5 appearance-none rounded-xl bg-indigo-950 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchChecked"
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </div>

        <div className="Button w-64 h-12 flex-col justify-center items-center inline-flex mt-8">
          <div className="Button self-stretch h-12 flex-col justify-center items-center gap-3 flex">
            {isRecording ? (
              // Render the "Stop Recording" button when recording is in progress
              <button
                className="CustomButton p-4 bg-red-500 rounded-xl text-white text-base font-medium font-['Work Sans']"
                onClick={stopRecording}
              >
                Stop Recording
              </button>
            ) : (
              // Render the "Start Recording" button when not recording
              <button
                className="CustomButton p-4 bg-indigo-950 rounded-xl text-white text-base font-medium font-['Work Sans']"
                onClick={startRecording}
              >
                Start Recording
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;







