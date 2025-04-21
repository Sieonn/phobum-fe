// // api/images/images.ts
// import { IMAGES } from '../endpoints';
// import { ImageUploadRequest, ImageResponse } from './types';
// import { api } from '..';

// export const imagesApi = {
//     upload: async (data: ImageUploadRequest) => {
//         const formData = new FormData();
//         formData.append('image', data.image);
//         formData.append('title', data.title);
//         formData.append('description', data.description);

//         return api.post<ImageResponse>('/api/images', formData, {  // '/api' prefix 추가
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // 토큰 추가
//             }
//         });
//     },

//     // 이미지 목록 조회
//     getList: async () => {
//         return api.get<ImageResponse[]>(IMAGES.LIST);
//     },

//     // 이미지 상세 조회
//     getDetail: async (id: string) => {
//         return api.get<ImageResponse>(IMAGES.DETAIL(id));
//     },

//     // 이미지 수정
//     update: async (id: string, data: Partial<ImageUploadRequest>) => {
//         const formData = new FormData();
//         if (data.image) formData.append('image', data.image);
//         if (data.title) formData.append('title', data.title);
//         if (data.description) formData.append('description', data.description);

//         return api.patch<ImageResponse>(IMAGES.UPDATE(id), formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });
//     },

//     // 이미지 삭제
//     delete: async (id: string) => {
//         return api.delete(IMAGES.DELETE(id));
//     },

//     // 좋아요 추가
//     like: async (id: string) => {
//         return api.post(IMAGES.LIKE(id));
//     },

//     // 좋아요 취소
//     unlike: async (id: string) => {
//         return api.delete(IMAGES.UNLIKE(id));
//     }
// };
// api/images/images.ts
import { IMAGES } from '../endpoints';
import { ImageUploadRequest, ImageResponse } from './types';
import { api } from '..';

export const imagesApi = {
    upload: async (data: ImageUploadRequest) => {
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('title', data.title);
        formData.append('description', data.description);

        // 토큰 가져오기 및 유효성 검사
        // const token = localStorage.getItem('accessToken');
        const token = sessionStorage.getItem('refreshToken');
        if (!token) {
            throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
        }

        return api.post<ImageResponse>('/api/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
    },

    // getList: async () => {
    //     const token = sessionStorage.getItem('refreshToken');
    //     return api.get<ImageResponse[]>(IMAGES.LIST, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     });
    // },
    getList: async () => {
        // 토큰을 사용하지 않거나, 인증 없이 요청
        return api.get<ImageResponse[]>(IMAGES.LIST); // 토큰 없이 요청
      },
    getDetail: async (id: string) => {
        // const token = localStorage.getItem('accessToken');
        const token = sessionStorage.getItem('refreshToken');
        return api.get<ImageResponse>(IMAGES.DETAIL(id), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },

    update: async (id: string, data: Partial<ImageUploadRequest>) => {
        const formData = new FormData();
        if (data.image) formData.append('image', data.image);
        if (data.title) formData.append('title', data.title);
        if (data.description) formData.append('description', data.description);

        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
        }

        return api.patch<ImageResponse>(IMAGES.UPDATE(id), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
    },

    delete: async (id: string) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
        }

        return api.delete(IMAGES.DELETE(id), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },

    like: async (id: string) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
        }

        return api.post(IMAGES.LIKE(id), null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },

    unlike: async (id: string) => {
        const token = sessionStorage.getItem('refreshToken');
        if (!token) {
            throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
        }

        return api.delete(IMAGES.UNLIKE(id), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
};