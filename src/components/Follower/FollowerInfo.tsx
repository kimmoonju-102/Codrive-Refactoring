import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  IcFollowingGray,
  IcGithubSmall,
  IcUnfollowingWhite,
} from '../../assets';
import ErrorModal from '../../common/Modal/ErrorModal/ErrorModal';
import useUpdateFollower from '../../libs/hooks/Follower/useUpdateFollower';
import { FollowerInfoProps } from '../../types/Follower/Personal/personalType';
import { handleClickLink } from '../../utils/handleClickLink';
import SuccessRate from './Personal/Graph/SuccessRate';

const FollowerInfo = ({ info }: FollowerInfoProps) => {
  const {
    profileImg,
    nickname,
    isFollowing,
    comment,
    language,
    githubUrl,
    successRate,
  } = info;

  const { mutation, updateFollowerErr } = useUpdateFollower();
  const isError = updateFollowerErr.length > 0;

  const [errModalOn, setErrModalOn] = useState(isError);

  const handleClickFollowBtn = () => {
    mutation({ isDelete: isFollowing, nickname: nickname });
  };

  useEffect(() => {
    setErrModalOn(isError);
  }, [isError]);

  return (
    <FollowerInfoContainer>
      <Language>{language}</Language>

      <ProfileContainer>
        <SuccessRate successRate={successRate} profileImg={profileImg} nickname={nickname} />
        <ProfileTextContainer>
          <NicknameContainer>
            <Nickname>{nickname}</Nickname>
            <NicknameText $isGithubExit={githubUrl}>님</NicknameText>
            {githubUrl && (
              <IcGithubSmall onClick={() => handleClickLink(githubUrl)} />
            )}
          </NicknameContainer>
          <Introduce>{comment}</Introduce>
        </ProfileTextContainer>
      </ProfileContainer>

      <FollowingBtn
        type="button"
        onClick={handleClickFollowBtn}
        $isFollowed={isFollowing}
      >
        {isFollowing ? <IcFollowingGray /> : <IcUnfollowingWhite />}
        <Text $isFollowed={isFollowing}>
          {isFollowing ? `팔로잉` : `팔로우 추가`}
        </Text>
      </FollowingBtn>

      {errModalOn && (
        <ErrorModal
          onClose={() => setErrModalOn(false)}
          errMsg={updateFollowerErr}
        />
      )}
    </FollowerInfoContainer>
  );
};

export default FollowerInfo;

const FollowerInfoContainer = styled.article`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  width: 29.7rem;
  height: 41rem;

  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.gray800};
`;

const Language = styled.p`
  width: fit-content;
  padding: 0.6rem 1rem;
  margin: 1.6rem 0 0 1.6rem;

  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.gray500};
  color: ${({ theme }) => theme.colors.gray200};

  ${({ theme }) => theme.fonts.body_eng_medium_12};
  text-align: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileTextContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  min-width: 23.3rem;

  width: 100%;
  padding: 0 3.2rem;
`;

const NicknameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nickname = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title_bold_20};
`;

const NicknameText = styled.p<{ $isGithubExit?: string }>`
  margin-right: ${({ $isGithubExit }) => $isGithubExit && `1rem`};
  margin-left: 0.4rem;

  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.title_medium_20};
`;

const Introduce = styled.p`
  width: 100%;
  word-wrap: break-word;

  color: ${({ theme }) => theme.colors.gray200};

  ${({ theme }) => theme.fonts.title_regular_14};
  text-align: center;
`;

const FollowingBtn = styled.button<{ $isFollowed: boolean }>`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1rem 0;
  border-bottom-left-radius: 1.6rem;
  border-bottom-right-radius: 1.6rem;

  background-color: ${({ theme, $isFollowed }) =>
    $isFollowed ? theme.colors.gray700 : theme.colors.codrive_purple};
`;

const Text = styled.p<{ $isFollowed: boolean }>`
  color: ${({ theme, $isFollowed }) =>
    $isFollowed ? theme.colors.gray100 : theme.colors.white};
  ${({ theme }) => theme.fonts.title_bold_16};
`;
