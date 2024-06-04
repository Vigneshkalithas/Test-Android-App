import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AgentData } from "../DataCenter/AgentData";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMobile, setUserMobile] = useState("");
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [otp, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [floatButton, setFloatButton] = useState(false);
  const refRBSheet = useRef();
  const refShareSheet = useRef();
  const refLogoutSheet = useRef();
  const refDistrictSheet = useRef();
  const refDateSheet = useRef();
  const selectionSheetRef = useRef();
  const [ownData, setOwnData] = useState([]);
  const [othersData, setOthersData] = useState([]);
  const [filteredOwnData, setFilteredOwnData] = useState([]);
  const [filteredOthersData, setFilteredOthersData] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  // const setUser = useSetRecoilState(userAtom);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  // const [indexAgents, setIndexAgents] = useState(0);
  const modalizeRef = useRef(null);
  const [modalSheetContent, setModalSheetContent] = useState("Confirm");
  const [procurementEdited, setProcurementEdited] = useState(false);

  const [selectionSheetontent, setSelectionSheetontent] = useState("Product");
  const [searchMoadal, setSearchModal] = useState(false);

  const onOpen = async () => {
    await modalizeRef.current?.open();
  };
  const closeModal = async () => {
    await modalizeRef.current?.close();
  };

  const [confirmModalConfig, setConfirmModalConfig] = useState({
    btnx: "Yes",
    btny: "Cancel",
    content: "Are you sure want to send for pricing",
    btnXfun: "",
    btnYfun: "",
  });

  const updateConfirmModalConfig = (newConfig) => {
    setConfirmModalConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
  };

  const isLoggedInCheck = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      setUserInfo(userInfo);
      setUserToken(userToken);
      if (userToken) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(`isLogged in error ${error}`);
    }
  };

  const Logout = () => {
    setIsLoading(true);
    setIsLoggedIn(false);
    setUserToken(null);
    setUserInfo(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userId");
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedInCheck();
  }, []);

  return (
    <MyContext.Provider
      value={{
        userMobile,
        setUserMobile,
        userInfo,
        isLoggedIn,
        setIsLoggedIn,
        otpTimer,
        setOtpTimer,
        otp,
        setOTP,
        refRBSheet,
        refShareSheet,
        refDistrictSheet,
        refDateSheet,
        selectionSheetRef,
        refLogoutSheet,
        isTimerActive,
        setIsTimerActive,
        ownData,
        othersData,
        filteredOwnData,
        filteredOthersData,
        modalizeRef,
        modalSheetContent,
        setModalSheetContent,
        onOpen,
        closeModal,
        openSuccessModal,
        setOpenSuccessModal,
        confirmModalConfig,
        updateConfirmModalConfig,
        apiLoading,
        setApiLoading,
        Logout,
        procurementEdited,
        setProcurementEdited,
        selectionSheetontent,
        setSelectionSheetontent,
        floatButton,
        setFloatButton,
        searchMoadal,
        setSearchModal,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
