import React from "react";
import { compose, graphql } from "react-apollo";
import {
  housemateById,
  assignHousemateToStatement,
  allHousemates
} from "./graphql/housemates";
import { getKittyStatementsById } from "./graphql/kittyStatements";

import Dropdown from "../Common/Dropdown";

const KittyOwnerDropdown = props => {
  const {
    menuItems,
    displayValue,
    onClick,
    row,
    housemate,
    housemateById,
    assignHousemateToStatement
  } = props;

  const getDropdownItems = () => {
    const { allHousemates } = props;
    if (!allHousemates.loading) {
      return allHousemates.allHousemates.map(housemate => housemate);
    }
    return null;
  };

  const assignHousemate = (housemate, row) => {
    assignHousemateToStatement({
      variables: {
        newOwner: housemate.id,
        kittyId: row.id
      }
    })
      .then(() =>
        props.getKittyStatementsById.refetch({
          id: row.id
        })
      )
      .catch(err => console.log(err));
  };

  return (
    <Dropdown
      menuItems={getDropdownItems()}
      displayValue={"firstName"}
      onClick={housemate => assignHousemate(housemate, row)}
      header={
        (housemateById.housemateById &&
          housemateById.housemateById.firstName) ||
        "Select Housemate"
      }
    />
  );
};

export default compose(
  graphql(housemateById, {
    name: "housemateById",
    options: props => ({ variables: { id: props.row.owner } })
  }),
  graphql(assignHousemateToStatement, {
    name: "assignHousemateToStatement"
  }),
  graphql(allHousemates, {
    name: "allHousemates"
  }),
  graphql(getKittyStatementsById, {
    name: "getKittyStatementsById"
    //maybe skip unless refetch?
  })
)(KittyOwnerDropdown);
