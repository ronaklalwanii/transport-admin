import { useSelector } from "react-redux";

const App = () => {
  const { userData } = useSelector((state) => state.auth);

  return <>{userData.email}</>;
};

export default App;
