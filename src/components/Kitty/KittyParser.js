import React from "react";
import { compose, graphql } from "react-apollo";
import createKittyStatement from "./graphql/createKittyStatement";
import moment from "moment";

class KittyParser extends React.Component {
  state = {
    csvContent: ""
  };

  parseCsv = () => {
    const allContent = this.state.csvContent.replace(/\n/g, ",").split(",");

    const splitContent = [];

    let i,
      j,
      temparray,
      chunk = 6;
    for (i = 0, j = allContent.length; i < j; i += chunk) {
      temparray = allContent.slice(i, i + chunk);
      splitContent.push(temparray);
    }

    splitContent.map(arr => {
      moment.locale();
      this.props
        .createKittyStatement({
          variables: {
            // check for date here if none then pass null
            date: moment(arr[0], "DD/MM/YYYY").format("MM/DD/YYYY"),
            counterParty: [arr[1]],
            reference: arr[2],
            type: arr[3],
            amount: parseFloat(arr[4]),
            balance: parseFloat(arr[5]),
            month: moment(arr[0], "DD/MM/YYYY").format("MM/YYYY")
          }
        })
        .then(res => {
          this.setState({ csvContent: "" });
        })
        .catch(err => console.log(err));
      return null;
    });
  };

  onChangeHandler(e) {
    this.setState({ csvContent: e.target.value });
  }

  render() {
    return (
      <div className="page-content">
        <div className="form-group">
          <label className="form-label" htmlFor="input-example-3">
            Paste CSV content here...
          </label>
          <textarea
            className="form-input max-width-md min-height-md"
            onChange={e => this.onChangeHandler(e)}
            placeholder="eg: 03/04/2018,B GREEN,BEN S STANDING ORD,FASTER PAYMENT,10.00,31.02"
          />
          <button className="btn mt-2" onClick={() => this.parseCsv()}>
            Parse
          </button>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(createKittyStatement, { name: "createKittyStatement" })
)(KittyParser);
