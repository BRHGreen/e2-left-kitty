import gql from "graphql-tag";

const getKittyStatementsByMonth = gql`
  query getKittyStatementsByMonth($month: String!) {
    getKittyStatementsByMonth(month: $month) {
      date
      counterParty
      reference
      type
      amount
      balance
    }
  }
`;

export default getKittyStatementsByMonth;
