import axios from 'axios';

const BASE_URL = 'https://openmind-api.vercel.app/11-6';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export const createAnswer = async ({ questionId, content, isRejected = false }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/questions/${questionId}/answers/`,
      {
        questionId,
        content,
        isRejected,
        team: '11-6',
      },
      { headers: DEFAULT_HEADERS },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating answer:', error);
  }
};

export const createReaction = async ({ id, type }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/questions/${id}/reaction/`,
      {
        type,
      },
      { headers: DEFAULT_HEADERS },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating reaction:', error);
  }
};
