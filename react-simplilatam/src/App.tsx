import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./views/home/Home";
import { ThemeProvider, createTheme } from "@mui/material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 60 * 60 * 1000,
      retry: false,
      networkMode: "always",
    },
    mutations: {
      networkMode: "always",
    },
  },
});

const defaultTheme = createTheme();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={defaultTheme}>
      <Home />
    </ThemeProvider>
  </QueryClientProvider>
);
