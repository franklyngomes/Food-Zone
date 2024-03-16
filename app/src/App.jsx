import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult";
export const base_url = "http://localhost:9000";
function App() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");
  const fetchFoodData = async () => {
    setLoading(true);
    try {
      const res = await fetch(base_url);
      const json = await res.json();
      setLoading(false);
      setData(json);
      setFilteredData(json);
    } catch (error) {
      setError("Unable to fetch data");
    }
  };
  useEffect(() => {
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      setFilteredData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filteredFood = (type) => {
    if(type === "all"){
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter)
    setSelectedBtn(type)
  }
  if (error) return <div>{error}</div>;
  if (loading) return <div>{loading}</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
          </div>
          <div className="search">
            <input
              onChange={searchFood}
              type="text"
              placeholder="Search Food"
            />
          </div>
        </TopContainer>
        <FilterContainer>
          <Button onClick={() => filteredFood('all')}>All</Button>
          <Button onClick={() => filteredFood("breakfast")}>Breakfast</Button>
          <Button onClick={() => filteredFood("lunch")}>Lunch</Button>
          <Button onClick={() => filteredFood("dinner")}>Dinner</Button>
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
}

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  img {
    max-width: 50px;
  }
  .search {
    input {
      background-color: transparent;
      border: 1px solid #ee9c00;
      color: #3e4152;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
    }
    &:focus-visible{
      border-color: #ee9c00 !important;
    }&:active{
      border-color: #ee9c00 !important;
      border-radius: 5px;
    }
  }

  @media(0 < width < 600px){
    flex-direction: column;
    height: 60px;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;
export const Button = styled.button`
  background: white;
  border-radius: 5px;
  padding: 6px 12px;
  border: 1px solid #3e4152;
  color: #3e4152;
  font-family: "Quicksand", sans-serif;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #ee9c00;
    border-color: #ee9c00;
  }
`;

export default App;
