import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled-components
const ContentContainer = styled.div`
  padding: 20px;
`;

const KurlarContainer = styled.div`
  overflow-x: auto;
`;

const KurlarTablo = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #003366; /* Koyu mavi sınır rengi */
  padding: 8px;
  background-color: #003366; /* Koyu mavi arka plan rengi */
  text-align: left;
  color: #fff; /* Beyaz yazı rengi */
`;

const Td = styled.td`
  border: 1px solid #003366; /* Koyu mavi sınır rengi */
  padding: 8px;
  color: #003366; /* Koyu mavi yazı rengi */
`;

const Kurgorsel = styled.span`
  display: inline-block;
  width: 25px;
  height: 15px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 10px;
`;

const Para = styled.td`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Deger = styled.td`
  text-align: right;
  color: #003366; /* Koyu mavi yazı rengi */
`;

const TcmbFont = styled.span`
  font-size: 14px;
  color: #003366; /* Koyu mavi yazı rengi */
`;

const BoxedCell = styled(Td)`
  background-color: #e6f0ff; /* Hafif mavi arka plan rengi */
  border: 1px solid #003366; /* Koyu mavi sınır rengi */
  padding: 8px;
  color: #003366; /* Koyu mavi yazı rengi */
`;

async function getExchangeRates() {
  const url = 'https://cors-anywhere.herokuapp.com/https://www.tcmb.gov.tr/kurlar/today.xml';
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    
    const data = await response.text();
    
    // Parse the XML response
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');

    // Extract exchange rates
    const rates = Array.from(xmlDoc.getElementsByTagName('Currency')).map(currency => {
      const code = currency.getAttribute('CurrencyCode');
      const name = currency.getElementsByTagName('Isim')[0]?.textContent || '';
      const forexBuying = currency.getElementsByTagName('ForexBuying')[0]?.textContent || '';
      const forexSelling = currency.getElementsByTagName('ForexSelling')[0]?.textContent || '';

      return {
        code,
        name,
        forexBuying,
        forexSelling
      };
    });

    return rates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return []; // Return an empty array on error
  }
}

const ExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const rates = await getExchangeRates();
      if (!Array.isArray(rates)) {
        setError("Failed to fetch exchange rates.");
        return;
      }

      // Filter for only USD, EUR, GBP
      const filteredRates = rates.filter(rate => ['USD', 'EUR', 'GBP'].includes(rate.code));
      setExchangeRates(filteredRates);
    };

    fetchData();
  }, []);

  return (
    <ContentContainer>
      <KurlarContainer>
        {error && <p>{error}</p>}
        <KurlarTablo>
          <thead>
            <tr>
              <Th>Döviz Kodu</Th>
              <Th>Birim</Th>
              <Th>Döviz Cinsi</Th>
              <Th>Döviz Alış</Th>
              <Th>Döviz Satış</Th>
            </tr>
          </thead>
          <tbody>
            {exchangeRates.map((rate) => (
              <tr key={rate.code}>
                <BoxedCell>
                  <Kurgorsel
                    style={{ backgroundImage: getFlagUrl(rate.code) }}
                  />
                  {rate.code}/TRY
                </BoxedCell>
                <BoxedCell>1</BoxedCell>
                <BoxedCell>{rate.name}</BoxedCell>
                <BoxedCell>{rate.forexBuying}</BoxedCell>
                <BoxedCell>{rate.forexSelling}</BoxedCell>
              </tr>
            ))}
          </tbody>
        </KurlarTablo>
      </KurlarContainer>
    </ContentContainer>
  );
};

// Döviz koduna göre bayrak URL'sini döndüren yardımcı fonksiyon
const getFlagUrl = (code) => {
  switch (code) {
    case "USD":
      return `url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/125px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png')`;
    case "EUR":
      return `url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/800px-Flag_of_Europe.svg.png')`;
    case "GBP":
      return `url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/200px-Flag_of_the_United_Kingdom_%283-5%29.svg.png')`;
    default:
      return "";
  }
};

export default ExchangeRates;
