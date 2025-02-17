import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const App = () => {
  const { userData } = useSelector((state) => state.auth);

  if (!userData) {
    return <Navigate to="/login" />;
  } else {
    return <>{userData.email}</>;
  }
};

export default App;
