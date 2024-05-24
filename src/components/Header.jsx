import { useItemsStore } from "../stores/itemsStore";
import Counter from "./Counter";
import Logo from "./Logo";

export default function Header() {
  const items = useItemsStore((state) => state.items);

  return (
    <header>
      <Logo></Logo>
      <Counter
        numberOfItemsSelected={items.filter((item) => item.checked).length}
        totalNumberOfItems={items.length}
      ></Counter>
    </header>
  );
}
