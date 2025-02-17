import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IcGithub, IcRevise } from '../../assets';
import useGetUser from '../../libs/hooks/MyProfile/useGetUser';
import { handleClickLink } from '../../utils/handleClickLink';
import ProfileEdilt from './ProfileEdit';

const Profile = () => {
  const [modalOn, setModalOn] = useState(false);
  const { data, isLoading } = useGetUser();
  const { comment, githubUrl, language, nickname, profileImg } =
    !isLoading && data?.data;

  // 모달 열기 함수
  const handleOpenModal = () => {
    setModalOn(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setModalOn(false);
  };

  useEffect(() => {
    if (modalOn) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalOn]);

  return (
    <ProfileContainer>
      <ProfileImg src={profileImg} alt="사용자 프로필 이미지"></ProfileImg>
      <ProfileInfo>
        <InfoContainer>
          <Language>{language}</Language>
          <IconWrapper>
            {githubUrl && (
              <IcGithub onClick={() => handleClickLink(githubUrl)} />
            )}
          </IconWrapper>
          <RegisterModalContainer>
            <IcRevise onClick={handleOpenModal} />
          </RegisterModalContainer>
        </InfoContainer>
        <NickName>{nickname}</NickName>
        <Intro>{comment}</Intro>
      </ProfileInfo>
      {modalOn && ( // 모달이 열려 있을 때만 ProfileEdilt 렌더링
        <ModalBackground onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ProfileEdilt
              handleCloseModal={handleCloseModal}
              initialData={!isLoading && data?.data}
            />
          </ModalContent>
        </ModalBackground>
      )}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.article`
  display: flex;

  height: 21.5rem;
  padding: 3.6rem 3.6rem 3.8rem 3.8rem;
  margin-bottom: 6.8rem;

  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.gray800};
`;

const ProfileImg = styled.img`
  width: 13.9rem;
  height: 13.9rem;

  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const ProfileInfo = styled.article`
  margin-left: 2.6rem;
`;
const InfoContainer = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 0.9rem;
`;

const IconWrapper = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
`;

const Language = styled.p`
  padding: 0.6rem 1rem;
  margin-right: 1.4rem;

  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.codrive_green};
  ${({ theme }) => theme.fonts.body_eng_medium_12};
  color: ${({ theme }) => theme.colors.gray900};
`;

const RegisterModalContainer = styled.div`
  padding: 0.6rem;
  margin-left: 50rem;
  cursor: pointer;

  &:hover {
    border-radius: 5rem;
    background-color: ${({ theme }) => theme.colors.gray500};
  }
`;

const NickName = styled.article`
  margin-bottom: 2.5rem;

  ${({ theme }) => theme.fonts.title_bold_32};
  color: ${({ theme }) => theme.colors.white};
`;

const Intro = styled.article`
  ${({ theme }) => theme.fonts.body_medium_16};
  color: ${({ theme }) => theme.colors.gray100};
`;

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 90%);
`;

const ModalContent = styled.div`
  position: relative;
  z-index: 100;

  padding: 2rem;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.gray900};
`;

export default Profile;
