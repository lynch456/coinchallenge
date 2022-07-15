import styled from "styled-components";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchCoins } from "../api";
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 470px;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  text-align: center;
  font-size: 30px;
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  margin: 20px 0;
  background-color: #3f3f3f;
  border-radius: 20px;
  font-size: 25px;
  a {
    padding: 30px;
    display: flex;
    align-items: center;
  }
  a:hover {
    color: ${(props) => props.theme.accentColor}};
  }
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Wrapper>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Wrapper>
  );
}

export default Coins;

//https://api.coinpaprika.com/v1/coins
