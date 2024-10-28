import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';

// 사용자 상태 (로컬스토리지로 관리)
const userStore = devtools(
  persist(
    (set) => ({
      userId: null, // 사용자 ID
      setUserId: (id) => {
        set({ userId: id });
        localStorage.setItem('userId', id);
      },
    }),
    { name: 'user-storage' },
  ),
);

// 피드 상태
const feedStore = devtools((set) => ({
  feedList: [], // 질문함 목록 (get /{team}/subjects)
  order: 'latest', // 정렬
  currentPage: 1, // 현재 페이지
  selectedFeed: null, // 선택한 피드 (feedDetail)
  questions: {}, // 선택한 피드의 질문 목록
  selectedQuestion: null, // 답변중인 질문
  modalVisible: false, // 모달창이 활성화된 상태인지
  // 좋아요 등 추가 상태

  setFeedList: (feeds) => set({ feedList: feeds }),
  setOrder: (order) => set({ order }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedFeed: (feedId) => set({ selectedFeed: feedId }),
  setQuestions: (feedId, questions) =>
    set((state) => ({ questions: { ...state.questions, [feedId]: questions } })),
  setSelectedQuestion: (questionId) => set({ selectedQuestion: questionId }),
  setModalVisible: () => set((state) => ({ modalVisible: !state.modalVisible })),
}));

// 스토어 생성
const useUserStore = create(userStore);
const useFeedStore = create(feedStore);

// User 관련 스토어
export const useUser = () => useUserStore(useShallow((state) => state));

// Feed 관련 스토어
export const useFeed = () => {
  return useFeedStore(useShallow((state) => state));
};
