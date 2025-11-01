import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReactPixel from 'react-facebook-pixel';
const options = {
  autoConfig: true, // Habilitar configuración automática
  debug: false,     // Desactivar el modo de depuración
};
ReactPixel.init('770407779384093', null, options);


ReactPixel.pageView();
createRoot(document.getElementById("root")!).render(<App />);
