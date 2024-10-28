import Card from './Card';
import CardImg from '../assets/images/Cat.png';

const mockData = [
  {
    id: 0,
    name: '아초는고양이',
    imageSource: CardImg,
    questionCount: 3,
  },
  {
    id: 1,
    name: '다른 고양이',
    imageSource: CardImg,
    questionCount: 5,
  },
];

export default function CardListTest() {
  return (
    <>
      {mockData.map((data) => (
        <Card
          key={data.id}
          name={data.name}
          imageSource={data.imageSource}
          questionCount={data.questionCount}
        />
      ))}
    </>
  );
}
// mockData가 잘 출력이 되는지 Test차원에 만든겁니다.
// Card 공통 컴퍼넌트가 잘 출력이 되는지도 Test차원으로 만든겁니다.
