import axios from "axios";

export const placeHolderImage = 'https://pbs.twimg.com/profile_images/970625933160857601/R8RSJs1w.jpg';

export const dummyPosts = [
    {
      id: 1,
      username: 'Kakao-Ryan',
      userProfilePicture: 'url', // TODO: check if post information can be returned with post owner's picture
      pictures: `http://thumbnail.10x10.co.kr/webimage/image/basic600/349/B003499095-1.jpg?cmd=thumb&w=400&h=400&fit=true&ws=false`,
      content:
        '모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다. 모든 국민은 종교의 자유를 가진다. 국가는 농·어민과 중소기업의 자조조직을 육성하여야 하며, 그 자율적 활동과 발전을 보장한다. 모든 국민은 양심의 자유를 가진다. 누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다.',
      like_id: [1,2,3],
      comments: [{
        id: 1,
        username: 'parkcoding',
        content: 'this is a comment'
      },
      { 
        id: 2,
        username: 'choicoding',
        content: 'this is a comment2'
      }],
      createdAt: '2019-02-24T16:17:47.000Z',
      updatedAt: '2021-02-24T16:17:47.000Z',
    },
    {
      id: 2,
      username: 'Kakao-Ryan',
      pictures: `https://pbs.twimg.com/profile_images/960057734782599168/i4byMDXc_400x400.jpg`,
      content:
        '형사피고인은 유죄의 판결이 확정될 때까지는 무죄로 추정된다. 모든 국민은 행위시의 법률에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여 거듭 처벌받지 아니한다. 모든 국민은 행위시의 법률에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여 거듭 처벌받지 아니한다. 모든 국민은 고문을 받지 아니하며, 형사상 자기에게 불리한 진술을 강요당하지 아니한다.',
      like_id: [21,2,3],
      createdAt: '2019-02-25T16:17:47.000Z',
      updatedAt: '2021-06-23T16:17:47.000Z',
    },
    {
      id: 3,
      username: 'Kakao-Ryan',
      pictures: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbgpK6fO4bN1_K13z4NsV8bEmUSM4QVGDIHA&usqp=CAU`,
      content:
        '모든 국민은 고문을 받지 아니하며, 형사상 자기에게 불리한 진술을 강요당하지 아니한다. 모든 국민은 양심의 자유를 가진다. 모든 국민은 사생활의 비밀과 자유를 침해받지 아니한다. 연소자의 근로는 특별한 보호를 받는다. 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.',
      like_id: [31,2,3],
      comments: [{
        username: 'parkcoding',
        content: 'this is a comment'
      },
      {
        username: 'choicoding',
        content: 'this is a comment2'
      }],
      createdAt: '2019-02-26T16:17:47.000Z',
      updatedAt: '2021-07-15T16:17:47.000Z',
    },
    {
      id: 4,
      username: 'Kakao-Ryan',
      pictures: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkZJ5Q8D34TuBhtOrVhQqefFtUg3-mObhCaA&usqp=CAU`,
      content:
        '형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다. 모든 국민은 고문을 받지 아니하며, 형사상 자기에게 불리한 진술을 강요당하지 아니한다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를 법원에 청구할 권리를 가진다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다.',
      like_id: [1,23,24,5,3],
      comments: [{
        username: 'parkcoding',
        content: 'this is a comment'
      }],
      createdAt: '2019-02-27T16:17:47.000Z',
      updatedAt: '2021-07-20T16:17:47.000Z',
    },
    {
      id: 5,
      username: 'Kakao-Ryan',
      pictures: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhvV_E78KbT1tUN59ABH2x_kax2ZQYfa_Xtw&usqp=CAU`,
      content:
        '주거에 대한 압수나 수색을 할 때에는 검사의 신청에 의하여 법관이 발부한 영장을 제시하여야 한다. 대한민국은 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다. 국가유공자·상이군경 및 전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의 기회를 부여받는다. 여자의 근로는 특별한 보호를 받으며, 고용·임금 및 근로조건에 있어서 부당한 차별을 받지 아니한다. 모든 국민은 주거의 자유를 침해받지 아니한다.',
      like_id: [1,23,24,5,3],
      createdAt: '2019-02-28T16:17:47.000Z',
      updatedAt: '2021-07-24T16:17:47.000Z',
    },
    {
        id: 6,
        username: 'Kakao-Ryan',
        pictures: `https://mblogthumb-phinf.pstatic.net/MjAxODAyMDlfMTUw/MDAxNTE4MTQwMzU5MTg5.Oa08rhN1s4a3KaURjUMnzH6rt1OAB2j-IY4s3EVLaLwg.ZTqC-PuZbSaMnPq83wEHXWo7Mte7zpEUQnzk0et55vMg.JPEG.cool911016/image_2850383221518140327546.jpg?type=w800`,
        content:
          '모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다. 모든 국민은 종교의 자유를 가진다. 국가는 농·어민과 중소기업의 자조조직을 육성하여야 하며, 그 자율적 활동과 발전을 보장한다. 모든 국민은 양심의 자유를 가진다. 누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다.',
        like_id: [1,23,24,5,3],
        createdAt: '2019-02-24T16:17:47.000Z',
        updatedAt: '2019-07-24T19:17:47.000Z',
      },
      {
        id: 7,
        username: 'Kakao-Ryan',
        pictures: `http://www.nonghyupmall.com/prdimg/01/017/026/002/002/8020780126_0_400.jpg`,
        content:
          '형사피고인은 유죄의 판결이 확정될 때까지는 무죄로 추정된다. 모든 국민은 행위시의 법률에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여 거듭 처벌받지 아니한다. 모든 국민은 행위시의 법률에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여 거듭 처벌받지 아니한다. 모든 국민은 고문을 받지 아니하며, 형사상 자기에게 불리한 진술을 강요당하지 아니한다.',
        like_id: [1,23,24,5,3],
        createdAt: '2019-02-25T16:17:47.000Z',
        updatedAt: '2019-02-25T16:17:47.000Z',
      },
      {
        id: 8,
        username: 'Kakao-Ryan',
        pictures: `https://contents.lotteon.com/itemimage/LO/13/63/99/84/74/_1/36/39/98/47/5/LO1363998474_1363998475_1.jpg/dims/resizemc/400x400`,
        content:
          '모든 국민은 고문을 받지 아니하며, 형사상 자기에게 불리한 진술을 강요당하지 아니한다. 모든 국민은 양심의 자유를 가진다. 모든 국민은 사생활의 비밀과 자유를 침해받지 아니한다. 연소자의 근로는 특별한 보호를 받는다. 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.',
        like_id: [1,23,24,5,3],
        createdAt: '2019-02-26T16:17:47.000Z',
        updatedAt: '2019-02-26T16:17:47.000Z',
      },
      {
        id: 9,
        username: 'Kakao-Ryan',
        pictures: `http://gdimg.gmarket.co.kr/1685473693/still/400?ver=1570688978`,
        content:
          '형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다. 모든 국민은 고문을 받지 아니하며, 형사상 자기에게 불리한 진술을 강요당하지 아니한다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를 법원에 청구할 권리를 가진다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다.',
        like_id: [1,23,24,5,3],
        createdAt: '2019-02-27T16:17:47.000Z',
        updatedAt: '2019-02-27T16:17:47.000Z',
      },
      {
        id: 10,
        username: 'Kakao-Ryan',
        pictures: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3XylE88Vi3ZQp63cql3gOVnG4YFjrcJ8noA&usqp=CAU`,
        content:
          '주거에 대한 압수나 수색을 할 때에는 검사의 신청에 의하여 법관이 발부한 영장을 제시하여야 한다. 대한민국은 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다. 국가유공자·상이군경 및 전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의 기회를 부여받는다. 여자의 근로는 특별한 보호를 받으며, 고용·임금 및 근로조건에 있어서 부당한 차별을 받지 아니한다. 모든 국민은 주거의 자유를 침해받지 아니한다.',
        like_id: [1,23,24,5,3],
        createdAt: '2019-02-28T16:17:47.000Z',
        updatedAt: '2019-02-28T16:17:47.000Z',
      },
];

// userInfo: {
//     "id": PK,
//     "username": "accountName",
//     "profilephoto": "./image/dafault_profile.jpg", // default image
//     "posts": "posts[]",
//     "postCount": "postCount", => this is not needed as we can get it from posts.length;
//     "followers": "followerCount",
//     "following": "followingCount",
// }

export const otherUserPosts = [
  {
    id: 1,
    user_id: 1,
    username: 'John Smith',
    picture: `https://i.pinimg.com/originals/18/d1/34/18d1343ffdb9089814f640119ee6d0d6.png`, 
    content:
      'Hello my friend!',
    like_id: [1,231342323,3,6,7,9],
    createdAt: '2019-02-25T16:17:47.000Z',
    updatedAt: '2021-06-23T16:17:47.000Z',
  },
  {
    id: 2,
    user_id: 1,
    username: 'John Smith',
    picture: `https://item.kakaocdn.net/do/9ac8ba2dd82efb5cad54d5c7451167a14022de826f725e10df604bf1b9725cfd`,
    content:
      'Hello world!',
    like_id: [3,4,5],
    comments: [{
      id: 1,
      username: 'parkcoding',
      content: 'this is a comment'
    },
    {
      id: 2,
      username: 'choicoding',
      content: 'this is a comment2'
    }],
    createdAt: '2019-02-26T16:17:47.000Z',
    updatedAt: '2021-07-15T16:17:47.000Z',
  },
];

export const dummyOtherUserInfo = {
  id: 124341248912, // PK,
  username: 'JSmith', // Handle string empty space in param userId: Ryan Park
  profilePhoto: 'http://image.kyobobook.co.kr/newimages/giftshop_new/goods/400/1459/S1584498253783.jpg',
  followers: 1234,
  following: 23432,
  name: 'John Smith'
}

// export const dummyMyUserInfo = {
//   id: 231342323, // PK,
//   username: 'Kakao-Ryan',
//   profilePhoto: placeHolderImage,
//   followers: 123, // [userId1, userId2, ...]
//   following: 300,
//   name: 'Ryan Kim',
//   // introduction: 'Hello world! Nice to meet you'
// }

export const dummyMyUserInfo = {
  id: 6, // PK,
  username: 'Kakao-Ryan',
  profilePhoto: placeHolderImage,
  email: 'kryan@gmail.com',
  name: 'Ryan Kim',
}

// export const dummyMyUserInfo = {
//   id: 8, // PK,
//   username: 'Kakao-Apeach',
//   profilePhoto: placeHolderImage,
//   email: 'apeach@gmail.com',
//   name: 'Peach Lee',
// }
