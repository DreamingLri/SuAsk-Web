// import request from "@/utils/http/request";

import request from "@/utils/http/request";

interface ResponseData<T = any> {
    code: number;
    message: string;
    data?: T;
}

// interface GetAskAllParams {
//     page: number;
//     user_id: number;
//     sort_type: number;
// }

// export interface GetAskAllResponse {
//     question_list: QuestionItem[];
//     remain_page: number;
// }

// export async function GetAskAll(
//     data: GetAskAllParams
// ): Promise<GetAskAllResponse> {
//     return request<ResponseData, any>({
//         url: "/questions/public/get",
//         method: "get",
//         params: data,
//     })
//         .then((res) => {
//             return Promise.resolve(res.data);
//         })
//         .catch((err) => {
//             return Promise.reject(err);
//         });
// }

// interface GetKeyWordsParams {
//     sort_type: number;
//     keyword: string;
// }

// interface GetKeyWordsResponse {
//     words: { value: string }[];
// }

// export async function GetKeyWords(
//     data: GetKeyWordsParams
// ): Promise<GetKeyWordsResponse> {
//     return request<ResponseData, any>({
//         url: "/questions/public/get/keywords",
//         method: "get",
//         params: data,
//     })
//         .then((res) => {
//             return Promise.resolve(res.data);
//         })
//         .catch((err) => {
//             return Promise.reject(err);
//         });
// }

// interface GetAskAllByKeywordParams {
//     page: number;
//     keyword: string;
//     user_id: number;
//     sort_type: number;
// }

// export async function GetAskAllByKeyword(
//     data: GetAskAllByKeywordParams
// ): Promise<GetAskAllResponse> {
//     return request<ResponseData, any>({
//         url: "/questions/public/search",
//         method: "get",
//         params: data,
//     })
//         .then((res) => {
//             return Promise.resolve(res.data);
//         })
//         .catch((err) => {
//             return Promise.reject(err);
//         });
// }

interface FavoriteParams {
    question_id: number;
    user_id: number;
}

interface FavoriteResponse {
    is_favorited: boolean;
}

export async function FavoriteRequest(
    data: FavoriteParams
): Promise<FavoriteResponse> {
    return request<ResponseData, any>({
        url: "/questions/public/favorite",
        method: "post",
        data: data,
    })
        .then((res) => {
            if (res.code !== 0) {
                return Promise.reject(res.message);
            }
            return Promise.resolve(res.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
