import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

export const render = () => {
    const html = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );
    return { html };
};