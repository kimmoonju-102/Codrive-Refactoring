import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IcCancelSmallWhite } from '../../assets';
import CommonButton from '../../common/CommonButton';
import ErrorModal from '../../common/Modal/ErrorModal/ErrorModal';
import usePatchUser from '../../libs/hooks/MyProfile/usePatchUser';
import usePostCheckExitNickname from '../../libs/hooks/MyProfile/usePostCheckExitNickname';
import { ProfileEdiltProps } from '../../types/MyProfile/MyProfileType';
import { handleInput } from '../../utils/handleInput';
import GithubInfo from '../Profile/GIthubInfo';
import IntroInfo from '../Profile/IntroInfo';
import LanguageInfo from '../Profile/LanguageInfo';
import NameInfo from '../Profile/NameInfo';
import NicknameInfo from '../Profile/NicknameInfo';
import RepositoriesInfo from '../Profile/RepositoriesInfo';
import usePostCheckExitRepository from './../../libs/hooks/MyProfile/usePostCheckExitRepository';

const ProfileEdilt = ({ handleCloseModal, initialData }: ProfileEdiltProps) => {
  const [inputs, setInputs] = useState({
    ...initialData,
  });

  const [selectedLanguage, setSelectedLanguage] = useState(
    initialData.language
  );

  const [changeNickname, setChangeNickname] = useState({
    originNickname: initialData.nickname,
    isExitNickname: false,
    isClickedCheckBtn: false,
  });

  const [changeRepositories, setChangeRepositories] = useState({
    repositories: initialData.githubRepositoryName,
    isExistRepositories: false,
    isClickedCheckRepositoriesBtn: false,
  });

  const { originNickname, isExitNickname, isClickedCheckBtn } = changeNickname;
  const { isExistRepositories, isClickedCheckRepositoriesBtn, repositories } =
    changeRepositories;
  const { comment, githubUrl, language, nickname, name, githubRepositoryName } =
    inputs;
  const githubNickname = githubUrl
    ? githubUrl.split('/')[githubUrl.split('/').length - 1]
    : '';

  const { patchMutation, patchUserErr } = usePatchUser({
    nickname,
    handleCloseModal,
  });
  const { mutation: nicknameMutation } = usePostCheckExitNickname(
    (isExit: boolean) =>
      setChangeNickname({
        ...changeNickname,
        isExitNickname: isExit,
        isClickedCheckBtn: true,
      })
  );

  const { mutation: repositoryMutation } = usePostCheckExitRepository(
    (isExit: boolean) => {
      setChangeRepositories({
        ...changeRepositories,
        isExistRepositories: isExit,
        isClickedCheckRepositoriesBtn: true,
      });
    }
  );

  const isError = patchUserErr.length > 0;
  const [errModalOn, setErrModalOn] = useState(isError);

  // 입력 값의 유효성을 검사하는 변수
  const isActive =
    (originNickname === nickname || // 닉네임이 수정되지 않았으면 중복 체크 필요 없음
      (originNickname !== nickname &&
        isClickedCheckBtn &&
        !isExitNickname &&
        nickname.length > 0 &&
        nickname.length <= 10)) &&
    ((language !== selectedLanguage && selectedLanguage.length > 0) ||
      language === selectedLanguage) &&
    (!comment || (comment.length > 0 && comment.length <= 30)) &&
    (!githubUrl || githubUrl.length > 0) &&
    (githubRepositoryName === repositories || // 리포지토리가 수정되지 않았으면 중복 체크 필요 없음
      (githubRepositoryName !== repositories &&
        isClickedCheckRepositoriesBtn &&
        !isExistRepositories));

  // 입력 값 변경 처리 함수
  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 'repositories' 필드를 수정할 때 changeRepositories 상태를 업데이트
    if (name === 'repositories') {
      setChangeRepositories((prev) => ({
        ...prev,
        repositories: value,
        isClickedCheckRepositoriesBtn: false,
      }));
    }

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'nickname') {
      setChangeNickname({ ...changeNickname, isClickedCheckBtn: false });
    }
  };

  // 언어 태그 변경 처리 함수
  const handleChangeTag = (value: string) => {
    setSelectedLanguage(value);
  };

  // 소개글 변경 처리 함수
  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    handleInput(e, 'comment');
    setInputs((prev) => ({ ...prev, comment: value }));
  };

  // 가입 버튼 클릭 처리 함수
  const handleSaveBtnClick = () => {
    if (!isActive) return;

    const editGithubUrl =
      githubUrl === 'https://github.com/' ? null : githubUrl;

    patchMutation({
      comment,
      githubUrl: editGithubUrl,
      language: selectedLanguage,
      nickname,
      githubRepositoryName: repositories,
    });

    if (isError) {
      setErrModalOn(true);
    }
  };

  // 취소 버튼 클릭 처리 함수
  const handleCancelBtnClick = () => {
    // 입력 값들을 초기 상태로 되돌림
    setInputs(initialData);
    setSelectedLanguage(language);
    handleCloseModal(); // 모달 닫기
  };

  // 닉네임 중복 체크 함수
  const handleNicknameCheck = () => {
    nicknameMutation(nickname);
  };

  const handleRepositoriesCheck = () => {
    repositoryMutation(repositories);
  };

  useEffect(() => {
    setErrModalOn(isError);
  }, [isError]);

  return (
    <ModalBackground>
      <ProfileEditContainer>
        <ProfileTitle>프로필</ProfileTitle>
        <CloseContainer>
          <IcCancelSmallWhite onClick={handleCancelBtnClick} />
        </CloseContainer>
        <ProfileContainer onSubmit={handleSaveBtnClick}>
          <BasicInfoContainer>
            <BasicTitle>기본정보</BasicTitle>
            <NameInfo user={name} />
            <RepositoriesInfo
              changeRepositories={changeRepositories}
              repositories={repositories}
              handleChangeInputs={handleChangeInputs}
              handleRepositoriesCheck={handleRepositoriesCheck}
            />
            <GithubInfo
              github={githubNickname}
              handleChangeInputs={(e) => {
                const { value } = e.target;
                const completeGithubUrl = `https://github.com/${value.replace('https://github.com/', '')}`;

                handleChangeInputs({
                  ...e,
                  target: {
                    ...e.target,
                    name: 'githubUrl',
                    value: completeGithubUrl,
                  },
                });
              }}
            />
          </BasicInfoContainer>
          <CodriveContainer>
            <CodriveTitle>코드라이브 정보</CodriveTitle>
            <NicknameInfo
              changeNickname={changeNickname}
              nickname={nickname}
              handleChangeInputs={handleChangeInputs}
              handleNicknameCheck={handleNicknameCheck}
            />
            <LanguageInfo
              selectedTag={selectedLanguage}
              handleChangeTag={handleChangeTag}
            />
            <IntroInfo
              value={comment ? comment : ''}
              onChange={handleChangeComment}
            />
          </CodriveContainer>
          <ProfileButton>
            <CancelButton type="button" onClick={handleCancelBtnClick}>
              취소하기
            </CancelButton>
            <CommonButton
              isActive={isActive}
              category="Profile_save"
              onClick={handleSaveBtnClick}
            />
          </ProfileButton>

          {errModalOn && (
            <ErrorModal
              errMsg={patchUserErr}
              onClose={() => setErrModalOn(false)}
            />
          )}
        </ProfileContainer>
      </ProfileEditContainer>
    </ModalBackground>
  );
};

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
`;

const ProfileEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  height: 61.8rem;
  padding: 6.2rem 3.6rem;
  margin-top: 10rem;

  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.gray800};
`;

const ProfileTitle = styled.h1`
  width: 41.8rem;
  padding-bottom: 2.1rem;
  margin: 0 0 4rem 5.5rem;

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray600};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title_bold_24};
`;

const CloseContainer = styled.div`
  position: absolute;
  top: 3rem;
  right: 3rem;
  cursor: pointer;
`;

const ProfileContainer = styled.form`
  display: flex;
  flex-direction: column;

  height: 55.4rem;
  padding: 0 5.5rem;

  background-color: ${({ theme }) => theme.colors.gray800};
  overflow-y: auto;

  -ms-overflow-style: auto;
  scrollbar-width: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.gray400};
  }
`;

const BasicInfoContainer = styled.div`
  margin-bottom: 5.6rem;
`;

const CodriveContainer = styled.div`
  margin-bottom: 5.9rem;
`;

const BasicTitle = styled.h1`
  margin-bottom: 4rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title_bold_20};
`;

const CodriveTitle = styled.h1`
  margin-bottom: 4rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title_bold_20};
`;

const ProfileButton = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: center;
`;

const CancelButton = styled.button`
  padding: 1rem 2rem;

  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.gray700};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title_bold_16};
`;

export default ProfileEdilt;
