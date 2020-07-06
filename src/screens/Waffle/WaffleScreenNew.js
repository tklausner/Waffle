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

import { MaterialIcons } from "@expo/vector-icons";

import globalStyles from "../../styles";

import CachedImage from "../../components/images/CachedImage";
import { LoadingScreen } from "../../components/loading/LoadingScreen";
import { Swipeable } from "react-native-gesture-handler";

const contextType = NavigationContext;

// Use useRef for mutable variables that we want to persist
// without triggering a re-render on their change

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[styles.item, { backgroundColor: selected ? "grey" : "#f0f0f0" }]}
    >
      <Text style={styles.title}>
        {id}: {title}
      </Text>
    </TouchableOpacity>
  );
}

class WaffleScreenNew extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    var tempData = [];
    if (tempData.length == 0)
      for (var i = 0; i < this.props.route.params.post.main_spots; i++) {
        tempData.push({ id: i, title: "" });
      }
    this.state = {
      data: tempData,
      selected: new Map(),
      mainPrice: 0,
      spots: 0,
      winnerSelected: new Animated.Value(new Map()),
      numShuffled: 0,
    };
  }

  onSelect(id) {
    if (this.state.data[id].title == "") {
      const newSelected = new Map(this.state.selected);
      newSelected.set(id, !this.state.selected.get(id));

      this.setState({ selected: newSelected });
      if (!this.state.selected.get(id))
        this.setState({
          mainPrice:
            this.state.mainPrice + this.props.route.params.post.main_price,
        });
      else
        this.setState({
          mainPrice:
            this.state.mainPrice - this.props.route.params.post.main_price,
        });
    }
  }

  /*winnerSelect() {
    console.log("second: " + this.state.winnerSelected._value);

    const newSelected = new Map(this.state.winnerSelected._value);
    const id = this.state.numShuffled % this.props.route.params.post.main_spots;

    console.log("third:" + id);

    this.setState({numShuffled: this.state.numShuffled + 1})

    return newSelected.set(id, !this.state.winnerSelected._value.get(id));
  }*/

  purchase() {
    var tempData = this.state.data.slice();
    for (const key of this.state.selected) {
      if (key[1] == true) {
        tempData[key[0]] = { id: key[0], title: "yooo" };
        this.setState({ data: tempData });
      }
    }
    this.setState({ selected: new Map() });
    this.setState({
      spots:
        this.state.spots +
        this.state.mainPrice / this.props.route.params.post.main_price,
    });
    this.setState({ mainPrice: 0 });
  }

  /*winnerHighlight() {
    console.log("first: " + this.state.winnerSelected._value);
    const val = this.winnerSelect()
    Animated.timing(this.state.winnerSelected, {
      toValue: val,
      duration: 1000,
    }).start(() => this.winnerHighlight.bind(this));
  }*/

  render() {
    return true ? (
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
                        navigation.navigate(
                          "UserProfile",
                          this.props.route.params.tempUser
                        )
                      }
                    >
                      <CachedImage
                        image={this.props.route.params.tempUser.profile}
                        style={styles.profile}
                      />
                    </TouchableOpacity>
                    <Body>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate(
                            "UserProfile",
                            this.props.route.params.tempUser
                          )
                        }
                      >
                        <Text style={styles.username}>
                          {this.props.route.params.post.username}
                        </Text>
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
                    <CachedImage
                      image={this.props.route.params.post.image}
                      style={styles.image}
                    />
                  </View>
                </CardItem>
                <CardItem style={styles.iconCard}>
                  <View style={styles.textView}>
                    <MaterialIcons name="pie-chart" style={{ fontSize: 40 }} />
                    <View style={styles.fractionView}>
                      <Text>{this.state.spots}</Text>
                      <Text style={styles.underscore}>
                        {this.props.route.params.post.main_spots.toString()
                          .length <= 2
                          ? "__"
                          : "____"}
                      </Text>
                      <Text>{this.props.route.params.post.main_spots}</Text>
                    </View>
                  </View>
                  <View style={styles.textView}>
                    <MaterialIcons
                      name="monetization-on"
                      style={{ fontSize: 40 }}
                    />
                    <Text>{this.props.route.params.post.main_price}</Text>
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
                  this.state.spots != this.props.route.params.post.main_spots
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
    ) : null;
  }
}
export default WaffleScreenNew;

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
    padding: 6,
    height: 30,
    width: 250,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: globalStyles.wBlue.color,
    marginTop: -2,
  },
  title: {
    fontSize: 12,
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
