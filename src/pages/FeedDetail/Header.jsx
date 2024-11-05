import styled from 'styled-components';
import { shareKakao } from '../../utills/KakaoShare';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Toast from '../../components/Toast';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const BackGroundImage = styled.img`
  width: 100%;
  max-width: 1200px;
  height: 178px;
  object-fit: cover;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    height: 234px;
  }
`;

const LogoWrapper = styled(Link)`
  margin-top: 40px;
  position: absolute;
`;

const Logo = styled.img`
  width: 126px;
  height: 50px;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    height: 68px;
  }
`;

const ProfileImageWrap = styled.div`
  height: 104px;
  width: 104px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
  background-color: ${({ theme }) => theme.gray[10]};
  border-radius: 50%;
  overflow: hidden;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    height: 136px;
    width: 136px;
    top: 130px;
  }
`;

const ProfileImage = styled.img`
  width: 104px;
  height: 104px;
  border-radius: 50%;
  position: absolute;
  mix-blend-mode: ${(props) => props.theme.mixBlendMode};
  background-color: #f0f0f0; /* 이미지가 로드되기 전 배경색 */

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    height: 136px;
    width: 136px;
  }
`;

const UserName = styled.h1`
  margin-top: 40px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
  line-height: 1.875rem;

  @media (${({ theme }) => theme.typography.device.tabletMn}) {
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
    line-height: 2.5rem;
    margin-top: 46px;
  }
`;

const ShareContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const ShareIconLink = styled.a`
  width: 40px;
  height: 40px;
  cursor: pointer;
  mix-blend-mode: ${(props) => props.theme.mixBlendMode};
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

function Header({ id, image, name, questionsCount }) {
  const [showToast, setShowToast] = useState(false);

  const copyCurrentUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
    } catch (error) {
      alert('URL 복사에 실패했습니다.');
    }
  };

  const handleKakaoShare = () => {
    shareKakao(id, image, name, questionsCount);
  };

  return (
    <HeaderContainer>
      <BackGroundImage src='/images/backgrounds/feed-detail-header.svg' />
      <LogoWrapper to='/'>
        <Logo src='/images/contents/logo.svg' />
      </LogoWrapper>
      <ProfileImageWrap>
        <ProfileImage src={image} />
      </ProfileImageWrap>
      <UserName>{name}</UserName>
      <ShareContainer>
        <CopyUrlBtn onClick={copyCurrentUrl}>
          <ShareIcon src='/images/icons/ic_share.svg' />
        </CopyUrlBtn>
        <ShareIconLink onClick={handleKakaoShare}>
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

      {showToast && <Toast message='URL이 복사되었습니다' onClose={() => setShowToast(false)} />}
    </HeaderContainer>
  );
}

export default Header;
