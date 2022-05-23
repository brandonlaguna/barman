import React from "react";
import useWindowDimensions from "functions/windowDimension";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { getCategories } from "model/categoryModel";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import ItemsCard from "./ItemsCard";
import "./styles.css";

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
  const visibility = React.useContext(VisibilityContext);
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
    >
      <div
        className="card"
        selected={selected}
        style={{
          margin: "6px",
        }}
      >
        <p>{title.categoria}</p>
        <Grid
          container
          spacing={1}
          py={3}
          px={3}
          title={title}
          className="horizontalCard"
          style={{
            position: "absolute",
          }}
        >
          {Object.entries(listItems[itemId].items).map((element) => (
            <ItemsCard
              rol="button"
              data={element[1]}
              onclickItem={onClickItem}
              categoryName={title.categoria}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
}

function ScrollMenuItem({ parentWidth, listItems, onClickItem }) {
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);
  const [categories, setCategories] = React.useState([]);
  const isItemSelected = (id) => !!selected.find((el) => el === id);

  React.useEffect(() => {
    console.log(position);
    setPosition(0);
    getCategories().then((response) => setCategories(response));
  }, []);

  const handleClick = (id) => () => {
    const itemSelected = isItemSelected(id);
    setSelected((currentSelected) =>
      itemSelected ? currentSelected.filter((el) => el !== id) : currentSelected.concat(id)
    );
  };
  const onKeyPressHandle = (id) => console.log(id);

  return (
    <ScrollMenu>
      {Object.keys(listItems).map((id) => (
        <Card
          itemId={id}
          title={
            categories.filter((cat) => Number.parseInt(cat.id, 10) === Number.parseInt(id, 10))[0]
          }
          key={`clickCard${id}`}
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
};

export default ScrollMenuItem;
