import { atom, AtomEffect, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

import { User } from "types";

const { persistAtom }: { persistAtom: AtomEffect<any> } = recoilPersist();

export const userState: RecoilState<User | null> = atom({
  key: "userState",
  default: null,
  effects_UNSTABLE: [persistAtom], // stateの永続化
});
