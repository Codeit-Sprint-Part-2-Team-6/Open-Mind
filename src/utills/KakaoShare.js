const { Kakao } = window;

export const shareKakao = () => {
  if (!Kakao.isInitialized()) {
    Kakao.cleanup();

    Kakao.init('e69f2c4b1ed944c523867388a90b8bab');
  }

  Kakao.Link.sendCustom({
    templateId: 113569,
    templateArgs: {
      PROFILE:
        'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png', // 테스트 이미지
      TITLE: '오픈 마인드 피드',
      DESC: '피드 소개글',
    },
  });
};
