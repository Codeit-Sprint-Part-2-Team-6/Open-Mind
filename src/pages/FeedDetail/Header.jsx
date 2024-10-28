import styled from 'styled-components';
import { shareKakao } from '../../utills/KakaoShare';

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
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
  margin-top: 40px;
`;

const ProfileImage = styled.img`
  height: 104px;
  width: auto;
  margin-top: 10px;
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

const ShareIcon = styled.img`
  width: 100%;
  height: 100%;
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo src='/images/contents/logo.svg' />
      <ProfileImage src='/images/contents/profile.svg' />
      <UserName as='h2'>이동훈</UserName>
      <ShareContainer>
        <ShareIconLink href='https://example.com/share'>
          <ShareIcon src='/images/icons/ic_share.svg' />
        </ShareIconLink>
        <ShareIconLink onClick={shareKakao} href='/post'>
          <ShareIcon src='/images/icons/ic_kakao-share.svg' />
        </ShareIconLink>
        <ShareIconLink href='https://facebook.com/share'>
          <ShareIcon src='/images/icons/ic_facebook-share.svg' />
        </ShareIconLink>
      </ShareContainer>
    </HeaderContainer>
  );
}

export default Header;
