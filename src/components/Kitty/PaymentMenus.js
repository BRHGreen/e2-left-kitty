import React from "react";
import { compose, graphql } from "react-apollo";
import Select from "react-select";
import {
  housemateById,
  allHousemates,
  updateMonthsPaid
} from "./graphql/housemates";
import { updatePaymentAssignee } from "./graphql/kittyStatements";

import Dropdown from "../common/Dropdown";

class PaymentMenus extends React.Component {
  state = {
    monthsToAdd: null
  };
  getHousemates = () => {
    const { allHousemates } = this.props;
    if (!allHousemates.loading) {
      return allHousemates.allHousemates.map(housemate => housemate);
    }
    return null;
  };

  updateMonthsPaidOnHousemate = () => {
    if (!this.props.payment.assignee) {
      alert("please assign a housemate to this payment first");
      return;
    }

    const monthsPaid = this.state.monthsToAdd.map(({ value }) => value);
    debugger;
    this.props
      .updateMonthsPaid({
        variables: {
          housemateId: this.props.payment.assignee.id,
          monthsPaid
        }
      })
      .catch(err => console.log("err", err));
  };

  updateAssigneeOnStatement = housemate => {
    this.props
      .updatePaymentAssignee({
        variables: {
          assignee: housemate.id,
          kittyId: this.props.payment.id
        }
      })
      .catch(err => console.log("err", err));
  };

  render() {
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
      payment,
      months
    } = this.props;
    return (
      <div>
        <Dropdown
          menuItems={this.getHousemates()}
          displayValue={"firstName"}
          onClick={housemate => this.updateAssigneeOnStatement(housemate)}
          header={
            (payment.assignee && payment.assignee.firstName) || (
              <span className="placeholder">assign owner...</span>
            )
          }
        />
        <Select
          options={months}
          onChange={monthSelected => {
            this.setState({ monthsToAdd: monthSelected });
          }}
          isMulti
          // header="Change month..."
          // className="mb-2"
        />
        <button className="btn" onClick={this.updateMonthsPaidOnHousemate}>
          Done
        </button>
      </div>
    );
  }
}

export default compose(
  graphql(updateMonthsPaid, {
    name: "updateMonthsPaid",
    options: {
      refetchQueries: ["getPaymentsDueFromHousematesForMonth"]
    }
  }),
  graphql(updatePaymentAssignee, {
    name: "updatePaymentAssignee",
    options: {
      refetchQueries: ["getPayInKittyStatementsByMonth"]
    }
  }),
  graphql(allHousemates, {
    name: "allHousemates"
  })
)(PaymentMenus);
