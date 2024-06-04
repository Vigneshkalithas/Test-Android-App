import { atom } from "recoil";

export const selectedDistrictAtom = atom({
  key: "selectedDistrictAtom",
  default: null,
});

export const selectedDistrictErrorAtom = atom({
  key: "selectedDistrictErrorAtom",
  default: false,
});

export const selectedDistrictWithBagsAtom = atom({
  key: "selectedDistrictWithBagsAtom",
  default: false,
});
