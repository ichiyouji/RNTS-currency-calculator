import { Navigation } from "react-native-navigation";

export const historyScreen = (componentId: string) => {
  return Navigation.push(componentId, {
    component: {
      name: 'RNTS.second',
    },
  })
};