import "./App.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { Toaster } from "sonner";

function App() {
  // const dispatch = useAppDispatch();

  return (
    <div dir="rtl" lang="ar">
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default App;
