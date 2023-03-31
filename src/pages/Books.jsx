import React from "react";
import Navbar from "../component/Navbar/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../component/Breadcrumb/Breadcrumb";
import AdminNavbar from "../component/Navbar/AdminNavbar";
import Menu from "../component/Menu/Menu";
import { useState } from "react";
import { useLayoutEffect } from "react";
import localinstance from "../localinstance";
import Cookies from "js-cookie";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TablePagination from "@mui/material/TablePagination";
import { Toolbar } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Checkbox } from "@mui/material";

const Books = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [searchVal, setSearchVal] = useState("");
  const [fetchdata, setfetchdata] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [id, setid] = useState("");
  const [searchRow, setSearchRow] = useState([]);
  const [checked, setChecked] = useState(false);

  useLayoutEffect(() => {
    fetch();
  }, []);

  const deleteid = async (id) => {
    console.log(id);
    const res = await localinstance({
      url: `/book/delete/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });
    console.log(res.data.message);
    await fetch();
  };
  const fetch = async (id) => {
    const res = await localinstance({
      url: `book/get/all`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });

    console.log(res.data.message);
    console.log(res.data.message[0]);
    let columns = Object.keys(res.data.message[0]);
    console.log(columns);
    setcolumns(columns);
    setfetchdata(res.data.message);
    // fetch1(res.data.message.id);
    // setid(res.data.message.id);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();
  const handleview = () => {
    navigate("/admin/all_books/view");
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchdata.length) : 0;

  const handleSearch = (val) => {
    setSearchVal(val.trim());
  };

  const filterTable = () => {
    console.log(fetchdata);
    setPage(0);
    let tempArr = [];
    for (let ele of fetchdata) {
      console.log(ele.series);
      let bookname = ele.name.toLowerCase();
      if (bookname.indexOf(searchVal.toLowerCase()) > -1) {
        tempArr.push(ele);
      }
    }
    console.log(tempArr);
    setSearchRow([]);
    if (tempArr.length === 0) {
      alert("No data Found");
    } else {
      setSearchRow(tempArr);
    }
  };

  const handlecheckbox = (e, data) => {
    console.log("value", e.target.value);
    console.log(data);
    // let tempindex = [];
    // tempindex.push(e.target.value);
    // console.log(tempindex);
    let temp = [...fetchdata];
    for (let obj of temp) {
      if (data.id === obj.id) {
        obj.checked = !obj.checked;
      }
    }
    setfetchdata(temp);
  };

  return (
    <>
      <div className="">
        <div>
          <AdminNavbar />
        </div>
        <div className="flex justify-between  ">
          <div className="p-3">
            <div>Admin</div>
            <div>
              <Breadcrumb />
            </div>
          </div>
          <div>
            <Menu />
          </div>
        </div>
        {/* <div className=" flex flex-col gap-5 sm:flex-row sm:gap-5 "> */}
        <div className="flex w-full px-[2rem] py-4 justify-center">
          <div className="flex w-[80%] ">
            <TableContainer component={Paper}>
              <Toolbar className="bg-slate-400 flex justify-between">
                <div className="flex">
                  <TextField
                    id="search-bar"
                    className="text"
                    onInput={(e) => {
                      handleSearch(e.target.value);
                    }}
                    label="Enter Search Value"
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    type="search"
                  />
                  <div className="bg-slate-300">
                    <IconButton
                      type="submit"
                      aria-label="search"
                      onClick={filterTable}
                    >
                      <SearchIcon style={{ fill: "blue" }} />
                    </IconButton>
                  </div>
                </div>

                <TablePagination
                  rowsPerPageOptions={[
                    10,
                    50,
                    100,
                    { label: "All", value: -1 },
                  ]}
                  colSpan={3}
                  count={
                    searchRow.length === 0 ? fetchdata.length : searchRow.length
                  }
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      "aria-label": "rows per page",
                    },
                    actions: {
                      showFirstButton: true,
                      showLastButton: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Toolbar>

              <Table aria-label="simple table">
                <TableHead className="!bg-slate-400 !w-full">
                  <TableRow>
                    {[
                      "",
                      "BookName",
                      "Grade",
                      // "Author",
                      "Series",
                      "Subject",
                      "",
                    ].map((header, i) => (
                      <TableCell className="!font-black text-lg !bg-slate-500">
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchRow.length === 0
                    ? (rowsPerPage > 0
                        ? fetchdata.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : fetchdata
                      ).map((data, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="left" className="bg-slate-200">
                            <Checkbox
                              value={index}
                              checked={data.checked}
                              onChange={(e) => handlecheckbox(e, data)}
                            />
                          </TableCell>
                          <TableCell align="left" className="bg-slate-200">
                            {data.name}
                          </TableCell>
                          <TableCell align="left" className="bg-slate-200">
                            {data.gradeMaster.grade}
                          </TableCell>
                          {/* <TableCell algradeign="left" className="bg-slate-200">
                    {data.series}
                  </TableCell> */}
                          {/* <TableCell align="left" className="bg-slate-200">
                            {data.bookAuthor.author}
                          </TableCell> */}
                          <TableCell align="left" className="bg-slate-200">
                            {data.seriesMaster.series}
                          </TableCell>
                          <TableCell align="left" className="bg-slate-200">
                            {data.subjectMaster.subject}
                          </TableCell>
                          {/* <TableCell align="left" className="bg-slate-200">
                    {data.status === true ? <Visibility /> : <VisibilityOff />}
                  </TableCell> */}
                          <TableCell align="left" className="bg-slate-200">
                            <DeleteOutlineIcon
                              className=""
                              onClick={() => {
                                deleteid(data.id);
                              }}
                            />
                          </TableCell>
                          {/* <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                      ))
                    : (rowsPerPage > 0
                        ? searchRow.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : searchRow
                      ).map((data, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="left" className="bg-slate-200">
                            <Checkbox
                              value={index}
                              checked={data.checked}
                              onChange={(e) => handlecheckbox(e, data)}
                            />
                          </TableCell>
                          <TableCell align="left" className="bg-slate-200">
                            {data.name}
                          </TableCell>
                          <TableCell align="left" className="bg-slate-200">
                            {data.gradeMaster.grade}
                          </TableCell>
                          {/* <TableCell align="left" className="bg-slate-200">
                      {data.series}
                    </TableCell> */}
                          <TableCell align="left" className="bg-slate-200">
                            {data.bookAuthor.author}
                          </TableCell>
                          <TableCell align="left" className="bg-slate-200">
                            {data.seriesMaster.series}
                          </TableCell>
                          <TableCell align="left" className="bg-slate-200">
                            {data.subjectMaster.subject}
                          </TableCell>
                          {/* <TableCell align="left" className="bg-slate-200">
                      {data.status === true ? <Visibility /> : <VisibilityOff />}
                    </TableCell> */}
                          <TableCell align="left" className="bg-slate-200">
                            <DeleteOutlineIcon
                              className=""
                              onClick={() => {
                                deleteid(data.id);
                              }}
                            />
                          </TableCell>
                          {/* <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                      ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 41 * emptyRows }}>
                      <TableRow colSpan={3} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {/* <TablePagination
          component="div"
          count={fetchdata.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
