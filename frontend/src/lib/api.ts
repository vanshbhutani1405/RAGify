const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface UploadResponse {
  message: string;
  filenames?: string[];
  total_files?: number;
  total_pages?: number;
  total_chunks?: number;
}

export interface QueryRequest {
  question: string;
  session_id?: string;
  rag_type?: string;
}

export async function uploadDocuments(files: File[], ragType: string = "custom"): Promise<UploadResponse> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  formData.append("rag_type", ragType);

  const response = await fetch(`${API_BASE_URL}/api/v1/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "Upload failed" }));
    throw new Error(errorData.detail || `Upload failed: ${response.statusText}`);
  }

  return response.json();
}

export async function* streamQuery(question: string, sessionId: string = "default", ragType: string = "custom"): AsyncGenerator<string> {
  const response = await fetch(`${API_BASE_URL}/api/v1/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, session_id: sessionId, rag_type: ragType } as QueryRequest),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "Query failed" }));
    throw new Error(errorData.detail || `Query failed: ${response.statusText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("No response body");
  }

  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    if (value) {
      yield decoder.decode(value, { stream: true });
    }
  }
}

export async function clearCustomDocuments(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/clear-custom`, {
    method: "POST",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "Clear failed" }));
    throw new Error(errorData.detail || `Clear failed: ${response.statusText}`);
  }
}
