import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./contexts/notifications";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <NotificationContextProvider >
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </NotificationContextProvider>
);
(async function foo() {
    await import("../../node_modules/bootstrap/dist/js/bootstrap.min.js");
})();