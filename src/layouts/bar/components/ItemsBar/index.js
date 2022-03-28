import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import CartContainerStyle from "assets/theme/carBarStyle";
import { useMaterialUIController } from "context";
import { getItems, groupItems } from "model/ItemsModel";
import ScrollMenuItem from "./HorizontalScrollContainer";

export default function ItemsBar() {
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor } = controller;
  const [listItems, setListItem] = useState([]);
  const active = true;

  useEffect(() => {
    getItems().then((resItem) => setListItem(groupItems(resItem)));
  }, [getItems]);

  const onClickItem = ({ idItem }) => {
    console.log(idItem);
  };

  return (
    <MDBox
      sx={(theme) =>
        CartContainerStyle(theme, {
          darkMode,
          sidenavColor,
          active,
        })
      }
    >
      <ScrollMenuItem listItems={listItems} onClickItem={onClickItem} />
    </MDBox>
  );
}
