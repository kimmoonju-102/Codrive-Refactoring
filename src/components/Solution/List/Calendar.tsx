import styled from 'styled-components';
import { IcArrowLeftSmallGray, IcArrowRightSmallGray } from '../../../assets';

interface CalendarProps {
  date: {
    year: number;
    month: number;
  };
  handleClickPrevBtn: () => void;
  handleClickMonth: (month: number) => void;
  handleClickNextBtn: () => void;
}

const Calendar = ({
  date,
  handleClickPrevBtn,
  handleClickMonth,
  handleClickNextBtn,
}: CalendarProps) => {
  const { year, month } = date;
  const monthCalendar = Array.from({ length: 12 }, (_, idx) => idx + 1);
  return (
    <CalendarContainer>
      <YearContainer>
        <IcArrowLeftSmallGray onClick={handleClickPrevBtn} />
        <Year>{year}</Year>
        <IcArrowRightSmallGray onClick={handleClickNextBtn} />
      </YearContainer>

      <MonthBoard>
        {monthCalendar.map((month) => {
          return <Month key={month}>{month}</Month>;
        })}
      </MonthBoard>
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.article`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 5.6rem;

  width: 100%;
`;

const YearContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 1rem 1.2rem;

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray500};
  border-top-left-radius: 1.2rem;
  border-top-right-radius: 1.2rem;

  background-color: ${({ theme }) => theme.colors.gray600};
`;

const Year = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title_semiBold_14};
`;

const MonthBoard = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);

  width: 100%;
  padding: 1.7rem 1.9rem 1.7rem 1.8rem;

  background-color: ${({ theme }) => theme.colors.gray700};
  border-bottom-left-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
`;

const Month = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.8rem;
  height: 2.8rem;

  border-radius: 3rem;
  color: ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.fonts.title_bold_14};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray500};
    color: ${({ theme }) => theme.colors.gray100};
  }
`;
