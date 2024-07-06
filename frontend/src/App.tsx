import { Provider } from "react-redux";
import Router from "./routes/MainRouter";
import store from "./store/store";
import { Toast } from "./components/common/Toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
const {VITE_REACT_GOOGLE_TOKEN} = import.meta.env

function App() {

  return (
    <>
        <GoogleOAuthProvider clientId={VITE_REACT_GOOGLE_TOKEN}>
          <Provider store={store}>
            <Router />
            <Toast />
          </Provider>
        </GoogleOAuthProvider>
    </>
  );
}

export default App;
