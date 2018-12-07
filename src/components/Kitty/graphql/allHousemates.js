import gql from "graphql-tag";
const allHousemates = gql`
  query allHousemates {
    allHousemates {
      id
      firstName
      lastName
    }
  }
`;
export default allHousemates;
