import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import ItemsCard from "./ItemsCard";

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);
  return (
    <button type="button" disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      Left
    </button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
  return (
    <button type="button" disabled={isLastItemVisible} onClick={() => scrollNext()}>
      Right
    </button>
  );
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
}) {
  const visibility = React.useContext(VisibilityContext);

  return (
    <div
      role="button"
      onClick={() => onClick(visibility)}
      onKeyPress={() => onKeyPress(visibility)}
      style={{
        width: `${childWidth}px`,
      }}
      tabIndex={0}
    >
      <div className="card" selected={selected} id={title}>
        <Grid container spacing={1} py={3} px={3}>
          {Object.entries(listItems[itemId].items).map((element) => (
            <ItemsCard
              itemId={element[1].id}
              itemTitle={element[1].articulo}
              onClickItem={onClickItem}
            />
          ))}
        </Grid>
      </div>
      <div
        style={{
          height: "300px",
        }}
      />
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

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);
      console.log(getItemById);
      console.log(scrollToItem);
      setSelected((currentSelected) =>
        itemSelected ? currentSelected.filter((el) => el !== id) : currentSelected.concat(id)
      );
    };
  const onKeyPressHandle = (id) => console.log(id);

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{ position: "relative" }}>
      {Object.keys(listItems).map((id) => (
        <Card
          itemId={id} // NOTE: itemId is required for track items
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
