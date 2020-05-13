import axios from "axios";
import host from "../host";
export const getAllSurat = () => {
  return {
    type: "GET_ALL_SURAT",
    payload: axios.get(`${host}/data.json`),
  };
};
export const getSuratDetail = (nomor) => {
  return {
    type: "GET_SURAT_DETAIL",
    meta: { id: nomor },
    payload: axios.get(`${host}/surat/${nomor}.json`),
  };
};
