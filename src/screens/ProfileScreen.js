// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const ProfileScreen = () => {
//   return (
//     <View>
//       <Text>ProfileScreen</Text>
//     </View>
//   )
// }

// export default ProfileScreen

// const styles = StyleSheet.create({})
import React from "react";
import { View, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
    </View>
  );
}
