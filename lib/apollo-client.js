import { ApolloClient, InMemoryCache } from "@apollo/client";

import { HttpLink } from "@apollo/client";
import { NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr"

export default function createApolloClient () {
    return new ApolloClient({
        uri:'http://172.19.128.128:1337/graphql',
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "no-cache",
                errorPolicy: "ignore",
            },
            query: {
                fetchPolicy: "no-cache",
                errorPolicy: "all",
            },
        },
    })
}