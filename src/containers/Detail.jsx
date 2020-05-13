import React, { Component } from "react";
import { connect } from "react-redux";
import { getSuratDetail, getAllSurat } from "../redux/actions/surat";
import Spinner from "../components/Spinner";
class Detail extends Component {
  state = { linear: true };
  componentDidMount = () => {
    if (this.props.surat.suratList && this.props.surat.suratList.length <= 0) {
      this.props.dispatch(getAllSurat());
    }

    if (!this.props.surat.suratDetail[this.props.match.params.id]) {
      this.props.dispatch(getSuratDetail(this.props.match.params.id));
    }
  };
  renderContainer = (data) => this.renderItem(data);

  renderItem = (data) => {
    return data.map((item, key) => {
      if (key === 0 && Number(this.props.match.params.id) !== 1) {
        item.ar = item.ar.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "");
      }

      return this.state.linear ? (
        <div
          key={key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "serif",
            fontSize: "2rem",
            textAlign: "right",
            border: "1px solid #ddd",
            marginBottom: -1,
            padding: 10,
            lineHeight: " 3rem",
          }}
        >
          <div
            style={{ float: "left", display: "flex", alignItems: "center" }}
          >{`<${key + 1}>`}</div>
          {` ${item.ar}`}
        </div>
      ) : (
        item.ar
      );
    });
  };
  render() {
    return this.props.surat ? (
      this.props.surat.isLoading ? (
        <Spinner />
      ) : this.props.surat.isRejected ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: 20 }}
          onClick={() => {
            window.location.reload();
          }}
        >
          Something Went Wrong, click here to reload
        </div>
      ) : this.props.surat.isFulfilled &&
        this.props.surat.suratDetail[this.props.match.params.id] &&
        this.props.surat.suratList &&
        this.props.surat.suratList.length > 0 ? (
        <React.Fragment>
          <div
            style={{
              position: "fixed",
              width: "100%",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 2px #ddd",
              padding: 10,
              fontFamily: "serif",
              textAlign: "center",
              top: 0,
            }}
          >
            <div>
              Surat{" "}
              {this.props.surat.suratList[this.props.match.params.id - 1].nama}{" "}
              (
              {this.props.surat.suratList[this.props.match.params.id - 1]
                .type === "madinah"
                ? "Madaniyah"
                : "Makkiyah"}
              )
            </div>
            <div>
              ({this.props.surat.suratList[this.props.match.params.id - 1].arti}
              )
            </div>
            <div>
              {this.props.surat.suratList[this.props.match.params.id - 1].ayat}{" "}
              ayat
            </div>
          </div>
          <div
            style={{
              position: "fixed",
              width: "100%",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 2px #ddd",
              padding: 10,
              fontFamily: "serif",
              textAlign: "center",
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ cursor: "pointer", paddingRight: 20, paddingLeft: 20 }}
              onClick={() => this.props.history.push("/")}
            >
              <img
                src="https://img.icons8.com/metro/26/000000/home.png"
                alt="back"
              />
            </div>
            <div style={{ width: "100%" }}>
              <audio
                src={
                  this.props.surat.suratList[this.props.match.params.id - 1]
                    .audio
                }
                style={{ width: "100%" }}
                controls
              />
            </div>
          </div>
          {Number(this.props.match.params.id) !== 1 && (
            <div
              style={{
                display: "flex",
                fontFamily: "serif",
                fontSize: "2rem",
                fontWeight: "700",
                justifyContent: "center",
                padding: 10,
                border: "1px solid #ddd",
                marginBottom: -1,
                paddingTop: 86,
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          )}
          <div
            style={
              Number(this.props.match.params.id) === 1
                ? {
                    paddingTop: 72,
                    paddingBottom: 75,
                  }
                : {
                    paddingBottom: 75,
                  }
            }
          >
            {this.renderContainer(
              this.props.surat.suratDetail[this.props.match.params.id]
            )}
          </div>
        </React.Fragment>
      ) : (
        <div></div>
      )
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  surat: state.Surat,
});

export default connect(mapStateToProps)(Detail);
