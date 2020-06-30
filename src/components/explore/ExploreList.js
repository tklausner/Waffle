import React, { Component } from "react";
import { ProductList } from "./ProductList";
import { Container, Text, Header, Item, Icon, Input } from "native-base";
import { FlatList, StyleSheet, RefreshControl, Image } from "react-native";
import { LoadingScreen } from "../loading/LoadingScreen";

import WaffleIcon from "../../../assets/images/OnlineLogo.png";

import { connect } from "react-redux";
import { readPostsByCategory } from "../../api/post";

class ExploreList extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      feed: [],
      isRefreshing: false,
      data: this.props.category_list,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.onRefresh();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadPosts = async (category, id) => {
    await this.props.readPostsByCategory(category);
    const { previews } = this.props;
    if (this._isMounted) {
      this.setState((state) => ({
        feed: [
          ...state.feed,
          { key: id.toString(), category: category, previews: previews },
        ],
      }));
    }
  };

  _renderItem = ({ item, index }) => {
    return (
      <ProductList
        products={item.previews}
        category={item.category}
        key={item.key}
      />
    );
  };

  async onRefresh() {
    await this.setState({ isRefreshing: true, feed: [] });
    for (let i = 0; i < this.state.data.length; i += 1) {
      this.loadPosts(this.state.data[i], i);
    }
    this.setState({
      feed: new Set(this.state.feed),
    });
    await this.setState({ isRefreshing: false });
  }

  searchFilterFunction = async (text) => {
    if (text == "") {
      await this.setState({ data: this.props.category_list });
    } else {
      const newData = this.props.category_list.filter((item) => {
        const itemData = `${item.toUpperCase()}`;

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) == 0;
      });

      this.setState({ data: newData });
    }
    this.onRefresh();
  };

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item
            regular
            style={{
              borderRadius: 50,
              marginLeft: 10,
              marginBottom: 5,
              height: 35,
            }}
          >
            <Icon name="ios-search" />
            <Input
              onChangeText={(text) => this.searchFilterFunction(text)}
              autoCorrect={false}
              placeholder="Search"
            />
          </Item>
          <Image
            source={WaffleIcon}
            style={{
              height: "80%",
              width: "10%",
              flex: 0,
              marginLeft: "2%",
            }}
          />
        </Header>
        {this.state.feed.length == this.state.data.length ? (
          <FlatList
            data={this.state.feed}
            renderItem={this._renderItem}
            ListEmptyComponent={() => <Text>There are no categories?</Text>}
            keyExtractor={(item) => item.key}
            windowSize={8}
            removeClippedSubviews={true}
            initialNumToRender={4}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          />
        ) : (
          <LoadingScreen />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    previews: state.post.previews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readPostsByCategory: (category) => dispatch(readPostsByCategory(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreList);
