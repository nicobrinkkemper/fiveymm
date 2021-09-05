import App from "App";
import { ErrorFallback } from "ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, BrowserRouterProps } from "react-router-dom";

const AppWrapper = ({ routerProps = {} }: { routerProps?: BrowserRouterProps }) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
    <div className="App-wrapper">
      <BrowserRouter {...routerProps}>
        <App />
      </BrowserRouter>
    </div>
  </ErrorBoundary>
);

export { AppWrapper };
export default AppWrapper;
