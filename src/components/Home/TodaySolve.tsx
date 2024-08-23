import { Cell, Label, Pie, PieChart } from 'recharts';
import styled from 'styled-components';
import { BtnInformation } from '../../assets';

const CustomLabel = ({ viewBox, value1, value2 }: any) => {
  const { cx, cy } = viewBox; // 중심 좌표
  return (
    <g>
      <StyledText x={cx} y={cy} textAnchor="middle">
        {value1}
      </StyledText>
      <StyledSubText x={cx} y={cy + 25} textAnchor="middle">
        {value2}
      </StyledSubText>
    </g>
  );
};

const TodaySolve = () => {
  const data = [{ value: 1 }];

  const percentageMap = {
    1: 15,
    2: 30,
    3: 45,
    4: 60,
    5: 75,
    6: 90,
    7: 100,
  };

  const maxProblems = 7; // 나중에 props로 받을 것
  const solvedProblems = 1; // 나중에 props로 받을 것
  const percentage = (solvedProblems / maxProblems) * 100;

  const chartData = [{ name: 'Solved', value: percentage }];
  const fullCircle = [{ name: 'Full', valule: 100 }];

  console.log(chartData[0]);

  // console.log(progress);

  return (
    <Container>
      <TitleContainer>
        <Title>오늘 문제풀이</Title>
        <BtnInformation />
      </TitleContainer>
      <Subtitle>
        달성 가능한 목표를 세우고, <br />
        매일 설천해보세요
      </Subtitle>

      <PieContainer>
        <PieChart width={200} height={200}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#BCFFCB" />
              <stop offset="100%" stopColor="#08FF3F" />
            </linearGradient>
          </defs>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={80}
            startAngle={90} // 12시 방향
            endAngle={-270} // 퍼센트에 맞춰 끝 각도를 설정
            paddingAngle={0} // 빈틈 없애기
            fill="#292A2F"
            stroke="none"
            cornerRadius={15}
          />
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={80}
            startAngle={90} // 12시 방향
            endAngle={90 - (360 * percentage) / 100} // 퍼센트에 맞춰 끝 각도를 설정
            paddingAngle={0} // 빈틈 없애기
            fill="url(#colorGradient)"
            stroke="none"
            cornerRadius={15}
          >
            <Cell key={`cell-0`} fill="url(#colorGradient)" />
            <Label
              content={<CustomLabel value1={solvedProblems} value2="문제" />}
              position="center"
            />
          </Pie>
        </PieChart>
      </PieContainer>
    </Container>
  );
};

export default TodaySolve;

const Container = styled.div`
  width: 100%;
  max-width: 29.7rem;

  padding: 3.4rem 3.4rem 7.2rem;

  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.gray800};
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 10.1rem;
  align-items: center;

  margin-bottom: 2.2rem;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.title_bold_20}
  color: ${({ theme }) => theme.colors.white};
`;

const Subtitle = styled.p`
  ${({ theme }) => theme.fonts.body_ligth_16};
  /* background-color: cornflowerblue; */
  color: ${({ theme }) => theme.colors.gray300};
`;

const PieContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;

  /* max-width: 16.9rem; */

  margin-top: 3.1rem;

  /* background-color: purple; */
`;

const StyledText = styled.text`
  fill: #fff;
  ${({ theme }) => theme.fonts.title_bold_32};
`;

const StyledSubText = styled.text`
  ${({ theme }) => theme.fonts.body_ligth_16};
  fill: #fff;
`;
