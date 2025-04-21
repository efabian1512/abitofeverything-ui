import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Country } from "../Utilities";




const useCountries = () => useQuery<Country[]>({
    queryKey: ['countries'],
    queryFn: () => axios.get('https://restcountries.com/v3.1/all?fields=name,fifa').then(resp => resp.data),
    staleTime: 60 * 1000,
    retry: 3
});

export { useCountries };