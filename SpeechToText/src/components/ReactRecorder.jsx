import React from 'react';
import AudioTimer from './AudioTimer.jsx';
import { ReactMic } from 'react-mic';
import axios from 'axios';

const ReactRecorder = () => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [elapsedTime, setElapsedTime] = React.useState(0);
    const [voice, setVoice] = React.useState(false);
    const [recordBlobLink, setRecordBlobLink] = React.useState(null);
    const [encodedAudio, setEncodedAudio] = React.useState('');
    const [transcribedText, setTranscribedText] = React.useState('');


    const onStop = (recordedBlob) => {
        const audioBlob = recordedBlob.blob;
        setRecordBlobLink(URL.createObjectURL(audioBlob));
        setEncodedAudio(audioBlob);
        setIsRunning(false);
    };

    const startHandle = () => {
        setElapsedTime(0);
        setIsRunning(true);
        setVoice(true);
    };

    const stopHandle = () => {
        setIsRunning(false);
        setVoice(false);
    };

    const clearHandle = () => {
        setIsRunning(false);
        setVoice(false);
        setRecordBlobLink(null);
        setElapsedTime(0);
        setEncodedAudio(''); 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!encodedAudio) {
            alert("No audio recorded to submit.");
            return;
        }
    
        const formData = new FormData();
        formData.append('audio', encodedAudio, 'recording.wav');
        
        try {
            const response = await axios.post('http://localhost:5000/transcribe_audio', formData, {

            });
            setTranscribedText(response.data.response)

            // console.log('Audio uploaded successfully:', response.data);
            alert('Audio uploaded successfully!');
        } catch (error) {
            // console.error('Error uploading audio:', error);
            alert('Error uploading audio');
        }
    };
    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div style={{ marginLeft: "350px",
        }}>
        <form onSubmit={handleSubmit} action="http://127.0.0.1:5000/transcribe_audio" method="POST">
            <div className="max-w-sm border py-4 px-6 mx-auto">
                <h2 className="font-semibold text-[#111]">Audio Recorder</h2>
                <AudioTimer 
                    isRunning={isRunning}
                    elapsedTime={elapsedTime}
                    setElapsedTime={setElapsedTime} 
                />
                
                <ReactMic
                    record={voice}
                    className="sound-wave w-full text-[#fff]"
                    onStop={onStop}
                    strokeColor="#000000"
                />
                
                <div className="">
                    {recordBlobLink ? <button onClick={clearHandle} className="text-[#111] font-medium text-[16px]">Clear</button> : "" }
                </div>
                
                <div className="mt-2">
                    {!voice ? (
                        <button type="button" onClick={startHandle} className="bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px]">Start</button>
                    ) : (
                        <button type="button" onClick={stopHandle} className="bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px]">Stop</button>
                    )}
                </div>
                
                <div className="">
                    {recordBlobLink ? <audio controls src={recordBlobLink} className="mt-6" /> : "" }
                </div>
                
                {encodedAudio && (
                    <div className="mt-4">
                        <button 
                            type="submit" 
                            className="bg-[#FF4081] text-[#fff] rounded-md py-2 px-4 font-semibold text-[16px]"
                        >
                            Submit Audio
                        </button>
                    </div>
                )}
            </div>
        </form>
        <div>
        <textarea
            name='response-content'
            id='response-content'
            value={transcribedText}
            onChange={handleChange}
            style={{
                width: '100%',
                height: '150px',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
            }}
            placeholder="please wait for transcription and summary..."
        />
        </div>
        </div>
    );
};

export default ReactRecorder;
