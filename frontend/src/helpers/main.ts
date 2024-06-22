export interface City {
  uuid?: String;
  cityName: String;
  count: Number;
}

export let initialCity: City = {
  cityName: "",
  count: 0,
};
