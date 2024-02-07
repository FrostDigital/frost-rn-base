import {FlashList} from "@shopify/flash-list";
import React, {useEffect} from "react";
import {SafeAreaView, Text, View} from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import {usePets} from "../../networking/pet.hooks";
import {useAppStore} from "../../stores/AppStore";
import {appTheme} from "../../theme/app-theme";
import {requestUserPermission} from "../../utils/messaging-utils";

const HomeScreen: React.FC = () => {
  const logout = useAppStore(state => state.logout);

  const {data} = usePets();

  function handleSignOut() {
    logout();
  }

  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlashList
        style={{flex: 1}}
        data={data || []}
        ItemSeparatorComponent={Divider}
        renderItem={({item}) => (
          <View style={{padding: 15, gap: 10}}>
            <Text style={{fontSize: 20, fontWeight: "600"}}>{item.name}</Text>
            <Text style={{}}>{item.category}</Text>
          </View>
        )}
      />
      <AppButton title="home.signOut" style={{width: "90%", alignSelf: "center"}} onPress={handleSignOut} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const Divider = () => {
  return <View style={{height: 1, backgroundColor: appTheme.colors["gray.400"]}} />;
};
