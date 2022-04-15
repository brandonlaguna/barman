import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import useWindowDimensions from "functions/windowDimension";
import ItemsCard from "./ItemsCard";

function Card({
  onClick,
  selected,
  title,
  itemId,
  onKeyPress,
  childWidth,
  listItems,
  onClickItem,
}) {
  const visibility = React.useContext(VisibilityContext);
  const { height } = useWindowDimensions();
  return (
    <div
      role="button"
      onClick={() => onClick(visibility)}
      onKeyPress={() => onKeyPress(visibility)}
      style={{
        width: `${childWidth}px`,
        height: `${height - 140}px`,
      }}
      tabIndex={0}
    >
      <div className="card" selected={selected} id={title}>
        <Grid container spacing={1} py={3} px={3}>
          {Object.entries(listItems[itemId].items).map((element) => (
            <ItemsCard rol="button" data={element[1]} onclickItem={onClickItem} />
          ))}
        </Grid>
      </div>
    </div>
  );
}

function ScrollMenuItem({ parentWidth, listItems, onClickItem }) {
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);
  const isItemSelected = (id) => !!selected.find((el) => el === id);

  React.useEffect(() => {
    console.log(position);
    setPosition(0);
  }, []);

  const handleClick = (id) => () => {
    const itemSelected = isItemSelected(id);
    setSelected((currentSelected) =>
      itemSelected ? currentSelected.filter((el) => el !== id) : currentSelected.concat(id)
    );
  };
  const onKeyPressHandle = (id) => console.log(id);

  return (
    <ScrollMenu style={{ position: "relative" }}>
      {Object.keys(listItems).map((id) => (
        <Card
          itemId={id}
          title={id}
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
  title: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  childWidth: PropTypes.number.isRequired,
  listItems: PropTypes.instanceOf(Array).isRequired,
  onClickItem: PropTypes.func.isRequired,
};

console.log();
ScrollMenuItem.defaultProps = {
  parentWidth: 1000,
  listItems: [],
};

ScrollMenuItem.propTypes = {
  parentWidth: PropTypes.number,
  listItems: PropTypes.instanceOf(Array),
  onClickItem: PropTypes.func.isRequired,
};

export default ScrollMenuItem;
