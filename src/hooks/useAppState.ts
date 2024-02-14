import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const useAppState = () => {
    return useSelector((state: RootState) => state.appReducer)
}

export default useAppState;