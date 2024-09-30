import { ToastContainer } from "react-toastify";
import UploadBox from "./components/UploadBox";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main className="main-container">
      <ToastContainer />
      <UploadBox />
    </main>
  );
}

export default App;
