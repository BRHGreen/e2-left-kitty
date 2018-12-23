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
export const housemateById = gql`
  query housemateById($id: Int) {
    housemateById(id: $id) {
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

export const getPaymentsDueFromHousematesForMonth = gql`
  query getPaymentsDueFromHousematesForMonth($month: String) {
    getPaymentsDueFromHousematesForMonth(month: $month) {
      firstName
      lastName
      monthsPaid
    }
  }
`;
