import styled, { keyframes } from 'styled-components';
import { shareKakao } from '../../utills/KakaoShare';
import { useState } from 'react';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('/images/backgrounds/feed-detail-header.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 180px;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    height: 234px;
  }
`;

const Logo = styled.img`
  height: 50px;
  margin-top: 40px;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    height: 68px;
  }
`;

const ProfileImage = styled.img`
  height: 104px;
  margin-top: 10px;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    height: 136px;
    width: 136px;
  }
`;

const UserName = styled.h1`
  margin: 12px 0 0 0;
  font-weight: 400;
`;

const ShareContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const ShareIconLink = styled.a`
  width: 40px;
  height: 40px;
`;

const CopyUrlBtn = styled.div`
  width: 40px;
  hgieht: 40px;
  cursor: pointer;
`;

const ShareIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const fadeInOut = keyframes`
  0% { opacity: 0; bottom: 30px; }
  10% { opacity: 1; bottom: 64px; }
  90% { opacity: 1; bottom: 64px; }
  100% { opacity: 0; bottom: 30px; }
`;

const ToastMessage = styled.div`
  position: fixed;
  // bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 0.875rem;
  animation: ${fadeInOut} 5s ease-in-out forwards;
  z-index: 1000;
`;

function Header() {
  const [showToast, setShowToast] = useState(false);

  const copyCurrentUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      alert('URL 복사에 실패했습니다.');
    }
  };

  return (
    <HeaderContainer>
      <Logo src='/images/contents/logo.svg' />
      <ProfileImage src='/images/contents/profile.svg' />
      <UserName as='h2'>이동훈</UserName>
      <ShareContainer>
        <CopyUrlBtn onClick={copyCurrentUrl}>
          <ShareIcon src='/images/icons/ic_share.svg' />
        </CopyUrlBtn>
        <ShareIconLink onClick={shareKakao} href='/post'>
          <ShareIcon src='/images/icons/ic_kakao-share.svg' />
        </ShareIconLink>
        <ShareIconLink
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <ShareIcon src='/images/icons/ic_facebook-share.svg' alt='페이스북 공유' />
        </ShareIconLink>
      </ShareContainer>

      {showToast && <ToastMessage>URL이 복사되었습니다</ToastMessage>}
    </HeaderContainer>
  );
}

export default Header;
