import React from "react";
import { compose, graphql } from "react-apollo";
import {
  housemateById,
  allHousemates,
  updateMonthsPaid
} from "./graphql/housemates";
import { updatePaymentAssignee } from "./graphql/kittyStatements";

import Dropdown from "../common/Dropdown";

const KittyOwnerDropdown = props => {
  const {
    menuItems,
    displayValue,
    onClick,
    row,
    housemate,
    housemateById,
    updateMonthsPaid,
    updatePaymentAssignee,
    month,
    getPayInKittyStatementsByOwnerId,
    paymentsDue,
    paymentsMade,
    payment
  } = props;

  const getDropdownItems = () => {
    const { allHousemates } = props;
    if (!allHousemates.loading) {
      return allHousemates.allHousemates.map(housemate => housemate);
    }
    return null;
  };

  const updateMonthsPaidOnHousemate = (housemate, months) => {
    updateMonthsPaid({
      variables: {
        owner: housemate.id,
        monthsPaid: months
      }
    });
    updatePaymentAssignee({
      variables: {
        assignee: housemate.id,
        kittyId: payment.id
      }
    })
      .then(() => paymentsDue.refetch())
      .then(() => paymentsMade.refetch())
      .catch(err => console.log("err", err));
  };

  return (
    !housemateById.loading && (
      <Dropdown
        menuItems={getDropdownItems()}
        displayValue={"firstName"}
        onClick={housemate => updateMonthsPaidOnHousemate(housemate, month)}
        header={
          (payment.assignee && payment.assignee.firstName) || (
            <span className="placeholder">assign owner...</span>
          )
        }
      />
    )
  );
};

export default compose(
  graphql(housemateById, {
    name: "housemateById",
    options: props => {
      return { variables: { id: props.housemateId } };
    }
  }),
  graphql(updateMonthsPaid, {
    name: "updateMonthsPaid"
  }),
  graphql(updatePaymentAssignee, {
    name: "updatePaymentAssignee"
  }),
  graphql(allHousemates, {
    name: "allHousemates"
  })
)(KittyOwnerDropdown);
