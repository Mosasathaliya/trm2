'use client';

/**
 * @fileoverview Custom hook for processing audio from the microphone.
 * It handles starting and stopping the microphone, encoding audio chunks
 * into a specified format, and providing the audio data as a data URI.
 */

import { useState, useRef, useCallback } from 'react';

// The whisper model works best with 'audio/webm' or 'audio/mp4'.
type MimeType = 'audio/webm' | 'audio/mp4' | 'audio/ogg';

interface AudioProcessor {
  isRecording: boolean;
  start: () => Promise<void>;
  stop: () => void;
}

// Hook signature
export function useAudioProcessor(
  onAudioData: (dataUri: string) => void,
  mimeType: MimeType = 'audio/webm'
): AudioProcessor {
  const [isRecording, setIsRecording] = useState(false);
  // Refs to hold the media stream and recorder instances
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // Ref to store audio chunks as they are recorded
  const audioChunksRef = useRef<Blob[]>([]);

  // Function to start the audio recording process
  const start = useCallback(async () => {
    // Check if recording is already in progress
    if (isRecording || mediaRecorderRef.current) {
      console.warn('Recording is already in progress.');
      return;
    }

    try {
      // Request microphone access from the user
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // Create a new MediaRecorder instance with the stream
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      // Event listener for when audio data is available
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Event listener for when recording stops
      recorder.onstop = () => {
        // Combine all recorded chunks into a single Blob
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const reader = new FileReader();

        // Convert the Blob to a base64 data URI
        reader.onloadend = () => {
          const base64data = reader.result as string;
          onAudioData(base64data); // Pass the data URI to the callback
        };
        reader.readAsDataURL(audioBlob);

        // Clean up: stop all tracks on the media stream
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        // Reset refs
        mediaRecorderRef.current = null;
        mediaStreamRef.current = null;
        // Clear the audio chunks buffer for the next recording
        audioChunksRef.current = [];
      };

      // Start recording
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting audio recording:', error);
      // Ensure everything is cleaned up on error
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      setIsRecording(false);
    }
  }, [isRecording, onAudioData, mimeType]);

  // Function to stop the audio recording
  const stop = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  return { isRecording, start, stop };
}
