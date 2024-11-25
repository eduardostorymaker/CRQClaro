import { gql } from "@apollo/client"

export default async function ApolloQuery(client, query) {
    
    const { loading, error, data, refetch } = await client.query({
        query: gql`${query}`
    })
    return { data, refetch}
}