const BASE_URL = 'https://openmind-api.vercel.app/11-6';

export async function createSubject(name) {
  const response = await fetch(`${BASE_URL}/subjects/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, team: '11-6' }),
  });

  if (!response.ok) {
    throw new Error('데이터 생성에 실패했습니다.');
  }
  return response.json();
}
