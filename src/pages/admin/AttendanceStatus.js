import React, { useEffect, useState } from "react";
import * as ActionCreatorsAdmin from "../../actions/adminAction";
import { connect, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";

const AttedanceStatus = ({
  adminDetails,
  getDriverattendanceListData,
  SetattendanceStatusData,
  DriverattendanceList,
}) => {
  const [Approved, setApproved] = React.useState();
  const [Reject, setReject] = React.useState();
  // const [driverAttendanceId, setdriverAttendanceId] = React.useState();
  const [createdBy, setcreatedBy] = React.useState();
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = useState(0);
  const [driverstatus, setdriverstatus] = React.useState("ALL");
  const [status, setstatus] = useState("");
  // const driver = useSelector((state) => state.driver);
  console.log("admin details", adminDetails ? adminDetails.user : null);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const FIlterHandlers = {
    APPROVED: (x) => x.status === "APPROVED",
    PENDING: (x) => x.status === "PENDING",
    REJECT: (x) => x.status === "REJECT",
    ALL: (x) => x,
  };

  const [selectedFilter, setSelectedFilter] = React.useState(
    FIlterHandlers.ALL
  );

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleCategoryChange = (status) => {
    setdriverstatus(status);
    // console.log(driverstatus);
  };
  useEffect(() => {
    getDriverList();
  }, []);

  const DriverStatus = async (driverAttendanceId, updatedBy, status) => {
    const data = await SetattendanceStatusData({
      driverAttendanceId: driverAttendanceId,
      updatedBy: updatedBy,
      status:status,
    });
    getDriverList()
  };

  const getDriverList = async () => {
    const data = await getDriverattendanceListData();
    setData(data);
    console.log("----data--", data);
    setCount(data.length);
  };

  const handleAprooved = (driverId, userId,  status) => {
    setstatus("APPROVED");
    DriverStatus(driverId, userId, status);
  };
  const handleReject = ( driverId, userId, status) => {
    setstatus("REJECT");
    DriverStatus(driverId, userId, status);
  };

  return (
    <div>
      <div className="container">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            m: 2,
            bgcolor: "background.paper",
            "& button": { m: 1 },
          }}
        >
          <div>
            <h1>Driver Leave Status</h1>
          </div>
          {/* <div><Button  variant="contained" size="small" >Leave</Button></div> */}
        </Box>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyItems: "center",
            justifyContent: "space-between",
            float: "right",
            textAlign: "center",
          }}
        >
          <select
            name="driverstatus"
            value={driverstatus}
            onChange={(event) => handleCategoryChange(event.target.value)}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyItems: "center",
              justifyContent: "space-between",
              float: "right",
              width: "180px",
              height: "30px",
            }}
          >
            <option id="0">ALL</option>
            <option id="0">APPROVED</option>
            <option id="1">PENDING</option>
            <option id="1">REJECT</option>
          </select>
        </div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Driver Name</TableCell>
                  <TableCell>Contact No</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.length > 0 &&
                  data
                    .filter(FIlterHandlers[driverstatus])
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          key={Math.random() * index}
                          hover
                          role="checkbox"
                          tabIndex={-1}
                        >
                          <TableCell>{row && row.driverName}</TableCell>
                          <TableCell>{row && row.driverNo}</TableCell>
                          <TableCell>{row && moment(row.startDateTime).format('DD-MMM-YYYY hh:mm:a')}</TableCell>
                          <TableCell>{row && moment(row.endDateTime).format('DD-MMM-YYYY hh:mm:a')}</TableCell>
                          <TableCell>{row && row.status}</TableCell>
                          <TableCell>
                            <Button
                              style={{
                                margin: 4,
                                marginTop: 8,
                                padding: 2,
                                width: 80,
                              }}
                              variant="contained"
                              size="small"
                              onClick={() =>
                                handleAprooved(row._id,
                                  adminDetails.user._id,
                                 "APPROVED"
                                )
                              }
                            >
                              Approved
                            </Button>
                            <Button
                              style={{
                                margin: 4,
                                marginTop: 8,
                                padding: 2,
                                width: 60,
                              }}
                              variant="contained"
                              size="small"
                              onClick={() => handleReject(
                                row._id,
                                  adminDetails.user._id,
                                "REJECT")}
                            >
                              REJECT
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={count ? count : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    DriverattendanceList: state.admin.DriverattendanceList,
    adminDetails: state.admin.adminDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDriverattendanceListData: () =>
      dispatch(ActionCreatorsAdmin.getDriverattendanceListData()),

    SetattendanceStatusData: (requestBody) =>
      dispatch(ActionCreatorsAdmin.SetattendanceStatusData(requestBody)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AttedanceStatus);

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#fcfcfc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  appbar: {
    alignItems: "center",
    padding: "15px",
    background: "#0c1572 !important",
  },
  appbarBackIcon: {
    fontSize: "40px !important",
    "&:hover": {
      cursor: "pointer",
    },
  },
  main: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  profilePicture: {
    width: "200px !important",
    height: "200px !important",
    margin: "20px",
  },
  displayForm: {
    width: "350px",
    background: "white",
    borderRadius: "20px !important",
    margin: "20px",
    padding: "20px",
  },
  formSpacer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  middlePosition: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  group: {
    marginTop: "30px",
  },
}));
