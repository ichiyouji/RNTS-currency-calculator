import { Navigation } from "react-native-navigation";

// export const historyScreen = () => Navigation.showModal({
//   stack: {
//     children: [
//       {
//         component: {
//           name: 'RNTS.second',
//         },
//       },
//     ],
//   },
// });
export const historyScreen = (componentId: string) => Navigation.push(componentId, {
  component: {
    name: 'RNTS.second',
  },
});