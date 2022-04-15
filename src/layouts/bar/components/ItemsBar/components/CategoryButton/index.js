import CircleButton from "components/MDCircleButton";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import useWindowDimensions from "functions/windowDimension";
import { CategoryContainerStyle } from "../../style";

function CategoryButton() {
  // context controllers
  const [controller] = useMaterialUIController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;
  const { height } = useWindowDimensions();

  return (
    <MDBox
      mb={1.5}
      sx={(theme) =>
        CategoryContainerStyle(theme, {
          darkMode,
          sidenavColor,
          active,
          height,
        })
      }
    >
      {/** Solo por demostracion */}
      <div style={{ height: height - 160, overflowY: "scroll", paddingBottom: 60 }}>
        <CircleButton iconPath="../../assets/BankIcon/food/burguer.png" />
        <CircleButton iconPath="../../assets/BankIcon/food/pizza.png" />
        <CircleButton iconPath="../../assets/BankIcon/food/french-fries.png" />
      </div>
    </MDBox>
  );
}

export default CategoryButton;
