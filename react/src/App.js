import './App.css';
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Coupon from './components/coupon';
import CheckOut from './components/checkout';

function App() {
  return (
    <Box display="flex" position="fixed" className="bg-light" height="100vh" width="100vw" flexDirection="row" flex="1">
      <CssBaseline />
      <Box display="flex" className="scrollbar scrollbar-primary" style={{ maxHeight: '100vh', overflowY: 'hidden' }}>
        <SideBar className="scrollbar scrollbar-primary" />
      </Box>

      <Box display="flex" flexDirection="column" width="100%" flex="1" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
        <Box display="flex" style={{ zIndex: "2", position: "sticky", top: "0" }} height="fit-content">
          <TopBar />
        </Box>
        <Box display="flex" className="bg-light" flex="1" width="100%">
          <Routes>
            <Route path="/" element={<Coupon />} />
            <Route path="/checkout" element={<CheckOut />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
