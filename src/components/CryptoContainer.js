import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { FetchCoinData, FilterData } from './../actions/FetchCoinData';
import CoinCard from './CoinCard';

class CryptoContainer extends PureComponent {
  state = {
    query: ''
  };
  componentWillMount() {
    this.props.FetchCoinData();
  }

  renderCoinCards = coin => (
    <CoinCard
      key={coin.item.id}
      coin_name={coin.item.name}
      symbol={coin.item.symbol}
      source={`../SVG/${coin.item.symbol}.svg`}
      price_usd={coin.item.price_usd}
      percent_change_24h={coin.item.percent_change_24h}
      percent_change_7d={coin.item.percent_change_7d}
    />
  );
  search = text => {
    this.setState({ query: text });
    this.props.FilterData(text);
  };
  render() {
    const { crypto } = this.props;
    const data = crypto.data;
    const filterData = crypto.filterData || [];

    if (crypto.isFetching) {
      return (
        <View>
          <Spinner
            visible={crypto.isFetching}
            textContent={'Loading...'}
            textStyle={{ color: 'red' }}
            animation="fade"
          />
        </View>
      );
    }

    return (
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to search for coin!"
          onChangeText={text => this.search(text, data)}
        />
        <FlatList
          style={styles.contentContainer}
          data={this.state.query === '' ? data : filterData}
          renderItem={this.renderCoinCards}
          keyExtractor={(item, index) => index}
          initialNumToRender={10}
        />
        {this.state.query !== '' && filterData.length === 0 ? (
          <Text style={styles.noData}>Name not Found!</Text>
        ) : null}
      </View>
    );
  }
}

const styles = {
  contentContainer: {
    paddingBottom: 50,
    paddingTop: 30
  },
  noData: {
    fontWeight: 'bold',
    fontSize: 20
  }
};

function mapStateToProps(state) {
  return {
    crypto: state.crypto
  };
}

export default connect(mapStateToProps, { FetchCoinData, FilterData })(
  CryptoContainer
);
