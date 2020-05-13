const intialState = {
  suratList: [],
  suratDetail: {},
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
};
const category = (state = intialState, action) => {
  switch (action.type) {
    case "GET_ALL_SURAT_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "GET_ALL_SURAT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case "GET_ALL_SURAT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        suratList: action.payload.data,
      };
    case "GET_SURAT_DETAIL_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "GET_SURAT_DETAIL_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case "GET_SURAT_DETAIL_FULFILLED":
      state.suratDetail[action.meta.id] = action.payload.data;
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        suratDetail: state.suratDetail,
      };
    default:
      return state;
  }
};

export default category;
