import gql from "graphql-tag";

export const getLatestMonth = gql`
  query getLatestMonth {
    getLatestMonth
  }
`;
export const getAvailableMonths = gql`
  query getAvailableMonths {
    getAvailableMonths
  }
`;
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

export const getMonthsFromKittyStatements = gql`
  query getAllKittyStatements {
    getAllKittyStatements {
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
      id
      amount
      reference
      housemate {
        id
        firstName
        lastName
      }
      assignee {
        id
        firstName
      }
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

export const updatePaymentAssignee = gql`
  mutation updatePaymentAssignee($assignee: Int!, $kittyId: Int!) {
    updatePaymentAssignee(assignee: $assignee, kittyId: $kittyId) {
      ok
    }
  }
`;
