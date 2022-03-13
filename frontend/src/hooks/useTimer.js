const { useState, useRef, useEffect } = require("react");

const useTimer = (initialState = 0) => {
  const isMounted = useRef(true);
  const [timer, setTimer] = useState(initialState);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);

    countRef.current = setInterval(() => {
      if (isMounted.current) {
        setTimer((timer) => timer + 1);
      }
    }, 1000);
  };
  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      if (isMounted.current) {
        setTimer((timer) => timer + 1);
      }
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  };
};
export default useTimer;
