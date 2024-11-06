const APP_KEY = 'e69f2c4b1ed944c523867388a90b8bab';
const URL = 'http://localhost:3000/post';

export const loadKakaoSDK = () => {
  return new Promise((resolve) => {
    if (!window.Kakao) {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
      script.onload = () => {
        window.Kakao.init(APP_KEY);
        resolve(window.Kakao);
      };
      document.body.appendChild(script);
    } else {
      resolve(window.Kakao);
    }
  });
};

export const shareKakao = async (id, image, name, questionsCount) => {
  const Kakao = await loadKakaoSDK();

  if (!Kakao.isInitialized()) {
    Kakao.init(APP_KEY);
  }

  Kakao.Link.sendCustom({
    templateId: 113569,
    templateArgs: {
      mobileWebUrl: `${URL}/${id}`,
      WebUrl: `${URL}/${id}`,
      PROFILE: image,
      USER_NAME: name,
      TITLE: `${name}의 피드`,
      DESC: '익명으로 고민을 나누는 채팅 커뮤니티 - Open Mind',
      COMMEND_COUNT: questionsCount,
    },
  });
};
