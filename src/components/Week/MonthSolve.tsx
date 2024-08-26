import styled from 'styled-components';
import CommonCalendar from '../Calendar/Calendar';

const MonthSolve = () => {
  return (
    <WeekRateContainer>
      <div>
        <Month>7월 문제풀이 현황</Month>
        <SolveContainer>
          <SolveCount>
            13
            <SolveCountText>문제</SolveCountText>
          </SolveCount>
        </SolveContainer>
        <LongestSolve>
          최장 문제 풀이 기간 <Text>3</Text>일
        </LongestSolve>
        <LongestSolve>
          최장 문제 풀이 기간 <Text>2</Text>개
        </LongestSolve>
      </div>

      <CommonCalendar />
    </WeekRateContainer>
  );
};

export default MonthSolve;

const WeekRateContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 61.1rem;
  padding: 3.4rem 3.8rem 4.2rem 3.4rem;

  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.gray800};
  max-width: 61.1rem;
`;

const Month = styled.p`
  margin-bottom: 3rem;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.title_bold_16};
`;

const SolveContainer = styled.div`
  margin-bottom: 1.6rem;
`;

const SolveCount = styled.span`
  color: ${({ theme }) => theme.colors.codrive_green};

  ${({ theme }) => theme.fonts.title_bold_32};
`;

const SolveCountText = styled.span`
  margin-left: 0.5rem;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.body_medium_16};
`;

const LongestSolve = styled.p`
  margin-bottom: 0.4rem;
  ${({ theme }) => theme.fonts.body_ligth_16};

  color: ${({ theme }) => theme.colors.gray200};
`;

const Text = styled.span`
  ${({ theme }) => theme.fonts.title_bold_16};
  color: ${({ theme }) => theme.colors.white};
`;
