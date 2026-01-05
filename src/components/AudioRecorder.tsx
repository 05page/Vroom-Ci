import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Send, X, Loader2 } from "lucide-react";

interface AudioRecorderProps {
  onSend: (audioBlob: Blob, duration: number) => void;
  onCancel: () => void;
}

export function AudioRecorder({ onSend, onCancel }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleSend = () => {
    if (audioBlob) {
      onSend(audioBlob, recordingTime);
      resetRecorder();
    }
  };

  const resetRecorder = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleCancel = () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
    }
    resetRecorder();
    onCancel();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl animate-in fade-in slide-in-from-bottom duration-300">
      {!audioBlob ? (
        <>
          {/* Recording State */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="rounded-full h-10 w-10"
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-muted-foreground"}`} />
            <span className="font-bold text-lg">{formatTime(recordingTime)}</span>
            {isRecording && (
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 20 + 10}px`,
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          
          {!isRecording ? (
            <Button
              size="icon"
              onClick={startRecording}
              className="rounded-full h-12 w-12 bg-red-500 hover:bg-red-600"
            >
              <Mic className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              size="icon"
              onClick={stopRecording}
              className="rounded-full h-12 w-12 bg-red-500 hover:bg-red-600"
            >
              <Square className="h-5 w-5" />
            </Button>
          )}
        </>
      ) : (
        <>
          {/* Preview State */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="rounded-full h-10 w-10"
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="flex-1">
            <audio src={audioUrl || undefined} controls className="w-full h-10" />
          </div>
          
          <Button
            size="icon"
            onClick={handleSend}
            className="rounded-full h-12 w-12 shadow-lg shadow-primary/30"
          >
            <Send className="h-5 w-5" />
          </Button>
        </>
      )}
    </div>
  );
}
