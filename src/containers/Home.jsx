import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllSurat } from "../redux/actions/surat";
import Spinner from "../components/Spinner";
class Home extends Component {
  componentDidMount = () => {
    if (this.props.surat.suratList && this.props.surat.suratList.length <= 0) {
      this.props.dispatch(getAllSurat());
    }
  };
  render() {
    return this.props.surat ? (
      this.props.surat.isLoading ? (
        <Spinner />
      ) : (
        <div>
          {this.props.surat.suratList.map((item, key) => (
            <div
              key={key}
              onClick={() => this.props.history.push(`/surat/${item.nomor}`)}
            >
              {`${key+1}. Surat ${item.nama}`}
            </div>
          ))}
        </div>
      )
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  surat: state.Surat,
});

export default connect(mapStateToProps)(Home);
