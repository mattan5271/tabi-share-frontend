import { useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "stores/userState";
import { User } from "types";

export const useAdminAuthControl = () => {
  const router: NextRouter = useRouter();
  const [currentUser] = useRecoilState<User>(userState);

  // 管理者ページの制御
  useEffect(() => {
    if (!currentUser?.isAdmin && router.pathname.match(/admin/)) {
      alert("管理者専用ページです");
      router.push("/");
    }
  }, [router, currentUser]);

  return { useAdminAuthControl };
};
