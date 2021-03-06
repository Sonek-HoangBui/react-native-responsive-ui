import { View, Text } from "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { MediaQuery, mediaQuery, getStylesheet } from "../src";

it("renders MediaQuery", () => {
  const tree = renderer
    .create(
      <View>
        <MediaQuery minHeight={450} orientation="portrait">
          test
        </MediaQuery>
        <MediaQuery minHeight={450} orientation="portrait">
          <Text>test</Text>
        </MediaQuery>
        <MediaQuery minHeight={450} orientation="portrait">
          {3 + 5}
        </MediaQuery>
      </View>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

const height = { minHeight: 500 };

it("should return true for right media query", () => {
  const result = mediaQuery(height, 200, 700);

  expect(result).toBeTruthy();
});

it("should return false for failed media query", () => {
  const result = mediaQuery(height, 200, 300);

  expect(result).toBeFalsy();
});

const container = { backgroundColor: "red" };
const mediaQueryStyle = [
  {
    query: { minHeight: 500 },
    style: { container }
  }
];

it("should return a stylesheet for getStyleSheet", () => {
  const result = getStylesheet({ width: 200, height: 700 }, mediaQueryStyle);

  expect(result).toEqual(mediaQueryStyle[0].style);
});

it("should return a empty object for getStyleSheet", () => {
  const result = getStylesheet({ width: 200, height: 300 }, mediaQueryStyle);

  expect(result).toEqual({});
});
