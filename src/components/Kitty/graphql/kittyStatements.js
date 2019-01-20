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
  query getKittyStatementsByMonth($month: String) {
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

export const getKittyMonths = gql`
  query getAllKittyStatements {
    getAllKittyStatements {
      month
    }
  }
`;

export const getKittyStatementsByOwnerId = gql`
  query getKittyStatementsByOwnerId($owner: Int) {
    getKittyStatementsByOwnerId(owner: $owner) {
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

export const getPayInKittyStatementsByOwnerId = gql`
  query getPayInKittyStatementsByOwnerId($owner: Int) {
    getPayInKittyStatementsByOwnerId(owner: $owner) {
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

export const getPayInKittyStatementsByMonth = gql`
  query getPayInKittyStatementsByMonth($month: String) {
    getPayInKittyStatementsByMonth(month: $month) {
      amount
      reference
      housemate {
        id
        firstName
        lastName
      }
    }
  }
`;

export const updateMonthsPaid = gql`
  mutation updateMonthsPaid($owner: Int!, $monthsPaid: String!) {
    updateMonthsPaid(owner: $owner, monthsPaid: $monthsPaid) {
      ok
    }
  }
`;
