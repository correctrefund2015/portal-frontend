import axios from "axios";

// const API_URL = `${process.env.HOST}/api`;
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-request`;

export const getServiceStatsPerClient = async (clientId: string) => {
  const response = await axios.get(`${API_URL}/stats/${clientId}`);
  return response.data;
};

export const getServiceRequestPerClient = async (clientId: string) => {
  try {
    if (clientId) {
      const response = await axios.get(`${API_URL}/all/${clientId}`);
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

export const getServiceRequestById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data as IServiceRequest;
  } catch (error) {
    throw error;
  }
};

export const uploadDocumentByServiceRequest = async (
  serviceRequestId: string,
  file: File
): Promise<IServiceDocument> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    // commment
    const response = await axios.post<IServiceDocument>(
      `${API_URL}/${serviceRequestId}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", error.response.data);
        throw new Error(
          `Upload failed: ${error.response.data.message || "Unknown error"}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        throw new Error("Upload failed: No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
        throw new Error(`Upload failed: ${error.message}`);
      }
    } else {
      // Something else happened
      console.error("Unexpected error:", error);
      throw new Error("Upload failed: Unexpected error");
    }
  }
};
