import styled from 'styled-components';

const ToolbarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 26px;
`;

const AnswerTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  background-color: ${({ theme }) => theme.gray[10]};
  border: 1px solid ${({ $answered, theme }) => ($answered ? theme.brown[40] : theme.gray[40])};
  border-radius: 8px;
  font-weight: ${({ theme }) => theme.typography.caption1Medium.fontWeight};
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};
  color: ${({ $answered, theme }) => ($answered ? theme.brown[40] : theme.gray[40])};
  line-height: 18px;
`;

const KebabButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const KebabMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.small};
  border: 0.5px solid ${({ theme }) => theme.gray[20]};
  border-radius: 8px;
  z-index: 1000;
`;

const KebabMenuItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.gray[20]};
  }

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 5px;
    right: 5px;
    bottom: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.gray[30]};
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export default function QuestionToolbar({
  isOwner,
  menuOpen,
  handleToggleMenu,
  handleMenuItemClick,
  currentAnswer,
  menuRef,
}) {
  return (
    <ToolbarContainer>
      <AnswerTag $answered={!!currentAnswer || (currentAnswer && currentAnswer.isRejected)}>
        {currentAnswer ? '답변 완료' : '미답변'}
      </AnswerTag>
      {isOwner && (
        <KebabButton className='kebab-button-class' onClick={handleToggleMenu}>
          <img src='/images/icons/kebab-button.svg' alt='케밥 메뉴' />
        </KebabButton>
      )}
      {menuOpen && (
        <KebabMenu ref={menuRef}>
          {currentAnswer ? ( // 질문에 답변이 있을 때
            currentAnswer.isRejected ? ( // 답변이 거절된 경우
              <>
                <KebabMenuItem onClick={() => handleMenuItemClick('edit')}>답변수정</KebabMenuItem>
                <KebabMenuItem onClick={() => handleMenuItemClick('delete')}>
                  답변삭제
                </KebabMenuItem>
              </>
            ) : (
              // 답변이 완료된 경우
              <>
                <KebabMenuItem onClick={() => handleMenuItemClick('edit')}>답변수정</KebabMenuItem>
                <KebabMenuItem onClick={() => handleMenuItemClick('reject')}>
                  답변거절
                </KebabMenuItem>
                <KebabMenuItem onClick={() => handleMenuItemClick('delete')}>
                  답변삭제
                </KebabMenuItem>
              </>
            )
          ) : (
            // 질문에 답변이 없는 경우
            <KebabMenuItem onClick={() => handleMenuItemClick('reject')}>답변거절</KebabMenuItem>
          )}
        </KebabMenu>
      )}
    </ToolbarContainer>
  );
}
