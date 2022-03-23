import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "stores/userState";

export const useAdminAuthControl = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  // 管理者ページの制御
  useEffect(() => {
    if (!currentUser?.isAdmin && router.pathname.match(/admin/)) {
      alert("管理者専用ページです");
      router.push("/");
    }
  }, [router, currentUser]);

  return { useAdminAuthControl };
};
