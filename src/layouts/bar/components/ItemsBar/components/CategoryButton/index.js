import CircleButton from "components/MDCircleButton";
import MDBox from "components/MDBox";
import { SILPOS_LOCAL, SILPOS_WEB, server, BANK_ICONS } from "config/contants";
import { useMaterialUIController } from "context";
import useWindowDimensions from "functions/windowDimension";
import PropTypes from "prop-types";
import { CategoryContainerStyle } from "../../style";

function CategoryButton({ scrollTo, listCategories }) {
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
      <div style={{ height: height - 160, overflowY: "scroll", paddingBottom: 60 }}>
        {listCategories.map((category) => (
          <CircleButton
            iconPath={
              category?.url_icon
                ? `${server === "online" ? SILPOS_WEB : SILPOS_LOCAL}/img/${category.url_icon}`
                : `${BANK_ICONS}/interface/menu.png`
            }
            title={category?.categoria}
            onClick={() => scrollTo(category.id)}
          />
        ))}
      </div>
    </MDBox>
  );
}

CategoryButton.propTypes = {
  scrollTo: PropTypes.func.isRequired,
  listCategories: PropTypes.instanceOf(Array).isRequired,
};

export default CategoryButton;
