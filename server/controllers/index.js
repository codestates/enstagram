module.exports = {
    //! Users
    signup: require("./users/signup"),                      //* 회원가입
    login: require("./users/login"),                        //* 로그인
    accessToken: require("./users/accessToken"),            //* 액세스 토큰 요청
    refreshToken: require("./users/refreshToken"),          //* 리프레쉬 토큰 요청
    test: require("./users/test"),                          //* 테스트 데이터 출력
    getUserInfo: require("./users/getUserInfo"),            //* 유저 데이터 가져오기

    //! Facebook
    OAuth: require("./facebook/OAuth"),                     //* 페이스북 OAuth 유저정보 요청

    //! Posts
    createPosts: require("./posts/createPosts"),            //* 포스트 생성
    getPosts: require("./posts/getPosts"),                  //* 포스트 정보 가져오기

    //! Comments
    createComments: require("./comments/createComments"),   //* 코멘트 생성
    getComments: require("./comments/getComments"),         //* 코멘트 정보 가져오기

    //! Likes
    onLike: require("./Likes/onLike"),                      //* 좋아요 활성
    getLike: require("./Likes/getLike"),                    //* 좋아요 정보 가져오기

    //! Follow
    followers: require("./follow/followers"),               //* 팔로우
};