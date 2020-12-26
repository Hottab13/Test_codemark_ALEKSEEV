import Axios from "axios";
const instance = Axios.create({
  baseURL: "https://api.giphy.com/v1/gifs/",
});
type GetImagesResType = {
  data: { image_url: string };
  meta: { status: number };
};

export const searchAPI = {
  getImagesAPI(
    TAG: string,
    API_KEY: string = "gTJAO48YcpmrADUyo4opy4ES4g7iDBxx"
  ) {
    return instance
      .get<GetImagesResType>(`random?api_key=${API_KEY}&tag=${TAG}`)
      .then((res) => res.data);
  },
};
