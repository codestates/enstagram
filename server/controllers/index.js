module.exports = {
    //! Users
    signup: require("./users/signup"),                      //* 회원가입
    login: require("./users/login"),                        //* 로그인
    accessToken: require("./users/accessToken"),            //* 액세스 토큰 요청
    refreshToken: require("./users/refreshToken"),          //* 리프레쉬 토큰 요청
    test: require("./users/test"),                          //* 테스트 데이터 출력
    getUserInfo: require("./users/getUserInfo"),            //* 유저 데이터 가져오기
    editUserInfo: require("./users/editUserInfo"),          //* 유저 기본 정보 변경
    editPassword: require("./users/editPassword"),          //* 유저 비밀번호 변경
    editProfilephoto: require("./users/editProfilephoto"),  //* 유저 프로필사진 변경

    //! Facebook
    OAuth: require("./facebook/OAuth"),                     //* 페이스북 OAuth 유저정보 요청

    //! Posts
    createPosts: require("./posts/createPosts"),            //* 포스트 생성
    getPosts: require("./posts/getPosts"),                  //* 포스트 정보 가져오기

    //! Comments
    createComments: require("./comments/createComments"),   //* 코멘트 생성
    getComments: require("./comments/getComments"),         //* 코멘트 정보 가져오기
    deleteComments: require("./comments/deleteComments"),   //* 코멘트 삭제

    //! Likes
    like: require("./Likes/like"),                          //* 좋아요 활성
    getLike: require("./Likes/getLike"),                    //* 좋아요 정보 가져오기

    //! Follow
    follow: require("./follow/follow"),                     //* 팔로우
};