import { useRecoilState } from "recoil";

import { client } from "libs/client";
import { userState } from "stores/userState";

import { Button } from "@chakra-ui/react";

export const UserFollowButton = (props) => {
  const [currentUser] = useRecoilState(userState);

  const isFollow = (user) => {
    return user.followers.map((follower) => follower.id).includes(currentUser.id);
  };

  const clickFollowButton = (user) => {
    const url = isFollow(user) ? `/users/${user.id}/unfollow` : `/users/${user.id}/follow`;
    client
      .post(url)
      .then(() => {
        props.mutate.mutate(props.mutate.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const FollowButton = () => {
    const label = isFollow(props.user) ? "フォロー中" : "フォロー";
    const color = isFollow(props.user) ? "gray" : "twitter";
    return (
      <Button colorScheme={color} onClick={() => clickFollowButton(props.user)}>
        {label}
      </Button>
    );
  };

  return <>{props.user.id !== currentUser.id && <FollowButton />}</>;
};
