import { ImagesArrType } from "./../components/types/type";
import { stopSubmit } from "redux-form";
import { searchAPI } from "./../api/api";
import { BaseThunkActionType, InferActionType } from "./ReduxStore";

let initionalState = {
  isFetching: false as boolean,
  imagesArr: [] as Array<ImagesArrType>,
  tagsArrImage: [] as Array<string | null>,
  isEditGrupp: false as boolean,
  clickTag: null as null | string,
};

export type InitionalStateType = typeof initionalState;
type ActionType = InferActionType<typeof action>;
type ThunkActionType = BaseThunkActionType<ActionType>;

const formSearchReducer = (
  state = initionalState,
  action: ActionType
): InitionalStateType => {
  switch (action.type) {
    case "SET_IMAGES": {
      let imagesArr = state.imagesArr;
      let tagsArrImage = state.tagsArrImage;
      if (!action.payload.tag) {
        imagesArr = [];
        console.log(typeof imagesArr);
        tagsArrImage = [];
      }
      //@ts-ignore
      imagesArr.push(action.payload);
      if (!tagsArrImage.includes(action.payload.tag)) {
        tagsArrImage.push(action.payload.tag);
      }
      return { ...state, imagesArr: imagesArr, tagsArrImage: tagsArrImage };
      //(state: any, action: { payload: any; }) => [action.payload, ...state.imagesArr]
    }
    case "TOGGLE_IS_FETING": {
      return { ...state, isFetching: action.payload };
    }
    case "TOGGLE_IS_EDIT_GRUP": {
      return { ...state, isEditGrupp: action.payload };
    }
    case "TOGGLE_IS_CLICK_TAG": {
      return { ...state, clickTag: action.payload };
    }
    default:
      return state;
  }
};

export const action = {
  setImages: (images: string | null | Array<string>, tag: string | null) =>
    ({ type: "SET_IMAGES", payload: { images, tag } } as const),
  toggleIsFeting: (isFeting: boolean) =>
    ({ type: "TOGGLE_IS_FETING", payload: isFeting } as const),
  toggleIsEditGrupp: (isEditGrupp: boolean) =>
    ({ type: "TOGGLE_IS_EDIT_GRUP", payload: isEditGrupp } as const),
  toggleIsClickTag: (clickTag: string) =>
    ({ type: "TOGGLE_IS_CLICK_TAG", payload: clickTag } as const),
};



export const getImagesTC = (TAG: string): ThunkActionType => async (
  dispatch,
  getState
) => {
  const getRequest = async (request: string, isArr: boolean) => {
    dispatch(action.toggleIsFeting(true));
    let respons = await searchAPI.getImagesAPI(request);
    console.log(respons);
    dispatch(action.toggleIsFeting(false));
    if (respons.meta.status === 200) {
      const images = respons.data.image_url;
      if (images === undefined) {
        dispatch(
          stopSubmit("form_search", { _error: "По тегу ничего не найдено" })
        );
      }
      if (isArr) {
        return images;
      } else {
        dispatch(action.setImages(images, TAG));
      }
    } else {
      dispatch(stopSubmit("form_search", { _error: "Произошла http ошибка" }));
    }
  };
  const compound: string | any[] | null = [];
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const delay = 5000;
  let arrTag = TAG.split(",", 2);
  if (arrTag.length > 1) {
    for (let name of arrTag) {
      getRequest(name, true).then((res: any) => {
        compound.push(res);
        if (compound.length > 1)
          dispatch(action.setImages(compound, "compound_tag"));
      });
    }
  } else if (TAG === "delay") {
    let timerId = setTimeout(async function request() {
      let text = "";
      for (let i = 0; i < Math.floor(Math.random() * Math.floor(10)); i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      console.log(text);
      getRequest(text, false);
      timerId = setTimeout(request, delay);
    }, delay);
  } else {
    getRequest(TAG, false);
  }
};

export const imagesOut = (): ThunkActionType => async (dispatch, getState) => {
  dispatch(action.setImages(null, null));
};
export const toggleIsEditGruppTC = (toggle: boolean): ThunkActionType => async (
  dispatch,
  getState
) => {
  dispatch(action.toggleIsEditGrupp(toggle));
};
export const toggleIsClickTagTC = (clickTag: string): ThunkActionType => async (
  dispatch,
  getState
) => {
  dispatch(action.toggleIsClickTag(clickTag));
};
export default formSearchReducer;
