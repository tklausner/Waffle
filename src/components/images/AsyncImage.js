import React, { Component } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { storageRef } from "../../utils";

export default class AsyncImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      mounted: true,
      image: "../../../assets/images/CameraRoll.png",
      url: "",
    };
  }
  componentDidMount() {
    this.setState({ isMounted: true });
    this.getAndLoadImage();
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  render() {
    if (this.state.mounted === true) {
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
    if (this.state.mounted) {
      const ref = storageRef.child("images/" + this.props.image);
      ref
        .getDownloadURL()
        .then((data) => {
          this.setState({ url: data });
          this.setState({ loading: false });
        })
        .catch((err) => {
          this.setState({ url: "../../../assets/images/CameraRoll.png" });
          this.setState({ loading: false });
        });
    }
  }
}
