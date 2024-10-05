import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useEffect, useState } from 'react';
import { api } from '~/api';

const DashboardPage = () => {
  const [registrations, setRegistrations] = useState([])
  async function fetchInitialData() {
    const response = await api.get('/registrations')
    setRegistrations(response.data)
  }

  useEffect(() => {
    fetchInitialData()
  }, [])

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
