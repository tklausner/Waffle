import React, { Component } from "react";
import { View, Image } from "react-native";
import { storageRef } from "../../utils";
import * as FileSystem from "expo-file-system";

export default class CachedImage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      image: "../../../assets/images/CameraRoll.png",
      uri: "",
    };
  }
  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted && this.props.image) {
      this.getImage();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this._isMounted) {
      if (this.state.loading) {
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
          <Image style={this.props.style} source={{ uri: this.state.uri }} />
        );
      }
    } else {
      return null;
    }
  }

  getImage() {
    FileSystem.readDirectoryAsync(FileSystem.cacheDirectory + "test/")
      .then((res) => {
        if (this._isMounted) {
          if (res.indexOf(this.props.image + ".jpg") > -1) {
            this.setState({
              uri:
                FileSystem.cacheDirectory + "test/" + this.props.image + ".jpg",
            });
            this.setState({
              loading: false,
            });
          } else {
            this.getAndLoadImage();
          }
        }
      })
      .catch((err) => {
        console.log("[ERROR 1] CachedImage.js", err);
      });
  }

  async getAndLoadImage() {
    console.log("DOWNLOADING");
    const ref = storageRef.child("images/test2/" + this.props.image);
    ref
      .getDownloadURL()
      .then((data) => {
        FileSystem.downloadAsync(
          data,
          FileSystem.cacheDirectory + "test/" + this.props.image + ".jpg"
        )
          .then(({ uri }) => {
            if (this._isMounted) {
              this.setState({ uri: uri });
              this.setState({ loading: false });
            }
          })
          .catch((err) => {
            console.log("[ERROR 2] CachedImage.js", err);
          });
      })
      .catch((err) => {
        if (this._isMounted) {
          console.log("QUOTA EXCEEDED");
          this.setState({ uri: "../../../assets/images/CameraRoll.png" });
          this.setState({ loading: false });
        }
      });
  }
}
