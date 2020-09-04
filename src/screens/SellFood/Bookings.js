import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Card, Title, Paragraph, Subheading} from 'react-native-paper';
import {connect} from 'react-redux';
import {Call, Text} from 'react-native-openanything';

const Wallet = ({auth}) => {
  //   console.log(auth.user);
  let dt = new Date(Number(auth.user.bookedTill));
  return (
    <ScrollView style={styles.container}>
      <Subheading style={{textAlign: 'center', marginVertical: 15}}>
        New Bookings
      </Subheading>
      {auth.user.bookedBy ? (
        <Card style={styles.card}>
          <Card.Content style={{flexDirection: 'row'}}>
            <Paragraph>Customer Name : {auth.user.bookedBy.name}</Paragraph>
          </Card.Content>
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Paragraph>Call now</Paragraph>
            <Button
              icon="phone"
              size={35}
              onPress={() =>
                Call(auth.user.bookedBy.phone)
                  .then((i) => console.log(i))
                  .catch((e) => {
                    alert("Can't Call right now !");
                    console.log(e);
                  })
              }>
              {auth.user.bookedBy.phone}
            </Button>
          </Card.Content>
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Paragraph>Booked End Date : {dt.toLocaleDateString()}</Paragraph>
          </Card.Content>
        </Card>
      ) : (
        <Subheading style={{textAlign: 'center', marginTop: '50%'}}>
          No Bookings so far !
        </Subheading>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, {})(Wallet);
