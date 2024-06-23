export interface City {
  uuid: string;
  cityName: string;
  count: number;
}

export let initialCity: City = {
  uuid: "",
  cityName: "",
  count: 0,
};
