import React, { useState, useEffect } from "react";
import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("San Francisco");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    // We do NOT change the case here for frontend display.
    setKeyword(searchKeyword);

    // Use lowercase keyword for the actual search
    const loweredKeyword = (searchKeyword || "").toLowerCase();
    if (loweredKeyword !== keyword.toLowerCase()) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (!keyword) return;

    const loweredKeyword = (keyword || "").toLowerCase();

    locationRequest(loweredKeyword)
      .then(locationTransform)
      .then((result) => {
        setError(null);
        setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [keyword]); // Triggers when `keyword` changes

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword, // Keep the original keyword for the UI
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
