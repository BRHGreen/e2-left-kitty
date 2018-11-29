import gql from "graphql-tag";

const createKittyStatement = gql`
  mutation(
    $date: String
    $counterParty: String
    $reference: String
    $type: String
    $amount: Float
    $balance: Float
    $openingBalance: Float
    $month: String
  ) {
    createKittyStatement(
      date: $date
      counterParty: $counterParty
      reference: $reference
      type: $type
      amount: $amount
      balance: $balance
      openingBalance: $openingBalance
      month: $month
    ) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default createKittyStatement;
