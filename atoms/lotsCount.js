import { atom } from "recoil";

export const lotCountAtom = atom({
  key: "lotCountAtom",
  default: 1,
});

export const disableDistrictAtom = atom({
  key: "disableDistrictAtom",
  default: false,
});

export const districtListAtom = atom({
  key: "districtListAtom",
  default: [],
});
