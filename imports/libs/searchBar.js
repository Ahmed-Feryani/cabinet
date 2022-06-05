import { ReactiveDict } from "meteor/reactive-dict";

export default new ReactiveDict({
  searchBar: {
    keyword: "",
    location: "",
  },
});
