import "./App.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { Toaster } from "sonner";
import OfflineAlert from "./components/Offline";
import { useEffect } from "react";
import { useAppSelector } from "./app/store";

function App() {
  const lang = useAppSelector((state) => state.language.lang);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <div>
      <OfflineAlert />
      <RouterProvider router={router} />
      <Toaster icons={{ success: "-" }} position="top-center" />
    </div>
  );
}

export default App;
