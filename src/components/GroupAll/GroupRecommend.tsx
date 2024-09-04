import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IcBtnInformation } from '../../assets';
import RecommendCard from '../../common/RecommendCard';
import { getRoomRecommend } from '../../libs/apis/GroupAll/getRoomRecommend';

const GroupRecommend = () => {
  const nickname = sessionStorage.getItem('nickname');
  const [groupData, setGroupData] = useState([]);

  const userId = 5;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRoomRecommend(userId);

        // 200 코드 확인 및 데이터 출력
        if (response.code === 200) {
          console.log('API 호출 성공:', response);
          const data = response.data;

          if (data && data.rooms) {
            const limitedRooms = data.rooms.slice(0, 6);
            console.log('가져온 그룹 데이터:', limitedRooms); // 데이터 확인
            setGroupData(limitedRooms);
          } else {
            console.error('추천 그룹 데이터를 불러오지 못했습니다.');
          }
        } else {
          console.error('API 호출이 성공하지 못했습니다:', response);
        }
      } catch (error) {
        console.error('추천 그룹을 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <GroupRecommendContainer>
      <TitleContainer>
        <Nickname>{nickname}</Nickname>님을 위한 오늘의 추천 그룹
        <Notic>
          <IcBtnInformation />
          <Tooltip>
            <Text>
              <TooUser>{nickname}</TooUser>님 만을 위해
            </Text>
            <Text>하루에 6개씩 랜덤으로 그룹을 추천해드려요</Text>
          </Tooltip>
        </Notic>
      </TitleContainer>
      <RecommendCard group={groupData} isLongPage={true} />
    </GroupRecommendContainer>
  );
};

const GroupRecommendContainer = styled.article`
  margin-bottom: 10.2rem;
`;

const TitleContainer = styled.header`
  display: flex;
  align-items: center;

  margin: 0 0 3rem 0.2rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title_bold_24};
`;

const Nickname = styled.p`
  margin-right: 0.4rem;

  color: ${({ theme }) => theme.colors.codrive_green};
  ${({ theme }) => theme.fonts.title_bold_24};
`;

const Notic = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  margin-left: 2.5rem;

  &:hover > div {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip = styled.div`
  display: block;
  position: absolute;
  top: 3rem;
  visibility: hidden;

  width: 22.8rem;
  height: auto;
  padding: 1.2rem 1.1rem;

  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.gray600};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.body_ligth_12};

  white-space: nowrap;

  opacity: 0;
  transform: translateX(-5%); /* 수정된 부분: translate 사용 */
  transition: opacity 0.3s ease-in-out;

  &::after {
    position: absolute;
    bottom: 100%;
    left: 1.7rem;

    margin-left: -0.1rem;

    border-color: transparent transparent ${({ theme }) => theme.colors.gray600};
    border-width: 5px;
    border-style: solid;
    content: '';
  }
`;

const TooUser = styled.span`
  display: inline-flex;

  color: ${({ theme }) => theme.colors.codrive_green};
  ${({ theme }) => theme.fonts.detail_regular_12};
`;

const Text = styled.p`
  margin-top: 0.4rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body_ligth_12};
`;

export default GroupRecommend;
