import { useCallback, useState } from "react";

// Define the State type that will handle all possible states of the request
type State<Data, ErrorType> =
  | {
      // When the request is successful
      data: Data;
      loading: false;
      success: true;
      error: ErrorType | undefined;
    }
  | {
      // When the request is ongoing
      data: undefined;
      loading: true;
      success: false;
      error: ErrorType | undefined;
    }
  | {
      // When the request has not been initiated or it's failed
      data: undefined;
      loading: false;
      success: false;
      error: ErrorType | undefined;
    };

// Custom hook to manage request state
export function useRequestState<Data = unknown, ErrorType = unknown>() {
  // Initial state: not loading, no success, no data, no error
  const [state, setState] = useState<State<Data, ErrorType>>({
    loading: false,
    success: false,
    error: undefined,
    data: undefined,
  });

  // Handle loading state
  const setLoading = useCallback((loading: boolean) => {
    setState({
      loading,
      success: false,
      data: undefined,
      error: undefined,
    });
  }, []);

  // Handle successful state
  const setData = useCallback((data: Data) => {
    setState({
      data,
      success: true,
      loading: false,
      error: undefined,
    });
  }, []);

  // Handle error state
  const setError = useCallback((error: ErrorType) => {
    setState({
      data: undefined,
      loading: false,
      success: false,
      error,
    });
  }, []);

  return {
    state, // Current state
    setState, // Function to manually update state (to be used wisely)
    setLoading, // Function to set loading state
    setData, // Function to set successful state with the data
    setError, // Function to set error state with the error message
  };
}
