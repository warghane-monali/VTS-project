import React, {useEffect} from "react";
import {Routes, Route, useNavigate,} from "react-router-dom"
import Login from "./pages/Login";
import Dashboard from "./layouts/Dashboard";
import RequestForRide from "./pages/traveller/RequestForRide";
import MainLayout from "./layouts/MainLayout";
import {connect} from "react-redux";
import Request from "./pages/traveller/Request";
import Profile from "./pages/traveller/Profile";
import RequestStatus from "./pages/traveller/RequestStatus";
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverPreviousRides from "./pages/driver/DriverPreviousRides";
import DriverUpcomingRides from "./pages/driver/DriverUpcomingRides";
import DriverPreviousRideDetails from "./pages/driver/DriverPreviousRideDetails";
import DriverUpcomingRideDetails from "./pages/driver/DriverUpcomingRideDetails";
import TravellerUpcomingRides from "./pages/traveller/TravellerUpcomingRides";
import TravellerPreviousRides from "./pages/traveller/TravellerPreviousRides";
import Admin from "./layouts/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RequestList from "./pages/admin/RequestList";
import RequestPermission from "./pages/admin/RequestPermission";
import ResponseStatus from "./pages/admin/ResponseStatus";
import EmployeeWiseList from "./pages/admin/EmployeeWiseList";
import AllDrivers from "./pages/admin/AllDrivers";
import AllVehicle from "./pages/admin/AllVehicle";
import AssignDriverRequestAccepted from "./pages/admin/AssignDriverRequestAccepted";
import PreviousRideStatusCheck from "./pages/admin/PreviousRideStatusCheck";
import EmployeeWiseJourney from "./pages/admin/EmployeeWiseJourney";
import RideStatus from "./pages/traveller/RideStatus";
import DriverRideStatus from "./pages/driver/DriverRideStatus";
import MapView from "./pages/traveller/MapView";
import Reports from "./pages/admin/Reports";
import Feedback from "./pages/traveller/Feedback";
import VehicleMaintenancepage from "./pages/admin/VehicleMaintenancepage";
import PetrolExpense from "./pages/admin/PetrolExpense";

function App({userDetails, adminDetails}) {

  const navigate = useNavigate();

  useEffect(() => {
    if (adminDetails && adminDetails?.user.userRole === 'Admin') {
      navigate('/admin/dashboard')
    } else if (userDetails && userDetails?.user.userRole === 'Traveller') {
      navigate('/dashboard/request-for-ride')
    } else if (userDetails && userDetails?.user.userRole === 'Driver') {
      navigate('/driver/dashboard')
    }
  }, [userDetails, adminDetails]);

  return (
      <div>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route path='/' element={<Login/>}/>
          </Route>
          <Route path="dashboard" element={<Dashboard/>}>
            <Route path="request-for-ride" element={<RequestForRide/>}/>
            <Route path="request" element={<Request/>}/>
            <Route path='request-status' element={<RequestStatus/>}/>
            <Route path='ride-status' element={<RideStatus/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="upcoming-rides" element={<TravellerUpcomingRides/>}/>
            <Route path="previous-rides" element={<TravellerPreviousRides/>}/>
            <Route path="map-view" element={<MapView/>}/>
            <Route path="feedback" element={ <Feedback /> } />
          </Route>
          <Route path="driver" element={<Dashboard/>}>
            <Route path="dashboard" element={<DriverDashboard/>}/>
            <Route path="previous-rides" element={<DriverPreviousRides/>}/>
            <Route path="ride-status" element={<DriverRideStatus/>}/>
            <Route path='upcoming-rides' element={<DriverUpcomingRides/>}/>
            <Route path="previous-ride-details" element={<DriverPreviousRideDetails/>}/>
            <Route path="upcoming-ride-details" element={<DriverUpcomingRideDetails/>}/>
          </Route>
          <Route path="admin" element={<Admin/>}>
            <Route path="dashboard" element={<AdminDashboard/>}/>
            <Route path="request-permission" element={<RequestPermission/>}/>
            <Route path="request-list" element={<RequestList/>}/>
            <Route path='request-status' element={<RequestStatus/>}/>
            <Route path='status' element={<ResponseStatus/>}/>
            <Route path='assign-driver-request-accepted' element={<AssignDriverRequestAccepted/>}/>
            <Route path='previous-ride-status-check' element={<PreviousRideStatusCheck/>}/>
            <Route path='employee-wise' element={<EmployeeWiseList/>}/>
            <Route path='employee-wise-journey-list' element={<EmployeeWiseJourney/>}/>
            <Route path='drivers' element={<AllDrivers/>}/>
            <Route path='all-vehicle' element={<AllVehicle/>}/>
            <Route path='reports' element={<Reports/>}/>
            <Route path='VehicleMaintenancepage' element={ <VehicleMaintenancepage /> } />
            <Route path="petrol-expense" element={<PetrolExpense />} />
          </Route>
        </Routes>
      </div>
  );
}
const mapStateToProps = state => {
  return {
    userDetails: state.auth.userDetails,
    adminDetails: state.admin.adminDetails
  }
};
export default connect(mapStateToProps)(App)
