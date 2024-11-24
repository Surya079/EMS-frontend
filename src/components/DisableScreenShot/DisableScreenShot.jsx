import { useEffect } from "react";

// Function to apply blackout with message
const applyBlackoutWithMessage = () => {
  // Add class to html element
  document.documentElement.classList.add("screenshot-detected");

  // Create a message container dynamically
  const messageDiv = document.createElement("div");
  // Set id to the message
  messageDiv.id = "refresh-message";
  // Set position fixed
  messageDiv.style.position = "fixed";
  // Set top to 50%
  messageDiv.style.top = "50%";
  // Set left to 50%
  messageDiv.style.left = "50%";
  // Set transform to translate (-50%, -50%)
  messageDiv.style.transform = "translate(-50%, -50%)";
  // Set background color to white
  messageDiv.style.backgroundColor = "white";
  // Set color to black
  messageDiv.style.color = "black";
  // Set padding to 20px
  messageDiv.style.padding = "20px";
  // Set border radius to 8px
  messageDiv.style.borderRadius = "8px";
  // Set z-index higher than blackout layer
  messageDiv.style.zIndex = "10000";
  // Set text align to center
  messageDiv.style.textAlign = "center";
  // Set inner html to the message
  messageDiv.innerHTML = `
      <p>
        This website might have sensitive information. As a security measure, taking screenshots or performing any action above the website screen is not allowed. This is to protect both you and us from potential security threats. Please refresh the page to continue.
      </p>
      <button style="background-color: #4CAF50; color: white; padding: 14px 20px; margin: 8px 0; border: none; cursor: pointer; border-radius: 5px;" onclick="window.location.reload()">Refresh</button>`
  // Append the message to the body
  document.body.appendChild(messageDiv);
};

// Custom hook to detect screenshot and apply blackout with message
const usePersistentScreenshotBlackout = () => {
  useEffect(() => {
    // Flag to track if screenshot has been detected
    let isScreenshotDetected = false;

    // Function to handle screenshot detection
    const handleScreenshotDetection = () => {
      // If screenshot has not been detected before
      if (!isScreenshotDetected) {
        // Set flag to true
        isScreenshotDetected = true;
        // Call function to apply blackout with message
        applyBlackoutWithMessage();
      }
    };

    // Function to handle visibility change
    const handleVisibilityChange = () => {
      // If the page is not visible
      if (document.visibilityState === "hidden") {
        // Call function to handle screenshot detection
        handleScreenshotDetection();
      }
    };

    // Add event listener to window blur event
    window.addEventListener("blur", handleScreenshotDetection);
    // Add event listener to visibility change event
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Return function to remove event listeners on unmount
    return () => {
      // Remove event listener from window blur event
      window.removeEventListener("blur", handleScreenshotDetection);
      // Remove event listener from visibility change event
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};

// Export the custom hook
export default usePersistentScreenshotBlackout;
