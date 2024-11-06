import styled, { keyframes, css, useTheme } from 'styled-components';
import ThumbsUpIcon from './SvgIcons/thumbs-up';
import ThumbsDownIcon from './SvgIcons/thumbs-down';

export default function ReactionSection({
  isLiked,
  isDisliked,
  question,
  handleReaction,
  likeCount,
  dislikeCount,
}) {
  const theme = useTheme();
  return (
    <ReactionContainer>
      <ReactionBox>
        <Reaction $isActive={isLiked} type='like' onClick={() => handleReaction('like')}>
          <AnimatedIcon $isActive={isLiked}>
            <ThumbsUpIcon color={isLiked ? theme.blue : theme.gray[40]} size={16} />
          </AnimatedIcon>
          좋아요 {likeCount}
        </Reaction>
        <Reaction $isActive={isDisliked} type='dislike' onClick={() => handleReaction('dislike')}>
          <AnimatedIcon $isActive={isDisliked}>
            <ThumbsDownIcon color={isDisliked ? theme.gray[60] : theme.gray[40]} size={16} />
          </AnimatedIcon>
          싫어요 {dislikeCount}
        </Reaction>
      </ReactionBox>
    </ReactionContainer>
  );
}

const ReactionContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.gray[30]};
`;

const ReactionBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding-top: 24px;
`;

const bounceUp = keyframes`
  0% { transform: scale(1) translateY(0) translateX(0); }
  50% { transform: scale(1.1) translateY(-4px) translateX(-2px); }
  100% { transform: scale(1) translateY(0) translateX(0); }
`;

const Reaction = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};
  font-weight: ${({ theme }) => theme.typography.caption1.fontWeight};
  line-height: 18px;
  color: ${({ $isActive, type, theme }) =>
    $isActive ? (type === 'like' ? theme.blue : theme.gray[60]) : theme.gray[40]};
  cursor: pointer;
`;

const AnimatedIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ $isActive }) =>
    $isActive
      ? css`
          ${bounceUp} 0.5s ease-in-out
        `
      : 'none'};
`;
