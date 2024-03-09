import './App.css';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const boxes = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
};

const columns = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
    width: '100px'
  },
  {
    name: 'Coverimage',
    selector: row => row.coverimage,
    cell: row => <img src={row.coverimage} width={100} alt={row.name}></img>
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    width: '200px'
  },
  {
    name: 'Detail',
    selector: row => row.detail,
    sortable: true,
    width: '750px'
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
  const [search, setSearch] = useState('');
  const [searchId, setSearchId] = useState(0);

  const fetchData = async () => {
    setLoading(true);
  
    let url = `http://localhost:3000/api/attractions?page=${page}&per_page=${perPage}&delay=1`;
  
    if (search) {
      url += `&search=${search}`;
    }
    
    if (searchId) {
      url += `&id=${parseInt(searchId)}`;
      console.log('Search Id', searchId)
    }

    if (sortColumn) {
      url += `&sort_column=${sortColumn}&sort_direction=${sortColumnDirection}`;
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

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSearchIdChange = (event) => {
    setSearchId(event.target.value)
    // console.log(searchId)
  }
  
  const onSearchSubmit = (event) => {
    event.preventDefault()
    fetchData();
  }

  const onSearchIdSubmit = (event) => {
    event.preventDefault();
    fetchData();
  }

  useEffect(() => {
    console.log('Fetching data...');
    fetchData();
  }, [page, perPage, sortColumn, sortColumnDirection]);
  return (
    <div>
      <div style={boxes}>
        <form onSubmit={onSearchSubmit}>
          <label>
            Search <input type="text" name="search" onChange={handleSearchChange}></input>
          </label>
          <input type="submit" name="submit"></input>
        </form>
        
      </div>
      <DataTable
        title="Attraction"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onSort={handleSort}
      /></div>);
}

export default App;
