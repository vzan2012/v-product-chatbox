import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ui/ErrorFallback";
import { ChatContainer } from "./components/chat/ChatContainer";

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <ChatContainer />
    </ErrorBoundary>
  );
};

export default App;
