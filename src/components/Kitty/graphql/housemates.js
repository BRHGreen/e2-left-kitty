import gql from "graphql-tag";
export const allHousemates = gql`
  query allHousemates {
    allHousemates {
      id
      firstName
      lastName
    }
  }
`;
export const assignHousemateToStatement = gql`
  mutation assignHousemateToStatement($newOwner: Int!, $kittyId: Int!) {
    assignHousemateToStatement(newOwner: $newOwner, kittyId: $kittyId) {
      ok
    }
  }
`;
