import AxiosMockAdapter from "axios-mock-adapter";
import axios from "./instance";

const mock = new AxiosMockAdapter(axios, {
  delayResponse: 0,
});

export default mock;
