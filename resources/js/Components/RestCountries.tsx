import axios from 'axios';
import React, { useState, useEffect } from 'react';
// Interfaces and types
import type {
  ICountry,
  ICountryData,
  ILanguage,
  TContinentCode,
  TCountryCode,
  TLanguageCode,
} from 'countries-list';

// Main data and utils
import { continents, countries, languages } from 'countries-list';

const RestCountries = () => {
  const [countryPhoneCodes, setCountryPhoneCodes] = useState([]);

  useEffect(() => {
    // Função para obter a lista de países e códigos de discagem de telefones
    const getCountryPhoneCodes = () => {
      try {
        // Extrair nomes e códigos de discagem de telefones
        const codes = Object.values(countries).map(country => ({
          name: country.name,
          callingCode: country.phone || 'N/A',
        }));

        setCountryPhoneCodes(codes);
      } catch (error) {
        console.error(
          'Erro ao obter a lista de países e códigos de discagem de telefones:',
          error,
        );
      }
    };

    // Chamar a função ao montar o componente
    getCountryPhoneCodes();
  }, []); // O segundo parâmetro vazio garante que a função seja executada apenas uma vez no montar do componente

  return (
    <select
    
    defaultValue={}>
      {countryPhoneCodes.map(country => (
        <option value={country.callingCode}>
          {country.name}: {country.callingCode}
        </option>
      ))}
    </select>
  );
};

export default RestCountries;
