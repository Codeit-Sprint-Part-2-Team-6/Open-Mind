import axios from 'axios';

const BASE_URL = 'https://openmind-api.vercel.app/11-6';
const TEAM = '11-6';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Post
export async function createQuestions(subjectId, content) {
  const params = {
    subjectId,
    content,
    like: 0,
    dislike: 0,
    team: TEAM,
    answer: {},
  };

  try {
    const response = await axios.post(`${BASE_URL}/subjects/${subjectId}/questions/`, params, {
      headers: DEFAULT_HEADERS,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating questions:', error);
  }
}

// GET
export async function getQuestions(subjectId) {
  try {
    const response = await axios.get(`${BASE_URL}/subjects/${subjectId}/questions/`, {
      headers: DEFAULT_HEADERS,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}
