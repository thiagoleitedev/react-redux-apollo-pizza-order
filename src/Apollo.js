import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';

const httpLink = new HttpLink({ uri: "https://core-graphql.dev.waldo.photos/pizza" });

const addStatusLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        response.data.status = 'SUCCESS';
        console.log('afterware', JSON.stringify(response));
        return response;
    })
})

const link = addStatusLink.concat(httpLink);

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
    link,
    cache: cache.restore(window.__APOLLO_STATE__),
})