import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const isPrerenderedShell = Boolean(
  document.querySelector('meta[name="prerendered-route"]')
);
const app = (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

if (container.hasChildNodes() && !isPrerenderedShell) {
  ReactDOM.hydrateRoot(container, app);
} else {
  if (isPrerenderedShell) {
    container.innerHTML = "";
  }
  ReactDOM.createRoot(container).render(app);
}
