import React, { useEffect, useState } from "react";

// Define the type for the API response
interface GreetingResponse {
  message: string;
}

const Greeting: React.FC = () => {
  const [greeting, setGreeting] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Fetch the greeting from the Express API
  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await fetch("/api/greet");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: GreetingResponse = await response.json();
        setGreeting(data.message);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchGreeting();
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <h1>{greeting ? greeting : "Loading..."}</h1>
      )}
    </div>
  );
};

export default Greeting;
