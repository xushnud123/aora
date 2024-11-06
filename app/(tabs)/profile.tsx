import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Profile = () => {
  return (
    <View>
      <Text style={styles.titleContainer}>Profile</Text>
      <Link href='/profile' style={styles.link}>
        Go to Profile
      </Link>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  link: {
    color: "#fff",
    fontSize: 16,
    marginTop: 12,
  },
  titleContainer: {
    color: "red",
  },
});
