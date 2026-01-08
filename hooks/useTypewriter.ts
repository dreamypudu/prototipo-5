import { useState, useEffect, useRef } from 'react';

// A short, royalty-free typewriter click sound, encoded in Base64 to avoid external file dependencies.
const TYPEWRITER_SOUND_BASE64 = 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAASAAADbWF2ZTAuOTguNAAAAFRFTkMAAAAMAAADaHR0cDovL3d3dy5sYW1lLm1wMy5uZXQAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eGFwPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4YXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhhcDpDcmVhdG9yVG9vbD0iTGF2ZjU3LjM0LjEwMiIgeGFwTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NEE0MzBGOTZCMjQxMUU1ODg2OERFNjQ4M0NCMDVBMyIgeGFwTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NEE0MzBGQTYyMjQxMUU1ODg2OERFNjQ4M0NCMDVBMyI+IDx4YXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk0QTQzMEY3NkIyNDExRTU4ODY4REU2NDgzQ0IwNUEzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk0QTQzMEY4NkIyNDExRTU4ODY4REU2NDgzQ0IwNUEzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+AAsKxAAAAAAAAAAAAAAAAAAAAAAAAD//3RleHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eGFwPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4YXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhhcDpDcmVhdG9yVG9vbD0iTGF2ZjU3LjM0LjEwMiIgeGFwTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NEE0MzBGQjZCMjQxMUU1ODg2OERFNjQ4M0NCMDVBMyIgeGFwTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NEE0MzBGQzZCMjQxMUU1ODg2OERFNjQ4M0NCMDVBMyI+IDx4YXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk0QTQzMEY5NkIyNDExRTU4ODY4REU2NDgzQ0IwNUEzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk0QTQzMEY5NkIyNDExRTU4ODY4REU2NDgzQ0IwNUEzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+//uRoBADIgAAAAAAAAAAAAAIg9oBAAA////+vNgrgAB2AABn//////AAAAAIAAAB3//3I0AgBAAAAkAAAAAAAAAAAAAIg9oBAAA////+vNgsQADWAABn//////AAAAAIAAAB3//3I0AwBoAAAHoAAAAAAAAAAAAIg9oBAAA////+vNg9gADWAABn//////AAAAAIAAAB3//3I0BACgAAAaAAAAAAAAAAAAAIg9oBAAA////+vNhFgADmAABn//////AAAAAIAAAB3//3I0BAAwAAADwAAAAAAAAAAAAIg9oBAAA////+vNkLQADmAABn//////AAAAAIAAAB3//3I0BwBAAAAqAAAAAAAAAAAAAIg9oBAAA////+vNk/AADWAABn//////AAAAAIAAAB3//3I0CgBgAAAGwAAAAAAAAAAAAIg9oBAAA////+vNlngADWAABn//////AAAAAIAAAB3//3I0CwA4AAABsAAAAAAAAAAAAIg9oBAAA////+vNn/AADeAABn//////AAAAAIAAAB3//3I0DAAoAAADQAAAAAAAAAAAAAIg9oBAAA////+vNo/wADeAABn//////AAAAAIAAAB3//3I0EwBAAAAUAAAAAAAAAAAAAIg9oBAAA////+vNqLgADeAABn//////AAAAAIAAAB3//3I0FQBwAAABYAAAAAAAAAAAAAIg9oBAAA////+vNsugADeAABn//////AAAAAIAAAB3//3I0FwAwAAABYAAAAAAAAAAAAAIg9oBAAA////+vNuAgADeAABn//////AAAAAIAAAB3//3I0GAAYAAABYAAAAAAAAAAAAAIg9oBAAA////+vNv3gADeAABn//////AAAAAIAAAB3//3I0GQAQAAABYAAAAAAAAAAAAAIg9oBAAA////+vNxogADeAABn//////AAAAAIAAAB3//3I0GgA4AAABYAAAAAAAAAAAAAIg9oBAAA////+vNy6AADeAABn//////AAAAAIAAAB3//3I0GwAoAAABYAAAAAAAAAAAAAIg9oBAAA////+vN0EwADeAABn//////AAAAAIAAAB3//3I0GwAYAAABYAAAAAAAAAAAAAIg9oBAAA////+vN00gADeAABn//////AAAAAIAAAB3//3I0GwBAAAABYAAAAAAAAAAAAAIg9oBAAA////+vN16gADeAABn//////AAAAAIAAAB3//3I0GwBgAAABYAAAAAAAAAAAAAIg9oBAAA////+vN3kwADeAABn//////AAAAAIAAAB3//3I0GwBwAAABYAAAAAAAAAAAAAIg9oBAAA////+vN4vgADeAABn//////AAAAAIAAAB3//3I0HAAwAAABYAAAAAAAAAAAAAIg9oBAAA////+vN59gADeAABn//////AAAAAIAAAB3//3I0HAAQAAABYAAAAAAAAAAAAAIg9oBAAA////+vN7eAADeAABn//////AAAAAIAAAB3//3I0HAAoAAABYAAAAAAAAAAAAAIg9oBAAA////+vN8VwADeAABn//////AAAAAIAAAB3//3I0HAAYAAABYAAAAAAAAAAAAAIg9oBAAA////+vN9AgADeAABn//////AAAAAIAAAB3//3I0HAAYAAABYAAAAAAAAAAAAAIg9oBAAA////+vN9twADeAABn//////AAAAAIAAAB3//3I0HAAYAAABYAAAAAAAAAAAAAIg9oBAAA////+vN+0AADeAABn//////AAAAAIAAAB3//3I0HAAYAAABYAAAAAAAAAAAAAIg9oBAAA////+vN/owADeAABn//////AAAAAIAAAB3//3I0HAAYAAABYAAAAAAAAAAAAAIg9oBAAA////+vOAbAADeAABn//////AAAAAIAAAB3//3I0HAAYAAABYAAAAAAAAAAAAAIg9oBAAA////+vOBOgADeAABn//////AAAA';

export const useTypewriter = (text: string, speed: number = 50): string => {
  const [displayedText, setDisplayedText] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize the Audio object once.
  useEffect(() => {
    audioRef.current = new Audio(TYPEWRITER_SOUND_BASE64);
    audioRef.current.volume = 0.2; // Adjust volume to be less intrusive
  }, []);

  useEffect(() => {
    setDisplayedText(''); // Reset on new text
    if (text) {
        let i = 0;
        const typingInterval = setInterval(() => {
          if (i < text.length) {
            const char = text.charAt(i);
            setDisplayedText(prev => prev + char);

            // Play sound for non-space characters
            if (char !== ' ' && audioRef.current) {
                audioRef.current.currentTime = 0; // Rewind to the start
                const playPromise = audioRef.current.play();
                // In case of rapid plays, browsers might interrupt the previous play promise.
                // We can safely ignore this error.
                if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                }
            }

            i++;
          } else {
            clearInterval(typingInterval);
          }
        }, speed);

        return () => {
          clearInterval(typingInterval);
        };
    }
  }, [text, speed]);

  return displayedText;
};
