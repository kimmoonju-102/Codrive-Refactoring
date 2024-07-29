import { useCallback, useState } from 'react';
import styled from 'styled-components';
import Options from './Options';
import Select from './Select';

const SelectBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 토글
  const handleToggleDropdown = (shouldClose: boolean) => {
    setIsOpen((prev) => (shouldClose ? false : !prev));
  };

  // 선택된 태그 값 업데이트
  const handleChangeTag = (value: string) => {
    setInputValue(value);
  };

  // 옵션을 클릭했을 때 호출되는 함수
  // 선택한 옵션이 현재 선택된 태그와 다를 경우 태그를 변경하고 드롭다운을 닫음
  const handleClickOption = useCallback(
    (option: string) => {
      if (option !== inputValue) {
        handleChangeTag(option);
      }
      setIsOpen(false);
    },
    [handleChangeTag, inputValue]
  );

  return (
    <SelectBoxContainer>
      <Select
        inputValue={inputValue}
        selectedTag={inputValue}
        isOpen={isOpen}
        handleToggleDropdown={handleToggleDropdown}
        handleChangeTag={handleChangeTag}
      />
      {isOpen && <Options onSelectOption={handleClickOption} />}
    </SelectBoxContainer>
  );
};

const SelectBoxContainer = styled.div`
  /* Only comments */
`;

export default SelectBox;
