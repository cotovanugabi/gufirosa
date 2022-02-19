import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";
import { DashboardLayout } from "../components";

const dashboardPath = "/dashboard";
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const apolloClient = useApollo(props.pageProps.initialApolloState);
  const {
    Component,
    router: { route },
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props;
  const isDashboardRoute = route.startsWith(dashboardPath);

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isDashboardRoute ? (
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
