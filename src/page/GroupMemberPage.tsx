import styled from 'styled-components';
import GroupInfo from '../components/GroupMember/GroupInfo';
import PageLayout from '../components/PageLayout/PageLayout';

const GroupMemberPage = () => {
  return (
    <PageLayout category="그룹">
      <GroupMemberContainer>
        <GroupInfo />
      </GroupMemberContainer>
    </PageLayout>
  );
};

export default GroupMemberPage;

const GroupMemberContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  padding: 6.4rem 25.7rem 14.4rem;
`;
