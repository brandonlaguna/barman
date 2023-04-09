import { useState, useEffect, useContext, useRef } from "react";
import useWindowDimensions from "functions/windowDimension";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { getCategories } from "model/categoryModel";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import easingFunctions from "functions/easeFunctions";
import ItemsCard from "./ItemsCard";
import "./styles.css";

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }
  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

function Card({
  onClick,
  selected,
  title,
  itemId,
  onKeyPress,
  childWidth,
  listItems,
  onClickItem,
  key,
}) {
  const { height } = useWindowDimensions();
  const visibility = useContext(VisibilityContext);
  return (
    <div
      key={key}
      role="button"
      onClick={() => onClick(visibility)}
      onKeyPress={() => onKeyPress(visibility)}
      style={{
        position: "relative",
        height: height - 145,
        width: `${childWidth}px`,
        overflowY: "scroll",
      }}
      tabIndex={0}
      selected={selected}
    >
      <p>{title?.categoria}</p>
      <Grid
        container
        spacing={2}
        py={3}
        px={3}
        title={title}
        className="horizontalCard"
        style={{
          position: "absolute",
        }}
        xs={12}
        md={12}
        lg={12}
      >
        {Object.entries(listItems[itemId].items).map((element) => (
          <ItemsCard
            rol="button"
            data={element[1]}
            onclickItem={onClickItem}
            categoryImg={title?.url_image}
          />
        ))}
      </Grid>
    </div>
  );
}

function ScrollMenuItem({ parentWidth, listItems, onClickItem, scrollToCategory }) {
  const [selected, setSelected] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [position, setPosition] = useState(0);
  const [categories, setCategories] = useState([]);
  const isItemSelected = (id) => !!selected.find((el) => el === id);
  const apiRef = useRef(VisibilityContext);

  // configTransition
  const [duration, setDuration] = useState(0);
  const [ease, setEase] = useState("noEase");

  useEffect(() => {
    setPosition(0);
    getCategories().then((response) => setCategories(response));
    setDuration(500);
    setEase("easeInCubic");
  }, []);

  useEffect(() => {
    apiRef.current?.scrollToItem?.(apiRef.current?.getItemElementById(scrollToCategory));
  }, [scrollToCategory]);

  const handleClick = (id) => () => {
    const itemSelected = isItemSelected(id);
    setSelected((currentSelected) =>
      itemSelected ? currentSelected.filter((el) => el !== id) : currentSelected.concat(id)
    );
  };
  const onKeyPressHandle = () => null;

  return (
    <ScrollMenu
      onWheel={onWheel}
      apiRef={apiRef}
      transitionDuration={duration}
      transitionEase={easingFunctions[ease]}
    >
      {Object.keys(listItems).map((id) => (
        <Card
          itemId={id}
          title={
            categories.filter((cat) => Number.parseInt(cat.id, 10) === Number.parseInt(id, 10))[0]
          }
          key={id}
          onClick={handleClick(id)}
          selected={isItemSelected(id)}
          onKeyPress={onKeyPressHandle}
          style={{ width: "200px" }}
          childWidth={parentWidth}
          listItems={listItems}
          onClickItem={onClickItem}
        />
      ))}
    </ScrollMenu>
  );
}

Card.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  title: PropTypes.instanceOf(Array).isRequired,
  itemId: PropTypes.string.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  childWidth: PropTypes.number.isRequired,
  listItems: PropTypes.instanceOf(Array).isRequired,
  onClickItem: PropTypes.func.isRequired,
  key: PropTypes.string.isRequired,
};

ScrollMenuItem.defaultProps = {
  parentWidth: 1200,
  listItems: [],
};

ScrollMenuItem.propTypes = {
  parentWidth: PropTypes.number,
  listItems: PropTypes.instanceOf(Array),
  onClickItem: PropTypes.func.isRequired,
  scrollToCategory: PropTypes.func.isRequired,
};

export default ScrollMenuItem;
