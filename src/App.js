import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [searchText1, setSearchText1] = useState("");
  const [searchText2, setSearchText2] = useState("");
  const [searchText3, setSearchText3] = useState("");
  const [searchText4, setSearchText4] = useState("");
  const [searchText5, setSearchText5] = useState("");
  const [searchText6, setSearchText6] = useState("");
  const [searchText7, setSearchText7] = useState("");
  const [searchText8, setSearchText8] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentResults, setCurrentResults] = useState([]);
  const [totalResults, setTotalResults] = useState();
  const [totalPages, setTotalPages] = useState();

  const resultsPerPage = 10;
  const [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  let indexOfLastResult;
  let indexOfFirstResult;
  useEffect(() => {
    indexOfLastResult = currentPage * resultsPerPage;
    indexOfFirstResult = indexOfLastResult - resultsPerPage;
    setCurrentResults(
      searchResults.slice(indexOfFirstResult, indexOfLastResult)
    );
  }, [currentPage]);
  const handleSearch = async (e) => {
    e.preventDefault();
    // Make an API request to fetch search results
    try {
      setLoading(true);
      setCurrentPage(1);
      const response = await axios.get(`http://127.0.0.1:3000/getData`, {
        params: {
          tablename: selectedOption,
          search1: searchText1,
          search2: searchText2,
          search3: searchText3,
          search4: searchText4,
          search5: searchText5,
          search6: searchText6,
          search7: searchText7,
          search8: searchText8,
        },
      });
      setSearchResults(response.data);

      indexOfLastResult = currentPage * resultsPerPage;
      indexOfFirstResult = indexOfLastResult - resultsPerPage;
      setCurrentResults(
        response.data.slice(indexOfFirstResult, indexOfLastResult)
      );

      setTotalResults(response.data.length);
      setTotalPages(Math.ceil(response.data.length / resultsPerPage));

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExport = () => {
    // Convert searchResults to CSV data format
    const csvData = searchResults.map((result) => Object.values(result));

    // Define the CSV headers
    const csvHeaders = Object.keys(searchResults[0]);

    // Create a CSV string
    const csvString = [
      csvHeaders.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    // Create a dynamic download link for the CSV file
    const csvFileName = "search_results.csv";
    const csvBlob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const csvUrl = URL.createObjectURL(csvBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = csvUrl;
    downloadLink.download = csvFileName;
    downloadLink.click();
  };

  return (
    <div className="app-container" style={{}}>
      <div
        style={
          loading
            ? {
                position: "absolute",
                zIndex: "999",
                textAlign: "center",
                width: "100%",
                height: "90%",
                display: "block",
              }
            : { display: "none" }
        }
      >
        <img src={require("./loading.gif")} style={{ marginTop: "20%" }} />
        <h2 style={{ color: "black" }}>Searching data....</h2>
      </div>
      <h1 className="app-title">Virginia Campaign Finance 1999 - 2023</h1>
      <div>
        <div>
          <label
            htmlFor="select-dropdown"
            style={{ fontSize: "20px", marginRight: "10px" }}
          >
            Select a Schedule:
          </label>
          <select
            id="select-dropdown"
            value={selectedOption}
            onChange={handleChange}
            style={{ height: "30px" }}
            className="select_style"
          >
            <option value="">Please select</option>
            <option value="ScheduleA">ScheduleA</option>
            <option value="ScheduleB">ScheduleB</option>
            <option value="ScheduleC">ScheduleC</option>
            <option value="ScheduleD">ScheduleD</option>
            <option value="ScheduleE">ScheduleE</option>
            <option value="ScheduleF">ScheduleF</option>
            <option value="ScheduleG">ScheduleG</option>
            <option value="ScheduleH">ScheduleH</option>
            <option value="ScheduleI">ScheduleI</option>
          </select>
          <p style={{ fontWeight: "bold", fontSize: "28px" }}>
            {selectedOption}
          </p>
        </div>
        <div>
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{ width: "50%", flexDirection: "row", display: "flex" }}
            >
              <div
                style={{ width: "50%", flexDirection: "row", display: "flex" }}
              >
                <div style={{ width: "50%" }}>First Name:</div>
                <div
                  style={{
                    width: "50%",
                    textAlign: "left",
                    marginLeft: "10px",
                  }}
                >
                  <input
                    type="text"
                    className="form-control input_style"
                    value={searchText1}
                    onChange={(e) => setSearchText1(e.target.value)}
                  />
                </div>
              </div>
              <div
                style={{ width: "50%", flexDirection: "row", display: "flex" }}
              >
                <div style={{ width: "50%" }}>
                  Last Name or Organization Name:
                </div>
                <div
                  style={{
                    width: "50%",
                    textAlign: "left",
                    marginLeft: "10px",
                  }}
                >
                  <input
                    type="text"
                    className="form-control input_style"
                    value={searchText2}
                    onChange={(e) => setSearchText2(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div
              style={{ width: "50%", flexDirection: "row", display: "flex" }}
            >
              <div
                style={{ width: "50%", flexDirection: "row", display: "flex" }}
              >
                <div style={{ width: "50%" }}>Amount Range Search:</div>
                <div
                  style={{
                    width: "50%",
                    textAlign: "left",
                    marginLeft: "10px",
                  }}
                >
                  <input
                    type="text"
                    className="form-control input_style"
                    value={searchText3}
                    onChange={(e) => setSearchText3(e.target.value)}
                  />
                </div>
              </div>
              <div
                style={{ width: "50%", flexDirection: "row", display: "flex" }}
              >
                <div style={{ width: "50%" }}>To</div>
                <div
                  style={{
                    width: "50%",
                    textAlign: "left",
                    marginLeft: "10px",
                  }}
                >
                  <input
                    type="text"
                    className="form-control input_style"
                    value={searchText4}
                    onChange={(e) => setSearchText4(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div
              style={{ width: "50%", flexDirection: "row", display: "flex" }}
            >
              <div
                style={{ width: "50%", flexDirection: "row", display: "flex" }}
              >
                <div style={{ width: "50%" }}>Date Range:</div>
                <div
                  style={{
                    width: "50%",
                    textAlign: "left",
                    marginLeft: "10px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="form-control input_style"
                    value={searchText5}
                    onChange={(e) => setSearchText5(e.target.value)}
                  />
                </div>
              </div>
              <div
                style={{ width: "50%", flexDirection: "row", display: "flex" }}
              >
                <div style={{ width: "50%" }}>To</div>
                <div
                  style={{
                    width: "50%",
                    textAlign: "left",
                    marginLeft: "10px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="form-control input_style"
                    value={searchText6}
                    onChange={(e) => setSearchText6(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div
              style={{ width: "50%", flexDirection: "row", display: "flex" }}
            >
              <div
                style={{ width: "50%", flexDirection: "row", display: "flex" }}
              >
                <div style={{ width: "50%" }}>Zip Code:</div>
                <div
                  style={{
                    width: "50%",
                    textAlign: "left",
                    marginLeft: "10px",
                  }}
                >
                  <input
                    type="text"
                    className="form-control input_style"
                    value={searchText7}
                    onChange={(e) => setSearchText7(e.target.value)}
                  />
                </div>
              </div>
              <div
                style={{ width: "50%", flexDirection: "row", display: "flex" }}
              >
                <div style={{ width: "50%" }}>
                  City / State of Employment or Business
                </div>
                <div
                  style={{
                    width: "50%",
                    textAlign: "left",
                    marginLeft: "10px",
                  }}
                >
                  <input
                    type="text"
                    className="form-control input_style"
                    value={searchText8}
                    onChange={(e) => setSearchText8(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="button_style"
              style={{ width: "10%", height: "50px", marginTop: "50px" }}
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="justify-content-center">
        {currentResults.length > 0 ? (
          <div style={{}}>
            <h2 className="search-results-title">Search Results</h2>
            <div style={{ display: "flex", flexDirection: "row", justifyContent : 'space-between' }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="search_info" style={{marginLeft:"30px"}}>Total Results: {totalResults}</div>
                <div className="search_info">Total Pages: {totalPages}</div>
                <div className="search_info">Rows per Page: {resultsPerPage}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" , marginBottom:'10px'}}>
                <div className="pagination-controls">
                  <button
                    style={{ width: "80px", height: "40px" }}
                    className="button_style"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                  <span
                    style={{
                      fontSize: "24px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      verticalAlign: "center",
                    }}
                  >
                    {currentPage}
                  </span>
                  <button
                    style={{ width: "80px", height: "40px" }}
                    className="button_style"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>

                <button
                  variant="secondary"
                  onClick={handleExport}
                  style={{ marginRight:'60px', marginLeft:'60px'}}
                  className="button_style"
                >
                  Export to CSV
                </button>
              </div>
            </div>

            <div class="table-wrapper">
              <div className="table-container">
                <table striped bordered hover className="table-container">
                  {/* Table headers */}
                  <thead>
                    <tr>
                      {Object.keys(currentResults[0]).map((key) => (
                        <th key={key} style={{ padding: "10px" }}>
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody>
                    {currentResults.map((result, index) => (
                      <tr key={index}>
                        {Object.values(result).map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination controls */}
          </div>
        ) : (
          <div style={{ fontSize: "30px", marginTop: "20px" }}>
            There is no result
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
