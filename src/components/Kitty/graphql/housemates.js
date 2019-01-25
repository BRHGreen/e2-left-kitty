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

export const getPaymentsDueFromHousematesForMonth = gql`
  query getPaymentsDueFromHousematesForMonth($month: String) {
    getPaymentsDueFromHousematesForMonth(month: $month) {
      firstName
      lastName
      monthsPaid
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
