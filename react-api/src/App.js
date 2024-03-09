import './App.css';
import { useState , useEffect} from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const columns = [
  {
    name: 'ID',
    selector: row => row.id,
  },
  {
    name: 'Name',
    selector: row => row.name,
  },
];

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const fetchData = async page => {
    setLoading(true);
    const response = await axios.get(`http://localhost:3000/api/attractions?page=${page}&per_page=${perPage}&delay=1`);
    setData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };
  const handlePageChange = page => {
    fetchData(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await axios.get(`http://localhost:3000/api/attractions?page=${page}&per_page=${newPerPage}&delay=1`);
    setData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };
  useEffect(() => {
    fetchData(1); // fetch page 1 of users
  }, []);
  return <DataTable title="Users" columns={columns} data={data} progressPending={loading} pagination paginationServer paginationTotalRows={totalRows} onChangeRowsPerPage={handlePerRowsChange} onChangePage={handlePageChange} />;
}

export default App;
