import { useState, useMemo } from "react";
import EmptyView from "./EmptyView";
import Select from "react-select";
import { useItemsStore } from "../stores/itemsStore";

const sortingOptions = [
  { label: "Sort by default", value: "default" },
  { label: "Sort by picked", value: "checked" },
  { label: "Sort by unpicked", value: "unchecked" },
];

/* eslint-disable react/prop-types */

export default function ItemList() {
  const items = useItemsStore((state) => state.items);
  const deleteItem = useItemsStore((state) => state.deleteItem);
  const toggleItem = useItemsStore((state) => state.toggleItem);
  const [sortBy, setSortBy] = useState("default");

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy == "checked") {
          return b.checked - a.checked;
        }

        if (sortBy == "unchecked") {
          return a.checked - b.checked;
        }

        return;
      }),
    [sortBy, items]
  );

  return (
    <>
      <ul className="item-list">
        {items.length > 0 ? (
          <section className="sorting">
            <Select
              onChange={(option) => setSortBy(option.value)}
              options={sortingOptions}
              defaultValue={sortingOptions[0]}
            />
          </section>
        ) : null}
        {items.length === 0 && <EmptyView></EmptyView>}
        {sortedItems.map((item, index) => {
          return (
            <Item
              item={item}
              key={item.id}
              handleDeleteItem={deleteItem}
              handleToggleItem={toggleItem}
            ></Item>
          );
        })}
      </ul>
    </>
  );
}

function Item({ item, handleDeleteItem, handleToggleItem }) {
  return (
    <li className="item">
      <label>
        <input
          onChange={() => handleToggleItem(item.id)}
          checked={item.checked}
          type="checkbox"
        />
        {item.name}
      </label>
      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
  );
}
