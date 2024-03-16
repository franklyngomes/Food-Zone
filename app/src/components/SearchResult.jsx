import styled from "styled-components";
import { base_url, Button, Container } from "./../App";
const SearchResult = ({ data }) => {
  return (
    <FoodCardContainer>
      <Container>
        <FoodCards>
          {data?.map(({ name, image, text, price }) => (
            <FoodCard key={name}>
              <div className="food_image">
                <img src={base_url + image} />
              </div>
              <div className="food_info">
                <div className="info">
                  <h3>{name}</h3>
                  <p>{text}</p>
                </div>
                <Button>${price.toFixed(2)}</Button>
              </div>
            </FoodCard>
          ))}
        </FoodCards>
      </Container>
    </FoodCardContainer>
  );
};

export default SearchResult;
const FoodCardContainer = styled.section`
  min-height: calc(100vh - 210px);
  background-size: cover;
`;
const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 32px;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
`;
const FoodCard = styled.div`
  width: 340px;
  height: 167px;
  border: 0.2px solid #bbbbbd;
  border-radius: 10px;
  display: flex;
  padding: 8px;

  .food_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    h3 {
      margin-top: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #3e4152;
      font-family: "Quicksand", sans-serif;
      font-weight: bold;
    }
    p {
      font-family:  "Arial";
      margin-top: 4px;
      font-size: 12px;
      color: #3e4152;
    }
    button {
      font-size: 12px;
      font-family: "Quicksand", sans-serif;
    }
  }
`;
