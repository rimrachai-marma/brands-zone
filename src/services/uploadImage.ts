interface Options {
  endpoint: string;
  type: string;
  onProgress?: (progress: number) => void;
  timeout?: number;
}

export const uploadImage = (
  file: File,
  options: Options
): {
  promise: Promise<{ url: string; alt: string }>;
  xhr: XMLHttpRequest;
  abort: () => void;
} => {
  const { onProgress, type, endpoint, timeout = 120000 } = options;

  const xhr = new XMLHttpRequest();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  formData.append("name", file.name);

  const promise = new Promise<{ url: string; alt: string }>(
    (resolve, reject) => {
      // Track upload progress
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable && onProgress) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          onProgress(percentComplete);
        }
      });

      // Handle successful response
      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            const image = response.data;
            if (!image) {
              reject(new Error("No image in response"));
              return;
            }
            resolve(image);
          } catch (error) {
            console.log("Error parsing JSON response:", error);
            reject(new Error("Invalid JSON response from server"));
          }
        } else {
          try {
            const errorResponse = JSON.parse(xhr.responseText);
            reject(new Error(errorResponse.message));
          } catch (error) {
            console.log("Error parsing JSON error response:", error);
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      });

      // Handle network error
      xhr.addEventListener("error", () => {
        reject(
          new Error("Network error occurred. Please check your connection.")
        );
      });

      // Handle abort
      xhr.addEventListener("abort", () => {
        reject(new Error("Upload cancelled"));
      });

      // Handle timeout
      xhr.addEventListener("timeout", () => {
        reject(new Error("Upload timeout. Please try again."));
      });

      xhr.open("POST", endpoint);
      xhr.timeout = timeout;
      xhr.send(formData);
    }
  );

  return {
    promise,
    xhr,
    abort: () => xhr.abort(),
  };
};
