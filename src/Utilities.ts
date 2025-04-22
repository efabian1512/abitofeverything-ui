    export interface Country {
        name: {common: string},
        fifa: string
    }

     export const sortCountries = (a: Country, b: Country) => {
                if(a.name.common > b.name.common ) return 1;
                if(a.name.common < b.name.common ) return -1;
                return 0;
        }

       

      export const setCountryFirst = (countries: Country[], countryCode: string = 'USA') => {
            const formattedCountries: Country[] = [];

            countries?.map(country => {
                if(country.fifa === countryCode)
                    formattedCountries.unshift(country);
                else if (country.fifa === 'USA' && countryCode !== 'USA')
                    formattedCountries.splice(1,0,country);
                else 
                    formattedCountries.push(country);
            });

            return formattedCountries;
        }

        export const  getSpanishFormattedDateByNumericDate =  (date: number) => {
            return new Date(date).toLocaleDateString('es-ES', 
            { 
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour:'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
            });
        }

        