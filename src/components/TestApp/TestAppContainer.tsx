import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/ReduxStore";
import Loader from "../Loader";
import { TestApp } from "./TestApp";

export const TestAppContainer: React.FC = () => {
  const isFetching = useSelector(
    (state: AppStateType) => state.formSearch.isFetching
  );
  return (
    <>
      {isFetching ? <Loader /> : null}
      <TestApp />
    </>
  );
};
