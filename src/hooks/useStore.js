import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';

const userStore = devtools(
  persist(
    (set, get) => ({
      users: {}, // 사용자 정보를 { id: name } 형태로 저장

      // 새로운 사용자 추가 또는 기존 사용자 업데이트
      setUser: (id, name) => {
        const updatedUsers = { ...get().users, [id]: name };
        set({ users: updatedUsers });
      },

      // 특정 사용자 정보 가져오기
      getUser: (id) => get().users[id],

      // 사용자 삭제 기능
      removeUser: (id) => {
        const updatedUsers = { ...get().users };
        delete updatedUsers[id];
        set({ users: updatedUsers });
      },

      // 피드 수정 권한 확인
      canEditFeed: (feedOwnerId) => {
        // feedOwnerId가 로컬 스토리지에 저장된 사용자인지 확인
        return Boolean(get().users[feedOwnerId]);
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
