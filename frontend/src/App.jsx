import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (

    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/employee"
          element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>}
        />

        <Route path="/admin"
          element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
        />
      </Routes>

      <Footer />

    </BrowserRouter>
    
  );
}

export default App;