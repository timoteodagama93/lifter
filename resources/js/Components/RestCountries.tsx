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
// Utils
import {
  getCountryCode,
  getCountryData,
  getCountryDataList,
  getEmojiFlag,
} from 'countries-list';

// Minimal data in JSON
import countries2to3 from 'countries-list/minimal/countries.2to3.min.json';
import countries3to2 from 'countries-list/minimal/countries.3to2.min.json';
import languageNames from 'countries-list/minimal/languages.native.min';

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
    <>
      {countryPhoneCodes.map(country => (
        <option>
          {country.name}: {country.callingCode}
        </option>
      ))}
    </>
  );
};

export default RestCountries;
