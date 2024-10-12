import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ErrorModal from '../common/Modal/ErrorModal/ErrorModal';
import GroupInfo from '../components/GroupDetail/GroupInfo';
import Header from '../components/GroupDetail/Header';
import PageLayout from '../components/PageLayout/PageLayout';
import useGetDetail from '../libs/hooks/GroupDetail/useGetDetail';
import useGetGroupId from '../libs/hooks/GroupDetail/useGetGroupId';
import usePostPublicRequest from '../libs/hooks/GroupDetail/usePostPublicRequest';
import LoadingPage from './LoadingPage';

const GroupDetail = () => {
  const { state } = useLocation();
  const { disabledApply } = state ? state : { disabledApply: false };
  const { id } = useParams();
  if (!id) return;
  const isPrivateGroup = id.includes('-');

  const { groupDataFromUuid, isGroupDataLoading } = isPrivateGroup
    ? useGetGroupId(id)
    : { groupDataFromUuid: null, isGroupDataLoading: false };
  const { roomId } =
    isPrivateGroup && !isGroupDataLoading && groupDataFromUuid.data;

  const { data, isLoading } = useGetDetail(
    isPrivateGroup ? roomId : parseInt(id)
  );
  const loading = isGroupDataLoading || isLoading;

  const {
    title,
    owner,
    imageSrc,
    requestedCount,
    capacity,
    tags,
    introduce,
    information,
  } = !isLoading && data.data;
  const { mutation, err } = usePostPublicRequest(imageSrc);

  const isError = err.length > 0;

  const [onErrModal, setOnErrModal] = useState(isError);

  const handleClickApplyBtn = () => {
    mutation(parseInt(id));
  };

  useEffect(() => {
    setOnErrModal(isError);
  }, [isError]);

  return (
    <PageLayout category="그룹">
      {loading ? (
        <LoadingPage isPageLoading={true} />
      ) : (
        <GroupDetailContainer>
          <Header title={title} tags={tags} />
          <GroupImg src={imageSrc} />
          <GroupInfo
            id={parseInt(id)}
            owner={owner}
            requestedCount={requestedCount}
            capacity={capacity}
            introduce={introduce}
            information={information}
          />

          {!disabledApply && (
            <BtnContainer>
              <ApplyBtn type="button" onClick={handleClickApplyBtn}>
                신청하기
              </ApplyBtn>
            </BtnContainer>
          )}
        </GroupDetailContainer>
      )}
      {onErrModal && (
        <ErrorModal onClose={() => setOnErrModal(false)} errMsg={err} />
      )}
    </PageLayout>
  );
};

export default GroupDetail;

const GroupDetailContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;

  width: 61.3rem;
  padding: 6.4rem 0 23.2rem;
`;

const GroupImg = styled.img`
  min-width: 61.2rem;

  width: 100%;
  height: 36.8rem;
  margin-bottom: 2.4rem;
  margin-left: 0.1rem;

  border-radius: 1.6rem;

  object-fit: cover;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 11.5rem;
  left: 0;

  width: 100%;
`;

const ApplyBtn = styled.button`
  width: 47.4rem;
  padding: 1.8rem 19.5rem;

  box-shadow: rgb(183 255 199 / 70%) 0 0 1.5rem;

  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.codrive_green};
  color: ${({ theme }) => theme.colors.gray900};
  ${({ theme }) => theme.fonts.title_bold_24};
`;
