import './App.css';
import { useState , useEffect} from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const columns = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'Coverimage',
    selector: row => row.coverimage,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true
  },
  {
    name: 'Detail',
    selector: row => row.detail,
    sortable: true
  },
  {
    name: 'Latitude',
    selector: row => row.latitude,
    sortable: true
  },
  {
    name: 'longitude',
    selector: row => row.longitude,
    sortable: true
  },
];

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('');
  const [sortColumnDirection, setSortColumnDirection] = useState('');

  const fetchData = async page => {
    setLoading(true);

    let url = `http://localhost:3000/api/attractions?page=${page}&per_page=${perPage}&delay=1`
    if(sortColumn) {
      url += `&sort_column=${sortColumn}&sort_direction=${sortColumnDirection}`
    }
    const response = await axios.get(url);

    setData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };
  
  const handlePageChange = page => {
    setPage(page)
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const handleSort = (column, sortDirection) => {
    setSortColumn(columns.name);
    setSortColumnDirection(sortDirection);
  };

  useEffect(() => {
    fetchData(1); // fetch page 1 of users
  }, [page, perPage, sortColumn, sortColumnDirection]);
  return <DataTable 
    title="Users" 
    columns={columns} 
    data={data} 
    progressPending={loading}
    pagination 
    paginationServer 
    paginationTotalRows={totalRows} 
    onChangeRowsPerPage={handlePerRowsChange} 
    onChangePage={handlePageChange} 
    onSort={handleSort}
  />;
}

export default App;
