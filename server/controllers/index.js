module.exports = {
    signup: require("./users/signup"),              //* 회원가입
    login: require("./users/login"),                //* 로그인
    accessToken: require("./users/accessToken"),    //* 액세스 토큰 요청
    refreshToken: require("./users/refreshToken"),  //* 리프레쉬 토큰 요청
    OAuth: require("./facebook/OAuth"),             //* 페이스북 OAuth 유저정보 요청
    test: require("./users/test"),                  //* 테스트 데이터 출력
};