// import React from "react";
// import SwipeableViews from "react-swipeable-views";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { useMediaQuery } from "@material-ui/core";

// const useStyles = makeStyles(theme => ({
//   root: {
//     height: "100vh"
//   },
//   slideContainer: {
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   slide: {
//     height: "80%",
//     width: "80%",
//     backgroundColor: "red",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// }));

// const Carousel = () => {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [index, setIndex] = React.useState(0);
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const handleChangeIndex = i => {
//     setIndex(i);
//   };

//   return (
//     <div className={classes.root}>
//       <SwipeableViews
//         enableMouseEvents
//         index={index}
//         onChangeIndex={handleChangeIndex}
//         containerStyle={{ height: "100%" }}
//       >
//         <div className={classes.slideContainer}>
//           <div className={classes.slide}>Slide 1</div>
//         </div>
//         <div className={classes.slideContainer}>
//           <div className={classes.slide}>Slide 2</div>
//         </div>
//         <div className={classes.slideContainer}>
//           <div className={classes.slide}>Slide 3</div>
//         </div>
//       </SwipeableViews>
//     </div>
//   );
// };

// export default Carousel;