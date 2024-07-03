import { Provider } from "react-redux";
import Router from "./routes/MainRouter";
import store from "./store/store";
import { Toast } from "./components/common/Toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="1009282809407-sh8h2kgmot2q295a503sl5530pldnaj9.apps.googleusercontent.com">
        <Provider store={store}>
          <Router />
          <Toast />
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
