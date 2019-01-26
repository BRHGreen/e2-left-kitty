import React from "react";
import { compose, graphql } from "react-apollo";
import Select from "react-select";
import {
  getMonthsFromKittyStatements,
  getPayInKittyStatementsByMonth,
  getLatestMonth,
  getAvailableMonths
} from "./graphql/kittyStatements";
import { getPaymentsDueFromHousematesForMonth } from "./graphql/housemates";
import PaymentMenus from "./PaymentMenus";
import { allHousemates } from "./graphql/housemates";
import Dropdown from "../common/Dropdown";

class PaymentsItem extends React.Component {
  state = {
    monthSelected: null
  };

  getMonthsAvailable = () => {
    const { getAvailableMonths } = this.props;

    if (!getAvailableMonths.loading) {
      const months = getAvailableMonths.getAvailableMonths.map(month => {
        return {
          label: month,
          value: month
        };
      });
      return months;
    }
  };

  filterState = monthSelected => {
    this.props.getPaymentsDueFromHousematesForMonth
      .refetch({
        month: monthSelected
      })
      .then(() => {
        this.props.getPayInKittyStatementsByMonth.refetch({
          month: monthSelected
        });
      })
      .catch(err => console.log("err>>>", err));
    this.setState({ monthSelected });
  };

  render() {
    const {
      getPaymentsDueFromHousematesForMonth,
      getPaymentsDueFromHousematesForMonth: {
        getPaymentsDueFromHousematesForMonth: paymentsDue
      },
      getPayInKittyStatementsByMonth: {
        getPayInKittyStatementsByMonth: paymentsMade
      },
      getAvailableMonths
    } = this.props;

    if (!paymentsMade || !paymentsDue) <div>Loading...</div>;
    return (
      <div className="p-2 container">
        <div>
          <div className="p-2">
            <h1>
              {this.state.monthSelected ||
                (getAvailableMonths.getAvailableMonths &&
                  getAvailableMonths.getAvailableMonths[0])}
            </h1>
            <Select
              options={this.getMonthsAvailable()}
              onChange={monthSelected => this.filterState(monthSelected.value)}
              // header="Change month..."
              // className="mb-2"
            />
          </div>
          <div className="columns">
            <div className="coumn col-5">
              <h5 className="m-2">Payments due from:</h5>

              {paymentsDue &&
                paymentsDue.map((payment, i) => {
                  if (payment) {
                    const hasPaid =
                      payment.monthsPaid &&
                      payment.monthsPaid.includes(this.state.monthSelected);

                    const { firstName, lastName } = payment;
                    return (
                      <div
                        className="striped d-flex flex-center flex-between p-2 height-lg"
                        key={i}
                      >
                        <h5>{`${firstName} ${lastName}`}</h5>
                        <div>
                          <span
                            className={`label label-${
                              hasPaid ? "primary" : "secondary"
                            }`}
                          >
                            {hasPaid ? "Paid" : "Not Paid"}
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
            <div className="coumn col-7">
              <h5 className="m-2">Payments recieved:</h5>

              {paymentsMade &&
                paymentsMade.map((payment, i) => {
                  if (payment) {
                    const { housemate, reference, amount } = payment;
                    return (
                      <div
                        className="striped p-2 d-flex flex-end flex-between"
                        key={i}
                      >
                        <div>
                          <div>
                            <b>Housemate:</b>
                            {housemate ? (
                              <span>{` ${housemate.firstName} ${
                                housemate.lastName
                              }`}</span>
                            ) : (
                              <span> -</span>
                            )}
                          </div>
                          <div>
                            <b>Reference:</b>
                            {reference ? (
                              <span>{` ${reference}`}</span>
                            ) : (
                              <span> -</span>
                            )}
                          </div>
                          <div>
                            <b>Amount:</b>
                            {amount ? (
                              <span>{` £${amount}`}</span>
                            ) : (
                              <span> -</span>
                            )}
                          </div>
                        </div>
                        <PaymentMenus
                          payment={payment}
                          housemateId={housemate && housemate.id}
                          month={this.state.monthSelected}
                          paymentsDue={getPaymentsDueFromHousematesForMonth}
                          months={this.getMonthsAvailable()}
                        />
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          <div className="divider" />
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getMonthsFromKittyStatements, {
    name: "getMonthsFromKittyStatements"
  }),
  graphql(getPaymentsDueFromHousematesForMonth, {
    name: "getPaymentsDueFromHousematesForMonth"
  }),
  graphql(getPayInKittyStatementsByMonth, {
    name: "getPayInKittyStatementsByMonth"
  }),
  graphql(allHousemates, {
    name: "allHousemates"
  }),
  graphql(getLatestMonth, {
    name: "latestMonth"
  }),
  graphql(getAvailableMonths, {
    name: "getAvailableMonths"
  })
)(PaymentsItem);
