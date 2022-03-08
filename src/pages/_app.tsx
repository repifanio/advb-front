import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyle from "../styles/global";
import { Store } from "~/components";

const queryClient = new QueryClient();

const WhiteLabelWeb = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Store>
        <Component {...pageProps} />
        <GlobalStyle />
      </Store>
    </QueryClientProvider>
  );
};

export default WhiteLabelWeb;
