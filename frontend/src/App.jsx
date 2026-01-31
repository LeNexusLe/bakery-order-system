import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ClientDashboard from "./pages/ClientDashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Layout from "./components/Layout.jsx";
import Products from "./pages/Products.jsx";

function Home() {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">Bakery Order System</h1>
      <p className="text-slate-600">Hello.</p>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <RequireAuth role="ADMIN">
              <AdminDashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/client"
          element={
            <RequireAuth role="CLIENT">
              <ClientDashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </Layout>
  );
}
