import axios from 'axios';

const BASE_URL = 'https://openmind-api.vercel.app/11-6';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// POST
export async function createSubject(name) {
  try {
    const response = await axios.post(
      `${BASE_URL}/subjects/`,
      { name, team: '11-6' },
      {
        headers: DEFAULT_HEADERS,
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error creating subject:', error);
    throw new Error('데이터 생성에 실패했습니다.');
  }
}

// GET
export async function getSubjects({ sort, page, pageSize } = {}) {
  const queryParams = {
    limit: pageSize || undefined,
    offset: page && pageSize ? (page - 1) * pageSize : undefined,
    sort: sort || undefined,
  };

  try {
    const response = await axios.get(`${BASE_URL}/subjects/`, {
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch subjects:', error);
    throw error;
  }
}

export async function getSubjectById(subjectId) {
  try {
    const response = await axios.get(`${BASE_URL}/subjects/${subjectId}/`, {
      headers: DEFAULT_HEADERS,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching subject:', error);
  }
}

// DELETE
export async function deleteSubjectById(subjectId) {
  try {
    const response = await axios.delete(`${BASE_URL}/subjects/${subjectId}/`, {
      headers: DEFAULT_HEADERS,
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting subject:', error);
  }
}
