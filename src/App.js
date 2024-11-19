
import { Route, Routes  } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import ReverseProtectedRoute from "./components/ReverseProtectedRoute";
import NotFound from "./pages/NotFound";
function App() {
    
    return (
        <>
        <AuthContextProvider>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<ReverseProtectedRoute><Login /></ReverseProtectedRoute>} />
                <Route path="/signup" element={<ReverseProtectedRoute><Signup /></ReverseProtectedRoute>} />
                <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthContextProvider>
        </>
    );
}

export default App;
