import { hydrateRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./contexts/notifications";

const queryClient = new QueryClient();

hydrateRoot(document.getElementById("root"),
    <NotificationContextProvider >
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </NotificationContextProvider>
);