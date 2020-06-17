import React, { Component } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { storageRef } from "../../utils";

export default class AsyncImage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      image: "../../../assets/images/CameraRoll.png",
      url: "",
    };
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.getAndLoadImage();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this._isMounted) {
      if (this.state.loading === true) {
        return (
          <View
            key={this.props.image}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></View>
        );
      } else {
        return (
          <Image style={this.props.style} source={{ uri: this.state.url }} />
        );
      }
    } else {
      return null;
    }
  }

  async getAndLoadImage() {
    const ref = storageRef.child("images/" + this.props.image);
    ref
      .getDownloadURL()
      .then((data) => {
        if (this._isMounted) {
          this.setState({ url: data });
          this.setState({ loading: false });
        }
      })

      .catch((err) => {
        if (this._isMounted) {
          this.setState({ url: "../../../assets/images/CameraRoll.png" });
          this.setState({ loading: false });
        }
      });
  }
}
