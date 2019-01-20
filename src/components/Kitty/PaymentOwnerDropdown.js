import React from "react";
import { compose, graphql } from "react-apollo";
import {
  housemateById,
  assignHousemateToStatement,
  allHousemates
} from "./graphql/housemates";
import {
  getPayInKittyStatementsByOwnerId,
  updateMonthsPaid
} from "./graphql/kittyStatements";

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
    month,
    getPayInKittyStatementsByOwnerId,
    paymentsDue
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
    })
      .then(() => paymentsDue.refetch())
      .catch(err => console.log("err", err));
  };
  return (
    <Dropdown
      menuItems={getDropdownItems()}
      displayValue={"firstName"}
      onClick={housemate => updateMonthsPaidOnHousemate(housemate, month)}
      header={
        (housemateById.housemateById &&
          housemateById.housemateById.firstName) || (
          <span className="placeholder">assign owner...</span>
        )
      }
    />
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
  graphql(allHousemates, {
    name: "allHousemates"
  }),
  graphql(getPayInKittyStatementsByOwnerId, {
    name: "getPayInKittyStatementsByOwnerId"
    //maybe skip unless refetch?
  })
)(KittyOwnerDropdown);
