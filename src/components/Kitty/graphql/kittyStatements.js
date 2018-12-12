import gql from "graphql-tag";

export const getAllKittyStatements = gql`
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

export const getKittyStatementsByMonth = gql`
  query getKittyStatementsByMonth($month: String!) {
    getKittyStatementsByMonth(month: $month) {
      id
      date
      counterParty
      reference
      amount
      balance
      owner
    }
  }
`;
export const getKittyStatementsById = gql`
  query getKittyStatementsById($id: Int) {
    getKittyStatementsById(id: $id) {
      id
      date
      counterParty
      reference
      type
      amount
      balance
      owner
    }
  }
`;
