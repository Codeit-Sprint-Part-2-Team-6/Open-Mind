import axios from 'axios';

const BASE_URL = 'https://openmind-api.vercel.app/11-6';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// PATCH
export async function updateAnswer(answerId, content, isRejected = false) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/answers/${answerId}/`,
      {
        content,
        isRejected,
      },
      { headers: DEFAULT_HEADERS },
    );
    console.log('답변 수정');
    return response.data;
  } catch (error) {
    console.error('Error updating answer:', error);
  }
}

// DELETE
export async function deleteAnswer(answerId) {
  try {
    await axios.delete(`${BASE_URL}/answers/${answerId}/`, {
      headers: DEFAULT_HEADERS,
    });
  } catch (error) {
    console.error('Error deleting answer:', error);
  }
}
