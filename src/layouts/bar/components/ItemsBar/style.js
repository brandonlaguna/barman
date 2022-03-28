export const cardImageStyle = ({ background, shadow }) => [
  {
    height: "100px",
    boxShadow: !shadow && "none",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
];

export const textCardStyle = () => [
  {
    color: "green",
  },
];

export const cardContainerStyle = () => {
  const style = {
    background: "white",
    color: "black",
    borderRadius: "12px",
    paddingTop: "3px",
    textAlign: "center",
  };
  return style;
};
