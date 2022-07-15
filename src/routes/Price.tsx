import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
const Overview = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const OverviewItem = styled.div`
  width: 210px;

  margin: 5px;
  padding: 30px 5px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.cardColor};
  span:nth-child(1) {
    font-size: 24px;
  }
  span:nth-child(2) {
    font-size: 18px;
  }
`;
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface priceProps {
  coinId: string;
}
function Price({ coinId }: priceProps) {
  const { data: tickersData } = useQuery<PriceData>(["tickers", coinId], () =>
    fetchCoinTickers(coinId)
  );
  return (
    <Overview>
      <OverviewItem>
        <span>등락률(15분)</span>
        <span>{tickersData?.quotes.USD.percent_change_15m}</span>
      </OverviewItem>
      <OverviewItem>
        <span>등락률(30분)</span>
        <span>{tickersData?.quotes.USD.percent_change_30m}</span>
      </OverviewItem>
      <OverviewItem>
        <span>등락률(1시간)</span>
        <span>{tickersData?.quotes.USD.percent_change_1h}</span>
      </OverviewItem>
      <OverviewItem>
        <span>등락률(6시간)</span>
        <span>{tickersData?.quotes.USD.percent_change_6h}</span>
      </OverviewItem>
      <OverviewItem>
        <span>등락률(24시간)</span>
        <span>{tickersData?.quotes.USD.percent_change_24h}</span>
      </OverviewItem>
    </Overview>
  );
}

export default Price;
