import { VFC } from "react";
import { useRecoilState } from "recoil";
import { ScopedMutator } from "swr/dist/types";
import { AxiosError, AxiosResponse } from "axios";

import { client } from "libs/client";
import { userState } from "stores/userState";
import { User } from "types";

import { Button } from "@chakra-ui/react";

type Props = {
  user: User;
  mutate: { mutate: ScopedMutator<any>; url: string };
};

export const UserFollowButton: VFC<Props> = (props) => {
  const [currentUser] = useRecoilState<User | null>(userState);

  const isFollow = (user: User) => {
    if (!currentUser) return false;
    return user.followers.map((follower: User) => follower.id).includes(currentUser.id);
  };

  const clickFollowButton = (user: User) => {
    const url: string = isFollow(user) ? `/users/${user.id}/unfollow` : `/users/${user.id}/follow`;
    client
      .post(url)
      .then((res: AxiosResponse) => {
        props.mutate.mutate(props.mutate.url);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err);
      });
  };
  const FollowButton = () => {
    const label: string = isFollow(props.user) ? "フォロー中" : "フォロー";
    const color: string = isFollow(props.user) ? "gray" : "twitter";
    return (
      <Button colorScheme={color} onClick={() => clickFollowButton(props.user)}>
        {label}
      </Button>
    );
  };

  return <>{props.user.id !== currentUser?.id && <FollowButton />}</>;
};
