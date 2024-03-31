import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  Text,
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

const vw = Dimensions.get("window").width;
const vh = Dimensions.get("window").height;

const location = [
  { point: 1, name: "Main Gate" },
  { point: 2, name: "Main Building" },
  { point: 3, name: "Auditorium" },
  { point: 4, name: "LHC" },
  { point: 5, name: "LBC" },
  { point: 6, name: "Community Center" },
  { point: 7, name: "SAC" },
  { point: 8, name: "SC" },
  { point: 9, name: "NEW SC" },
  { point: 10, name: "Sanjeevni Hospital" },

  { point: 12, name: "MHR Ground" },

  { point: 14, name: "Basketball Court" },
  { point: 15, name: "Volleyball Court" },
  { point: 16, name: "Tennis Court" },
  { point: 17, name: "Hockey Court" },
  { point: 18, name: "Football Ground" },
  { point: 19, name: "Cricket Ground" },
  { point: 20, name: "SES" },
  { point: 21, name: "SBS" },
  { point: 22, name: "SEOCS" },
  { point: 23, name: "SMMME" },
  { point: 24, name: "SIF" },
  { point: 25, name: "SMS" },

  { point: 31, name: "MHR" },
  { point: 32, name: "BHR" },
  { point: 33, name: "RHR" },
  { point: 34, name: "GHR" },
  { point: 35, name: "SHR" },

  { point: 37, name: "MHR ATM" },
  { point: 38, name: "Barber" },

  { point: 41, name: "L-Gate" },
  { point: 44, name: "Road to CC" },
];

const Map = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          //   backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <ScrollView style={{ flex: 1 }}> */}
        <ImageZoom
          cropWidth={vw}
          cropHeight={vh * 0.75}
          imageWidth={vw}
          imageHeight={vh * 0.7}
          enableSwipeDown={true}
          panToMove={true}
          pinchToZoom={true}
        >
          <Image
            source={require("../../assets/map.png")}
            style={{ width: vw, height: vh * 0.75, resizeMode: "contain" }}
          />
        </ImageZoom>
        {/* </ScrollView> */}
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {location.map((loc) => (
            <View key={loc.point} style={{ padding: 4, width: 0.4 * vw }}>
              <View>
                <Text>
                  {loc.point}. {loc.name}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
});

export default Map;
