// api/images/types.ts
export interface ImageUploadRequest {
  image: File;
  title: string;
  description: string;
}

export interface ImageResponse {
  id: string;
  image_url: string;
  title: string;
  description: string;
  user_id: string;
  created_at?: string;
  users: {
      nickname: string;
  };
}

export interface ImageUpdateRequest {
  title?: string;
  description?: string;
  image?: File;
}