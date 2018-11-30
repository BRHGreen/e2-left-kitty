import gql from "graphql-tag";

const getAllKittyStatements = gql`
  query getAllKittyStatements {
    getAllKittyStatements {
      date
      counterParty
      reference
      type
      amount
      balance
      month
    }
  }
`;

export default getAllKittyStatements;
