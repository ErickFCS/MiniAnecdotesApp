import { renderToString } from "react-dom/server";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./contexts/notifications";

const queryClient = new QueryClient();

export const render = () => {
    const html = renderToString(
        <NotificationContextProvider >
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </NotificationContextProvider>
    );
    return { html };
};