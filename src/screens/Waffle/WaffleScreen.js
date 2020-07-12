import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Right,
  Body,
  ListItem,
} from "native-base";

import { NavigationContext } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import globalStyles from "../../styles";

import CachedImage from "../../components/images/CachedImage";
import { LoadingScreen } from "../../components/loading/LoadingScreen";
import { Swipeable } from "react-native-gesture-handler";

import { connect } from "react-redux";

import {
  getWaffleWinner,
  updatePost,
  getPost,
  readPosts,
} from "../../api/post";

import { updateUser } from "../../api/user";

const contextType = NavigationContext;

function Item({ id, title, selected, onSelect, didWin }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        {
          backgroundColor: selected
            ? "grey"
            : didWin(id)
            ? "#00B8FA"
            : "#f0f0f0",
        },
      ]}
    >
      <Text style={styles.id}>{id + 1} </Text>
      <Text style={styles.title}>
        {title ? "@" : ""}
        {title}
      </Text>
    </TouchableOpacity>
  );
}

class WaffleScreen extends Component {
  static contextType = NavigationContext;
  _isMounted = false;
  constructor(props) {
    super(props);
    var { post } = this.props;
    var tempData = [];
    if (tempData.length == 0) {
      for (var i = 0, j = 0; i < post.main_spots; i++) {
        tempData.push({ id: i, title: "" });
      }
    }

    this.state = {
      data: tempData,
      selected: new Map(),
      mainPrice: 0,
      spots: 0,
      loading: false,
      running: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadWafflers();
  }

  componentWillUnmount() {
    this.setState({
      running: false,
    });
    this._isMounted = false;
  }

  async loadWafflers() {
    this.setState({
      loading: true,
    });
    var { post } = this.props;
    var tempData = this.state.data.slice();
    if (tempData) {
      for (var j = 0; j < post.wafflers.length; j++) {
        tempData[post.wafflers[j]["spot_number"]]["title"] =
          post.wafflers[j].username;
      }
      await this.setState({
        data: tempData,
      });
      this.setState({
        loading: false,
      });
    }
  }

  async addWaffleToUser() {
    if (this._isMounted) {
      let updatedWaffles = this.props.user.waffles.slice();
      updatedWaffles.splice(updatedWaffles.length - 1, 0, this.props.post._id);
      await this.props.updateUser({
        _id: this.props.user._id,
        waffles: updatedWaffles,
      });
    }
  }

  async chooseWinner() {
    const { post } = this.props;
    await this.props.getWaffleWinner(post._id);
    console.log(this.props.winner);
  }

  didWin(id) {
    if (!this.state.running) {
      return false;
    }
    return this.props.winner ? this.props.winner.spot_number == id : false;
  }

  onSelect(id) {
    if (this.state.data[id].title == "") {
      const newSelected = new Map(this.state.selected);
      newSelected.set(id, !this.state.selected.get(id));

      this.setState({ selected: newSelected });
      if (!this.state.selected.get(id))
        this.setState({
          mainPrice: this.state.mainPrice + this.props.post.main_price,
        });
      else
        this.setState({
          mainPrice: this.state.mainPrice - this.props.post.main_price,
        });
    }
  }

  run() {
    console.log("running");
    this.setState({
      running: true,
    });
    this.chooseWinner();
  }

  async purchase() {
    const { post, user } = this.props;
    var tempData = this.state.data.slice();
    var tempWafflers = post.wafflers.slice();
    var purchased_spots = 0;
    for (const key of this.state.selected) {
      if (key[1] == true) {
        tempData[key[0]] = {
          id: key[0],
          title: user.username,
        };
        this.setState({ data: tempData });
        tempWafflers.splice(tempWafflers.length - 1, 0, {
          spot_number: key[0],
          username: user.username,
          user_id: user._id,
        });
        purchased_spots += 1;
      }
    }
    tempWafflers.sort((a, b) => (a.spot_number > b.spot_number ? 1 : -1));
    await this.props.updatePost({
      _id: post._id,
      wafflers: tempWafflers,
      waffles_remaining: post.waffles_remaining - purchased_spots,
    });
    if (
      purchased_spots > 0 &&
      user.waffles.find((id) => id == post._id) == null
    ) {
      this.addWaffleToUser();
    }
    this.setState({ selected: new Map() });
    this.setState({
      spots: post.waffles_remaining,
    });
    this.setState({ mainPrice: 0 });
  }

  render() {
    const { post } = this.props;
    const { tempUser } = this.props.route.params;
    return !this.state.loading ? (
      <View style={styles.content}>
        <FlatList
          ListHeaderComponentStyle={{ marginBottom: 10 }}
          ListHeaderComponent={
            <>
              <Card transparent>
                <CardItem>
                  <Left>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("UserProfile", tempUser)
                      }
                    >
                      <CachedImage
                        image={tempUser.profile}
                        style={styles.profile}
                      />
                    </TouchableOpacity>
                    <Body>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("UserProfile", tempUser)
                        }
                      >
                        <Text style={styles.username}>{post.username}</Text>
                      </TouchableOpacity>
                    </Body>
                  </Left>
                  <Right>
                    <Button transparent>
                      <MaterialIcons
                        name="more-horiz"
                        style={[{ fontSize: 40 }, globalStyles.wGray]}
                      />
                    </Button>
                  </Right>
                </CardItem>
                <CardItem style={{ justifyContent: "center" }}>
                  <View style={styles.waffleStyle}>
                    <CachedImage image={post.image} style={styles.image} />
                  </View>
                </CardItem>
                <CardItem style={styles.iconCard}>
                  <View style={styles.textView}>
                    <MaterialIcons name="pie-chart" style={{ fontSize: 40 }} />
                    <View style={styles.fractionView}>
                      <Text>{post.main_spots - post.waffles_remaining}</Text>
                      <Text style={styles.underscore}>
                        {post.main_spots.toString().length <= 2 ? "__" : "____"}
                      </Text>
                      <Text>{post.main_spots}</Text>
                    </View>
                  </View>
                  <View style={styles.textView}>
                    <MaterialIcons
                      name="monetization-on"
                      style={{ fontSize: 40 }}
                    />
                    <Text>{post.main_price}</Text>
                  </View>
                </CardItem>
              </Card>
            </>
          }
          contentContainerStyle={{
            justifyContent: "center",
            width: Dimensions.get("window").width,
            backgroundColor: "white",
          }}
          data={this.state.data}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.title}
              selected={!!this.state.selected.get(item.id)}
              onSelect={this.onSelect.bind(this)}
              didWin={this.didWin.bind(this)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          extraData={this.state.selected}
          ListFooterComponentStyle={{ marginTop: 10, marginBottom: 20 }}
          ListFooterComponent={
            <View
              style={{
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Button
                onPress={
                  post.waffles_remaining == 0
                    ? this.run.bind(this)
                    : this.state.spots != post.main_spots
                    ? this.purchase.bind(this)
                    : null
                }
                style={styles.button}
              >
                <Text style={styles.buttonText}>${this.state.mainPrice}</Text>
              </Button>
            </View>
          }
        />
      </View>
    ) : (
      <LoadingScreen />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    post: state.post.post,
    winner: state.post.winner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (post) => dispatch(updatePost(post)),
    getWaffleWinner: (id) => dispatch(getWaffleWinner(id)),
    getPost: (id) => dispatch(getPost(id)),
    readPosts: () => dispatch(readPosts()),
    updateUser: (id) => dispatch(updateUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaffleScreen);

const styles = StyleSheet.create({
  content: {
    marginTop: "-2%",
    marginBottom: "0%",
    flex: 0,
    borderTopWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 90,
  },
  waffleStyle: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: Dimensions.get("window").width / 2,
  },
  username: {
    fontSize: 20,
    fontWeight: "300",
  },
  fractionView: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  textView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  underscore: {
    marginTop: -13,
  },
  iconCard: {
    justifyContent: "space-between",
    width: "55%",
    alignSelf: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: "2%",
    width: 250,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: globalStyles.wBlue.color,
    marginTop: -2,
    borderRadius: 7,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    color: "#333",
    fontWeight: "400",
  },
  id: {
    fontSize: 18,
    fontWeight: "600",
    color: globalStyles.wBlue.color,
  },
  button: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: globalStyles.wBlue.color,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 26,
  },
  flatListView: {
    backgroundColor: globalStyles.wBlue.color,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderBottomWidth: 0,
    borderRadius: 3,
    borderColor: globalStyles.wBlue.color,
  },
});
