import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useMemo, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Saga} from "./Saga";
import {sagas} from "./sagas";

const ACTIVE_SAGA_STORAGE_KEY = "@sagobok.active-saga";
const DEEP_LINK_TTL = 5 * 60 * 1000;

interface Props {}

const getStories = (): Saga[] => {
  return sagas;
};

type ActiveSaga = {
  name: string[];
  story: React.FC;
  decorator: React.FC;
  id: string;
};

const SagoBok: React.FC<Props> = ({}) => {
  const {top, bottom} = useSafeAreaInsets();
  const [lastVisited, setLastVisited] = useState("");

  const listOfStories = useMemo(() => {
    const stories = getStories();
    const list = [];

    for (const story of stories) {
      const {name, decorator = ({children}) => children, variants} = story;

      list.push(
        ...Object.keys(variants).map(variant => ({
          group: name,
          name: [name, variant],
          id: [name, variant].join("/"),
          story: variants[variant] as React.FC,
          decorator: decorator as React.FC,
        })),
      );
    }

    return list.sort((a, b) => a.id.localeCompare(b.id));
  }, []);

  const [cachedSaga, setCachedSaga] = useAsyncStorage<{id: string; time: number} | undefined>(
    ACTIVE_SAGA_STORAGE_KEY,
    undefined,
  );

  const [activeSaga, setActiveSaga] = useState<string>();

  function stepToStory(dir: "prev" | "next") {
    if (activeSaga) {
      const i = listOfStories.findIndex(s => s.id === activeSaga);
      const next = listOfStories[i + 1 * (dir === "prev" ? -1 : 1)];

      if (next) {
        handleSetActiveSaga(next);
      }
    }
  }

  function handleSetActiveSaga(saga?: ActiveSaga) {
    setCachedSaga(saga ? {id: saga.id, time: Date.now()} : undefined);

    setActiveSaga(prev => {
      setLastVisited(prev || "");
      return saga?.id;
    });
  }

  useEffect(() => {
    if (cachedSaga && !activeSaga && Date.now() - cachedSaga.time < DEEP_LINK_TTL) {
      setActiveSaga(cachedSaga.id);
    }
  }, [activeSaga, cachedSaga]);

  const ActiveSagaComponent = listOfStories.find(s => s.id === activeSaga);

  return (
    <>
      {ActiveSagaComponent && (
        <View
          style={{
            paddingTop: top,
            flex: 1,
            backgroundColor: "white",
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}>
          <Pressable
            onPressIn={() => handleSetActiveSaga(undefined)}
            style={{
              position: "absolute",
              top: top + 10,
              left: 10,
              zIndex: 2,
              backgroundColor: "black",
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 16, color: "white"}}>👈 Back</Text>
          </Pressable>
          <View
            style={{
              position: "absolute",
              top: top + 10,
              right: 10,
              zIndex: 2,
              flexDirection: "row",
            }}>
            <Pressable
              onPressIn={() => stepToStory("prev")}
              style={{
                paddingVertical: 4,
                paddingHorizontal: 4,
                borderRadius: 5,
              }}>
              <Text style={{fontSize: 16, color: "white"}}>⬅️</Text>
            </Pressable>
            <Pressable
              onPressIn={() => stepToStory("next")}
              style={{
                paddingVertical: 4,
                paddingHorizontal: 4,
                borderRadius: 5,
              }}>
              <Text style={{fontSize: 16, color: "white"}}>➡️</Text>
            </Pressable>
          </View>
          <ActiveSagaComponent.decorator>
            <ActiveSagaComponent.story />
          </ActiveSagaComponent.decorator>
        </View>
      )}
      <ScrollView
        contentContainerStyle={{paddingTop: top, paddingBottom: bottom, paddingHorizontal: 10}}
        style={{backgroundColor: "white"}}>
        {listOfStories.map(story => (
          <Pressable
            key={story.name.join("")}
            onPress={() => handleSetActiveSaga(story)}
            style={{
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingVertical: 10,
              flexDirection: "row",
              backgroundColor: lastVisited === story.id ? "#f1f1f1" : undefined,
            }}>
            {story.name.map((n, i) => (
              <Text
                key={n}
                style={{
                  fontSize: 15,
                  opacity: 1 - i * 0.45,
                  marginRight: 5,
                }}>
                {i !== 0 ? "/ " : ""}
                {n}
              </Text>
            ))}
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
};

export default SagoBok;

// https://yajanarao.github.io/technical/2020-08-16-use-async-storage-hook/
export function useAsyncStorage<T = string>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    async function getStoredItem(oKey: string, oInitialValue: T) {
      try {
        const item = await AsyncStorage.getItem(oKey);
        const value = item ? JSON.parse(item) : oInitialValue;
        setStoredValue(value);
      } catch (error) {
        console.log(error);
      }
    }

    getStoredItem(key, initialValue);
  }, [key, initialValue]);

  const setValue = async (value: T) => {
    try {
      setStoredValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value) || "");
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
