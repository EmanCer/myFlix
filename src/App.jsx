import { AuthContextProvider } from "./assets/context/AuthContext";
import Homepage from "./assets/pages/Homepage";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Homepage />
      </AuthContextProvider>
    </>
  );
}

export default App;
