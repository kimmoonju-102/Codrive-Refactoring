import { useState } from 'react';
import styled from 'styled-components';
import { IcSearch } from '../../../assets';
import { getRoomSearch } from '../../../libs/apis/GroupAll/getRoomSearch';
import { getRoomSort } from '../../../libs/apis/GroupAll/getRoomSort';

const SearchBar = ({
  handleChangeSearchBar,
}: {
  handleChangeSearchBar: (filteredGroups: any[]) => void;
}) => {
  const [searchData, setSearchData] = useState('');

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchData(newValue);

    if (newValue.trim() === '') {
      const allGroupsResponse = await getRoomSort('NEW', 0);
      handleChangeSearchBar(allGroupsResponse.data.rooms || []);
      return;
    }

    try {
      const response = await getRoomSearch(newValue, 0);

      if (response && response.data && Array.isArray(response.data.rooms)) {
        const filteredGroups = response.data.rooms;
        handleChangeSearchBar(filteredGroups);

        if (filteredGroups.length === 0) {
        }
      } else {
        console.error('올바르지 않은 데이터 형식입니다.', response);
      }
    } catch (error) {
      console.error('검색 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <div>
      <SearchBarContainer>
        <Icon>
          <IcSearch />
        </Icon>
        <Input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchData}
          onChange={handleSearchChange}
        />
      </SearchBarContainer>
    </div>
  );
};

const SearchBarContainer = styled.article`
  display: flex;
  align-items: center;

  width: 29.7rem;
  height: 4.8rem;

  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.gray700};
`;

const Input = styled.input`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    ${({ theme }) => theme.fonts.body_ligth_16};
  }
`;

const Icon = styled.p`
  display: flex;

  margin: 0 1.2rem 0 1.8rem;
`;

export default SearchBar;
