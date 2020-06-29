import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import {
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
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import globalStyles from "../../styles";

import CachedImage from "../images/CachedImage";
import { LoadingScreen } from "../loading/LoadingScreen";
import { Swipeable } from "react-native-gesture-handler";

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

export function Waffle({ tempUser, post, handler, dataPass }) {
  const navigation = useNavigation();
  var tempData = dataPass;
  if (tempData.length == 0)
    for (var i = 0; i < post.main_spots; i++) {
      tempData.push({ id: i, title: "" });
    }
  const [selected, setSelected] = React.useState(new Map());
  const [data, setData] = React.useState(tempData);
  const [mainPrice, setMainPrice] = React.useState(0);
  const [spots, setSpots] = React.useState(0);

  const onSelect = React.useCallback(
    (id) => {
      if (data[id].title == "") {
        const newSelected = new Map(selected);
        newSelected.set(id, !selected.get(id));

        setSelected(newSelected);
        if (!selected.get(id)) setMainPrice(mainPrice + post.main_price);
        else setMainPrice(mainPrice - post.main_price);
      }
    },
    [selected, mainPrice]
  );

  const winnerSelect = React.useCallback(
    (id) => {
        const newSelected = new Map(selected);
        newSelected.set(id, !selected.get(id));

        setSelected(newSelected);
    },
    [selected]
  );

  const [count, setCount] = React.useState(0);
  var deltaTime = 0;
  var netTime = 0;
  var selectedID = 0;
  const minimumTime = 5000;
  const winner = 3;

  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const animate = (time) => {
    console.log(spots);
    if (
      spots == post.main_spots &&
      previousTimeRef.current != undefined &&
      (netTime < minimumTime || selectedID != winner)
    ) {
      deltaTime += time - previousTimeRef.current;
      netTime += time - previousTimeRef.current;
      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      if (deltaTime >= 100) {
        deltaTime = deltaTime % 100;
        setCount((prevCount) => (prevCount + 1) % 10);
        selectedID = (selectedID + 1) % 10;
        winnerSelect(selectedID);
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  function purchase() {
    for (const key of selected) {
      if (key[1] == true) {
        tempData[key[0]] = { id: key[0], title: "yooo" };
        setData(tempData);
      }
    }
    setSelected(new Map());
    setSpots(spots + mainPrice / post.main_price);
    setMainPrice(0);
    handler(tempData);
  }

  return true ? (
    <Content style={styles.content}>
      <Card>
        <CardItem>
          <Left>
            <CachedImage image={tempUser.profile} style={styles.profile} />
            <Body>
              <Text style={styles.username}>{post.username}</Text>
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
              <Text>{spots}</Text>
              <Text style={styles.underscore}>
                {post.main_spots.length <= 2 ? "__" : "____"}
              </Text>
              <Text>{post.main_spots}</Text>
            </View>
          </View>
          <View style={styles.textView}>
            <MaterialIcons name="monetization-on" style={{ fontSize: 40 }} />
            <Text>{post.main_price}</Text>
          </View>
        </CardItem>
        <CardItem style={{ justifyContent: "center" }}>
          <View style={styles.flatListView}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <Item
                  id={item.id}
                  title={item.title}
                  selected={!!selected.get(item.id)}
                  onSelect={onSelect}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              extraData={selected}
              scrollEnabled={false}
            />
          </View>
        </CardItem>
        <CardItem style={{ justifyContent: "center" }}>
          <Button onPress={purchase} style={styles.button}>
            <Text style={styles.buttonText}>${mainPrice}</Text>
          </Button>
        </CardItem>
        <CardItem style={{ justifyContent: "center" }}>
          <View>
            <Text>{Math.round(count)}</Text>
          </View>
        </CardItem>
      </Card>
    </Content>
  ) : null;
}

module.export = Waffle;

const styles = StyleSheet.create({
  content: {
    marginTop: "-2%",
    marginBottom: "0%",
    flex: 0,
    borderTopWidth: 0,
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
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
  },
  button: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: globalStyles.wBlue.color,
    marginTop: 5,
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
